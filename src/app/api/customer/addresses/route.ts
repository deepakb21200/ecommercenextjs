
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
 
import { UserModel } from "@/models/User";
import { connectDB } from "@/lib/connectDB";

function getAuthUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return { error: "Unauthorized", status: 401 };
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

function mapAddress(item: any) {
  return {
    _id: String(item._id || ""),
    fullName: item.fullName,
    address: item.address,
    state: item.state,
    postalCode: item.postalCode,
    isDefault: item.isDefault,
  };
}

function getSortedAddresses(addresses: any[]) {
  return [...addresses]
    .sort((a, b) => Number(b.isDefault) - Number(a.isDefault))
    .map(mapAddress);
}

// GET /api/customer/addresses
export async function GET(req: NextRequest) {
  await connectDB();

  const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ status: "error", message: auth.error }, { status: auth.status });
  }

  try {
    const user = await UserModel.findById(auth.decoded.id);

    if (!user) {
      return NextResponse.json({ status: "error", message: "User not found" }, { status: 404 });
    }

    // ✅ directly user.addresses use karo — cast mat karo
    const items = getSortedAddresses(user.addresses || []);

    return NextResponse.json({ status: "success", data: { items } });
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// POST /api/customer/addresses
export async function POST(req: NextRequest) {
  await connectDB();

  const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ status: "error", message: auth.error }, { status: auth.status });
  }

  try {
    const body = await req.json();
    const fullName = String(body.fullName || "").trim();
    const address = String(body.address || "").trim();
    const state = String(body.state || "").trim();
    const postalCode = String(body.postalCode || "").trim();

    if (!fullName || !address || !state || !postalCode) {
      return NextResponse.json({ status: "error", message: "All fields are required" }, { status: 400 });
    }

    const user = await UserModel.findById(auth.decoded.id);

    if (!user) {
      return NextResponse.json({ status: "error", message: "User not found" }, { status: 404 });
    }

    // ✅ directly user.addresses use karo — cast mat karo
    const shouldMarkAsDefault = body.isDefault === true || user.addresses.length === 0;

    if (shouldMarkAsDefault) {
      user.addresses.forEach((item: any) => (item.isDefault = false));
    }

    user.addresses.push({
      fullName,
      address,
      state,
      postalCode,
      isDefault: shouldMarkAsDefault,
    } as any);

    await user.save();

    // ✅ save ke baad user.addresses se lo — tab _id generated hoga
    const items = getSortedAddresses(user.addresses);

    return NextResponse.json({ status: "success", data: { items } });
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}