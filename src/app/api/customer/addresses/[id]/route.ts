



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

// PATCH /api/customer/addresses/[id]
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ status: "error", message: auth.error }, { status: auth.status });
  }

  try {
    const { id: addressId } = await params;

    if (!addressId) {
      return NextResponse.json({ status: "error", message: "Address id is required" }, { status: 400 });
    }

    const body = await req.json();
    const fullName = String(body.fullName || "").trim();
    const address = String(body.address || "").trim();
    const state = String(body.state || "").trim();
    const postalCode = String(body.postalCode || "").trim();

    if (!fullName) return NextResponse.json({ status: "error", message: "Full name is required" }, { status: 400 });
    if (!address) return NextResponse.json({ status: "error", message: "Address is required" }, { status: 400 });
    if (!state) return NextResponse.json({ status: "error", message: "State is required" }, { status: 400 });
    if (!postalCode) return NextResponse.json({ status: "error", message: "Postal code is required" }, { status: 400 });

    const user = await UserModel.findById(auth.decoded.id);
    if (!user) {
      return NextResponse.json({ status: "error", message: "User not found" }, { status: 404 });
    }

    // ✅ directly user.addresses use karo — cast mat karo
    const targetAddress = user.addresses.find((a: any) => String(a._id) === addressId);

    if (!targetAddress) {
      return NextResponse.json({ status: "error", message: "Address not found" }, { status: 404 });
    }

    const shouldMarkAsDefault = body.isDefault === true || user.addresses.length === 0;

    if (shouldMarkAsDefault) {
      user.addresses.forEach((item: any) => (item.isDefault = false));
    }

    (targetAddress as any).fullName = fullName;
    (targetAddress as any).address = address;
    (targetAddress as any).state = state;
    (targetAddress as any).postalCode = postalCode;

    if (shouldMarkAsDefault) {
      (targetAddress as any).isDefault = true;
    }

    await user.save();

    const items = getSortedAddresses(user.addresses);
    return NextResponse.json({ status: "success", data: { items } });
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE /api/customer/addresses/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ status: "error", message: auth.error }, { status: auth.status });
  }

  try {
    const { id: addressId } = await params;

    if (!addressId) {
      return NextResponse.json({ status: "error", message: "Address id is required" }, { status: 400 });
    }

    const user = await UserModel.findById(auth.decoded.id);
    if (!user) {
      return NextResponse.json({ status: "error", message: "User not found" }, { status: 404 });
    }

    // ✅ directly user.addresses use karo
    const index = user.addresses.findIndex((a: any) => String(a._id) === addressId);

    if (index < 0) {
      return NextResponse.json({ status: "error", message: "Address not found" }, { status: 404 });
    }

    const wasDefault = (user.addresses[index] as any).isDefault;
    user.addresses.splice(index, 1);

    if (wasDefault && user.addresses.length > 0 && !user.addresses.some((a: any) => a.isDefault)) {
      (user.addresses[0] as any).isDefault = true;
    }

    await user.save();

    const items = getSortedAddresses(user.addresses);
    return NextResponse.json({ status: "success", data: { items } });
  } catch (err: any) {
    return NextResponse.json(
      { status: "error", message: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}