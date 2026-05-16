import mongoose from "mongoose";
import chroma from "chroma-js";
import { ProductModel } from "../models/Product";

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);

    console.log("🔌 Connected to DB");

    const products = await ProductModel.find({});

    console.log(`📦 Total products: ${products.length}`);

    for (const product of products) {
      const colors = product.colors as any;

      // ✔ skip already migrated products
      if (
        colors.length > 0 &&
        typeof colors[0] === "object"
      ) {
        console.log(`⏩ Skipping already migrated: ${product._id}`);
        continue;
      }

      // ✔ convert old string[] → object[]
      const updatedColors = colors.map((hex: string) => ({
        hex,
        name: chroma(hex).name(),
      }));

      product.colors = updatedColors;

      await product.save();

      console.log(`✅ Migrated: ${product._id}`);
    }

    console.log("🎉 Migration completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrate();