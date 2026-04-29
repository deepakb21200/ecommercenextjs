

import mongoose from "mongoose";

// ─── Types ────────────────────────────────────────────────────────────────────

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// ─── Global Cache ─────────────────────────────────────────────────────────────

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

// ─── Connect Function ─────────────────────────────────────────────────────────

export async function connectDB(): Promise<typeof mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI environment variable is not defined");
  }

  // ✅ Already connected
  if (cached.conn) {
    console.log("🟡 Using existing MongoDB connection");
    console.log("State:", mongoose.connection.readyState); // 1 = connected
    return cached.conn;
  }

  // 🔄 Connecting
  if (!cached.promise) {
    console.log("🔵 Connecting to MongoDB...");

    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;

  // ✅ Connected
  console.log("🟢 MongoDB connected successfully");
  console.log("Host:", mongoose.connection.host);
  console.log("DB Name:", mongoose.connection.name);
  console.log("State:", mongoose.connection.readyState); // 1 = connected

  return cached.conn;
}