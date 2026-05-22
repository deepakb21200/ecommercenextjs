// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { CartModel } from "@/models/Cart";
// import { ProductModel } from "@/models/Product";
// import { connectDB } from "@/lib/connectDB";
// import { ProductSize } from "@/components/Home/products/types";

// type DecodedToken = { id: string };

// type ProductPreview = {
//   _id: string;
//   title: string;
//   brand: string;
//   price: number;
//   salePercentage: number;
//   images: { url: string; isCover?: boolean }[];
// };

// type CartPreviewItem = {
//   product: ProductPreview | null;
//   quantity: number;
//   color?: string;
//   size?: string;
// };

// function getAuthUser(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;
//   if (!token) return { error: "Unauthorized", status: 401 };
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_KEY!) as DecodedToken;
//     return { decoded };
//   } catch {
//     return { error: "Invalid token", status: 401 };
//   }
// }

// function formatProduct(product: ProductPreview) {
//   const image = product.images.find((i) => i.isCover)?.url || product.images[0]?.url || "";
//   const finalPrice = product.salePercentage
//     ? Math.round(product.price - (product.price * product.salePercentage) / 100)
//     : product.price;
//   return { productId: String(product._id), title: product.title, brand: product.brand, image, finalPrice };
// }

// async function getCartResponse(userId: string) {
//   const cart = await CartModel.findOne({ user: userId }).populate(
//     "items.product", "title brand price salePercentage images"
//   );

//   const items = ((cart?.items || []) as unknown as CartPreviewItem[])
//     .filter((item) => item.product)
//     .map((item) => ({
//       ...formatProduct(item.product!),
//       quantity: item.quantity,
//       color: item.color,
//       size: item.size,
//     }));

//   return { items, totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0) };
// }

// function isSameCartItem(
//   item: { product: unknown; color?: string; size?: string },
//   productId: string,
//   color?: string,
//   size?: string
// ) {
//   return (
//     String(item.product) === productId &&
//     (item.color || "") === (color || "") &&
//     (item.size || "") === (size || "")
//   );
// }

// const MAX_PER_VARIANT = 5;

// export async function POST(req: NextRequest) {
//   await connectDB();

//   const auth = getAuthUser(req);
//   if (auth.error) return NextResponse.json({ status: "error", message: auth.error }, { status: auth.status });

//   try {
//     const body = await req.json();
//     const productId = String(body.productId || "").trim();
//     const quantity = Number(body.quantity || 1);
//     const colorValue = String(body.color || "").trim();
//     const sizeValue = String(body.size || "").trim();

//     if (!productId) return NextResponse.json({ status: "error", message: "Product id is required" }, { status: 400 });
//     if (isNaN(quantity) || quantity < 1) return NextResponse.json({ status: "error", message: "Quantity must be at least 1" }, { status: 400 });

//     const product = await ProductModel.findOne({ _id: productId, status: "active" });
//     if (!product) return NextResponse.json({ status: "error", message: "Product not found" }, { status: 404 });

//     let color: string | undefined;
//     let size: string | undefined;

//     if (product.colors.length > 0) {
//       if (!colorValue) return NextResponse.json({ status: "error", message: "Color is required" }, { status: 400 });
//       if (!product.colors.some((c: { name: string }) => c.name === colorValue))
//         return NextResponse.json({ status: "error", message: "Invalid color" }, { status: 400 });
//       color = colorValue;
//     }

//     if (product.sizes.length > 0) {
//       if (!sizeValue) return NextResponse.json({ status: "error", message: "Size is required" }, { status: 400 });
//       if (!product.sizes.includes(sizeValue as ProductSize))
//         return NextResponse.json({ status: "error", message: "Invalid size" }, { status: 400 });
//       size = sizeValue;
//     }

//     if (quantity > product.stock)
//       return NextResponse.json({ status: "error", message: `Only ${product.stock} items in stock` }, { status: 400 });

//     let cart = await CartModel.findOne({ user: auth.decoded.id });
//     if (!cart) cart = await CartModel.create({ user: auth.decoded.id, items: [] });

//     const itemIndex = cart.items.findIndex((item: { product: unknown; color?: string; size?: string }) =>
//       isSameCartItem(item, String(product._id), color, size)
//     );

//     const existingQty = itemIndex >= 0 ? cart.items[itemIndex].quantity : 0;
//     const nextQuantity = existingQty + quantity;

//     if (nextQuantity > MAX_PER_VARIANT)
//       return NextResponse.json({ status: "error", message: `Maximum ${MAX_PER_VARIANT} items allowed` }, { status: 400 });

//     if (nextQuantity > product.stock)
//       return NextResponse.json({ status: "error", message: `Only ${product.stock} items in stock` }, { status: 400 });

//     if (itemIndex >= 0) {
//       cart.items[itemIndex].quantity = nextQuantity;
//     } else {
//       cart.items.push({ product: product._id, quantity, color, size: size as ProductSize });
//     }

//     await cart.save();

//     return NextResponse.json({ status: "success", data: await getCartResponse(auth.decoded.id) });

//   } catch (err: unknown) {
//     const msg = err instanceof Error ? err.message : "Something went wrong";
//     return NextResponse.json({ status: "error", message: msg }, { status: 500 });
//   }
// }


























import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { CartModel } from "@/models/Cart";
import { ProductModel } from "@/models/Product";
import { connectDB } from "@/lib/connectDB";
import { ProductSize } from "@/components/Home/products/types";

type ProductPreview = {
  _id: string;
  title: string;
  brand: string;
  price: number;
  salePercentage: number;
  images: Array<{ url: string; isCover?: boolean }>;
};

type CartPreviewItem = {
  product: ProductPreview | null;
  quantity: number;
  color?: string;
  size?: string;
};

function getAuthUser(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    console.log("thatis", token);

    return { error: "Unauthorized", status: 401 };
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

// function formatProduct(product: ProductPreview) {
//   const image =
//     product.images.find((item) => item.isCover)?.url ||
//     product.images[0]?.url ||
//     "";
//   const finalPrice = product.salePercentage
//     ? Math.round(product.price - (product.price * product.salePercentage) / 100)
//     : product.price;
//   return {
//     productId: String(product._id),
//     title: product.title,
//     brand: product.brand,
//     image,
//     finalPrice,
//   };
// }

// async function getCartResponse(userId: string) {
//   const cart = await CartModel.findOne({ user: userId }).populate(
//     "items.product",
//     "title brand price salePercentage images"
//   );

//   const cartItems = (cart?.items || []) as unknown as CartPreviewItem[];
//   const items = cartItems.flatMap((cartItem) => {
//     if (!cartItem.product) return [];
//     return [
//       {
//         ...formatProduct(cartItem.product),
//         quantity: cartItem.quantity,
//         color: cartItem.color,
//         size: cartItem.size,
//       },
//     ];
//   });
//   const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
//   return { items, totalQuantity };
// }




function formatProduct(product: ProductPreview) {
  const image = product.images.find((i) => i.isCover)?.url || product.images[0]?.url || "";
  const finalPrice = product.salePercentage
    ? Math.round(product.price - (product.price * product.salePercentage) / 100)
    : product.price;
  return { productId: String(product._id), title: product.title, brand: product.brand, image, finalPrice };
}

async function getCartResponse(userId: string) {
  const cart = await CartModel.findOne({ user: userId }).populate(
    "items.product", "title brand price salePercentage images"
  );

  const items = ((cart?.items || []) as unknown as CartPreviewItem[])
    .filter((item) => item.product)
    .map((item: any) => ({
      ...formatProduct(item.product!),
      quantity: item.quantity,
      color: item.color,
      size: item.size,
    }));

  return { items, totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0) };
}

// function isSameCartItem(item: any, productId: string, color?: string, size?: string) {
//   return (
//     String(item.product) === productId &&
//     (item.color || "") === (color || "") &&
//     (item.size || "") === (size || "")
//   );
// }

// POST /api/customer/cart/items

export async function POST(req: NextRequest) {
  await connectDB();

  const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json(
      { status: "error", message: auth.error },
      { status: auth.status }
    );
  }

  try {
    const body = await req.json();

    const productId = String(body.productId || "").trim();
    const quantity = Number(body.quantity || 1);
    const colorValue = String(body.color || "").trim();
    const sizeValue = String(body.size || "").trim();

    // ===============================
    // BASIC VALIDATION
    // ===============================
    if (!productId) {
      return NextResponse.json(
        { status: "error", message: "Product id is required" },
        { status: 400 }
      );
    }

    if (isNaN(quantity) || quantity < 1) {
      return NextResponse.json(
        { status: "error", message: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

    // ===============================
    // GET PRODUCT
    // ===============================
    const product = await ProductModel.findOne({
      _id: productId,
      status: "active",
    });

    if (!product) {
      return NextResponse.json(
        { status: "error", message: "Product not found" },
        { status: 404 }
      );
    }

    // ===============================
    // COLOR / SIZE VALIDATION
    // ===============================
    let color: string | undefined;
    let size: string | undefined;

    if (product.colors.length > 0) {
      if (!colorValue) {
        return NextResponse.json(
          { status: "error", message: "Color is required" },
          { status: 400 }
        );
      }

      const isValidColor = product.colors.some((item: any) => item.name === colorValue);

      if (!isValidColor) {
        return NextResponse.json(
          { status: "error", message: "Selected color is invalid" },
          { status: 400 }
        );
      }

      color = colorValue;
    }

    if (product.sizes.length > 0) {
      if (!sizeValue) {
        return NextResponse.json(
          { status: "error", message: "Size is required" },
          { status: 400 }
        );
      }

      if (!product.sizes.includes(sizeValue as any)) {
        return NextResponse.json(
          { status: "error", message: "Selected size is invalid" },
          { status: 400 }
        );
      }

      size = sizeValue;
    }

    // ===============================
    // STOCK VALIDATION
    // ===============================2
    if (quantity > product.stock) {
      return NextResponse.json(
        {
          status: "error",
          message: `Only ${product.stock} items available in stock`,
        },
        { status: 400 }
      );
    }

    // ===============================
    // FIND OR CREATE CART
    // ===============================
    let cart = await CartModel.findOne({
      user: auth.decoded.id,
    });

    if (!cart) {
      cart = await CartModel.create({
        user: auth.decoded.id,
        items: [],
      });
    }

    // ===============================
    // FIND SAME VARIANT
    // (same product + same color + same size)
    // ===============================
    // const itemIndex = cart.items.findIndex((item: any) =>
    //   isSameCartItem(
    //     item,
    //     String(product._id),
    //     color,
    //     size
    //   )
    // );

    const itemIndex = cart.items.findIndex((item: any) => {
      return (
        String(item.product) === String(product._id) &&
        item.color === color &&
        item.size === size
      );
    });

    // Existing quantity for this exact variant
    const existingVariantQty = itemIndex >= 0 ? cart.items[itemIndex].quantity : 0;

    // Quantity after add
    const nextQuantity = existingVariantQty + quantity;

    // ===============================
    // MAX 5 PER VARIANT
    // ===============================
    const MAX_PER_VARIANT = 5;

    if (nextQuantity > MAX_PER_VARIANT) {
      return NextResponse.json(
        {
          status: "error",
          message: `Maximum ${MAX_PER_VARIANT} items allowed for this variant`,
        },
        { status: 400 }
      );
    }

    // ===============================
    // STOCK CHECK FOR THIS VARIANT
    // ===============================
    if (nextQuantity > product.stock) {
      return NextResponse.json(
        {
          status: "error",
          message: `Only ${product.stock} items available in stock`,
        },
        { status: 400 }
      );
    }

    // ===============================
    // UPDATE OR INSERT ITEM
    // ===============================
    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity = nextQuantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity,
        color,
        size: size as ProductSize,
      });
    }

    // ===============================
    // SAVE CART
    // ===============================
    await cart.save();

    // ===============================
    // RETURN UPDATED CART
    // ===============================
    const data = await getCartResponse(auth.decoded.id);

    return NextResponse.json({
      status: "success",
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "error",
        message:
          err.message || "Something went wrong",
      },
      { status: 500 }
    );
  }
}