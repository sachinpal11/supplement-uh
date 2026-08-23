import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel, seedProducts, IProduct } from "@/lib/models/Product";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("q") || "";
    const category = searchParams.get("category") || "All";
    const inStockOnly = searchParams.get("inStock") === "true";
    const sort = searchParams.get("sort") || "featured";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "8", 10);

    const db = await connectToDatabase();
    let allProducts: IProduct[] = [];

    if (db) {
      try {
        // Auto-seed if database is empty
        const count = await ProductModel.countDocuments();
        if (count === 0) {
          await ProductModel.insertMany(seedProducts);
          console.log("Seeded database with initial products.");
        }

        // Build MongoDB filter query
        const query: Record<string, unknown> = {};

        if (category && category !== "All") {
          query.category = category;
        }

        if (inStockOnly) {
          query.inStock = true;
        }

        if (search.trim()) {
          const searchRegex = new RegExp(search.trim(), "i");
          query.$or = [
            { title: searchRegex },
            { subtitle: searchRegex },
            { sku: searchRegex },
            { desc: searchRegex },
            { category: searchRegex },
          ];
        }

        // Determine MongoDB sorting
        let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
        if (sort === "price-low") sortOption = { numericPrice: 1 };
        else if (sort === "price-high") sortOption = { numericPrice: -1 };
        else if (sort === "rating") sortOption = { rating: -1 };
        else if (sort === "newest") sortOption = { createdAt: -1 };

        const totalItems = await ProductModel.countDocuments(query);
        const products = await ProductModel.find(query)
          .sort(sortOption)
          .skip((page - 1) * limit)
          .limit(limit)
          .lean();

        const formattedProducts = products.map((p) => ({
          id: p.id,
          title: p.title,
          subtitle: p.subtitle,
          sku: p.sku,
          price: p.price,
          numericPrice: p.numericPrice,
          category: p.category,
          inStock: p.inStock,
          stockQuantity: p.stockQuantity,
          rating: p.rating,
          reviewsCount: p.reviewsCount,
          image: p.image,
          desc: p.desc,
          details: p.details,
        }));

        return NextResponse.json({
          products: formattedProducts,
          pagination: {
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
          },
          source: "database",
        });
      } catch (dbErr) {
        console.error("Database query failed, falling back to memory engine:", dbErr);
      }
    }

    // Fallback in-memory search/filter engine if DB is offline
    allProducts = [...seedProducts];

    // Filter by Category
    if (category && category !== "All") {
      allProducts = allProducts.filter((p) => p.category === category);
    }

    // Filter by In-Stock
    if (inStockOnly) {
      allProducts = allProducts.filter((p) => p.inStock);
    }

    // Elastic-style Search (Fuzzy matching on Title, Subtitle, SKU, Category, and Description)
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      allProducts = allProducts.filter((p) => {
        return (
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      });
    }

    // Sort Products
    if (sort === "price-low") {
      allProducts.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sort === "price-high") {
      allProducts.sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (sort === "rating") {
      allProducts.sort((a, b) => b.rating - a.rating);
    }

    const totalItems = allProducts.length;
    const startIndex = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit) || 1,
      },
      source: "fallback",
    });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
