import { NextRequest, NextResponse } from "next/server";

import { PromoModel } from "@/models/Promo";
import { connectDB } from "@/lib/connectDB";
import { requireAdmin } from "@/lib/auth";


function parsePromoPayload(data: Record<string, any>) {
  const code = String(data.code || "").trim().toUpperCase();
  const percentage = Number(data.percentage);
  const count = Number(data.count);
  const minimumOrderValue = Number(data.minimumOrderValue);
  const startsAt = new Date(data.startsAt);
  const endsAt = new Date(data.endsAt);

  if (!code) return { error: "Promo code is required", status: 400 };
  if (isNaN(percentage) || percentage < 1 || percentage > 100)
    return { error: "Percentage must be between 1 and 100", status: 400 };
  if (!Number.isInteger(count) || count < 1)
    return { error: "Promo count must be atleast 1", status: 400 };
  if (isNaN(minimumOrderValue) || minimumOrderValue < 0)
    return { error: "Minimum order value must be 0 or more", status: 400 };
  if (isNaN(startsAt.getTime()))
    return { error: "Valid start time is required", status: 400 };
  if (isNaN(endsAt.getTime()))
    return { error: "Valid end time is required", status: 400 };
  if (endsAt <= startsAt)
    return { error: "End time should be after start time", status: 400 };

  return { data: { code, percentage, count, minimumOrderValue, startsAt, endsAt } };
}


async function getAllPromos() {
  const promos = await PromoModel.find().sort({ createdAt: -1 });
  return promos.map((p) => p.toObject());
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }
  const { id } = await params;
  const body = await req.json();
  const parsed = parsePromoPayload(body);
  if (parsed.error) return NextResponse.json({ message: parsed.error }, { status: parsed.status });

  const promo = await PromoModel.findById(id);
  if (!promo) return NextResponse.json({ message: "Promo not found" }, { status: 404 });

  const existing = await PromoModel.findOne({ code: parsed.data!.code, _id: { $ne: promo._id } });
  if (existing) return NextResponse.json({ message: "Promo code already exists" }, { status: 400 });

  Object.assign(promo, parsed.data);
  await promo.save();

  return NextResponse.json({ items: await getAllPromos() });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const auth = requireAdmin(req);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: auth.status });
  }
  const { id } = await params;

  const promo = await PromoModel.findById(id);
  if (!promo) return NextResponse.json({ message: "Promo not found" }, { status: 404 });

  await PromoModel.findByIdAndDelete(id);

  return NextResponse.json({ items: await getAllPromos() });
}