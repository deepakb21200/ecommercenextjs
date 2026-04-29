// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
 
// import { CartModel } from "@/models/Cart";
// import { ProductModel } from "@/models/Product";
// import { connectDB } from "@/lib/connectDB";

// type ProductPreview = {
//   _id: string;
//   title: string;
//   brand: string;
//   price: number;
//   salePercentage: number;
//   images: Array<{ url: string; isCover?: boolean }>;
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
//     const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
//     return { decoded };
//   } catch {
//     return { error: "Invalid token", status: 401 };
//   }
// }

// function formatProduct(product: ProductPreview) {
//   const image =
//     product.images.find((item) => item.isCover)?.url ||
//     product.images[0]?.url ||
//     "";
//   const finalPrice = product.salePercentage
//     ? Math.round(product.price - (product.price * product.salePercentage) / 100)
//     : product.price;
//   return { productId: String(product._id), title: product.title, brand: product.brand, image, finalPrice };
// }

// async function getCartResponse(userId: string) {
//   const cart = await CartModel.findOne({ user: userId }).populate(
//     "items.product", "title brand price salePercentage images"
//   );
//   // const cartItems = (cart?.items || []) as CartPreviewItem[];
//   const cartItems = (cart?.items || []) as unknown as CartPreviewItem[];
//   const items = cartItems.flatMap((cartItem) => {
//     if (!cartItem.product) return [];
//     return [{ ...formatProduct(cartItem.product), quantity: cartItem.quantity, color: cartItem.color, size: cartItem.size }];
//   });
//   const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
//   return { items, totalQuantity };
// }

// function isSameCartItem(item: any, productId: string, color?: string, size?: string) {
//   return (
//     String(item.product) === productId &&
//     (item.color || "") === (color || "") &&
//     (item.size || "") === (size || "")
//   );
// }

// // PATCH /api/customer/cart/items/[productId]/[action]
// // action = "increase" | "decrease"
// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: Promise<{ productId: string; action: string }> }
// ) {
//   await connectDB();

//   const auth = getAuthUser(req);
//   if (auth.error) {
//     return NextResponse.json({ status: "error", message: auth.error }, { status: auth.status });
//   }

//   try {
//     const { productId, action } = await params;
//     const colorValue = String(req.nextUrl.searchParams.get("color") || "").trim();
//     const sizeValue = String(req.nextUrl.searchParams.get("size") || "").trim();

//     if (!productId) {
//       return NextResponse.json({ status: "error", message: "Product id is required" }, { status: 400 });
//     }

//     if (action !== "increase" && action !== "decrease") {
//       return NextResponse.json({ status: "error", message: "Invalid action" }, { status: 400 });
//     }

//     const cart = await CartModel.findOne({ user: auth.decoded.id });
//     if (!cart) {
//       return NextResponse.json({ status: "error", message: "Cart not found" }, { status: 404 });
//     }

//     const product = await ProductModel.findOne({ _id: productId, status: "active" });
//     if (!product) {
//       return NextResponse.json({ status: "error", message: "Product not found" }, { status: 404 });
//     }

//     let color: string | undefined;
//     let size: string | undefined;

//     if (product.colors.length > 0) color = colorValue || undefined;
//     if (product.sizes.length > 0) size = sizeValue || undefined;

//     const itemIndex = cart.items.findIndex((item: any) =>
//       isSameCartItem(item, String(product._id), color, size)
//     );

//     if (itemIndex < 0) {
//       return NextResponse.json({ status: "error", message: "Cart item not found" }, { status: 400 });
//     }

  

//     if (action === "increase") {
//   // ✅ ADD THIS — total across all colors+sizes check
//   const totalAlreadyInCart = cart.items
//     .filter((item: any) => String(item.product) === String(product._id))
//     .reduce((sum: number, item: any) => sum + item.quantity, 0);

//   if (totalAlreadyInCart + 1 > product.stock) {
//     return NextResponse.json(
//       { status: "error", message: `Only ${product.stock - totalAlreadyInCart} items left in stock2` },
//       { status: 400 }
//     );
//   }

//   cart.items[itemIndex].quantity += 1;
// }
    
    
//     else {
//       cart.items[itemIndex].quantity -= 1;
//       if (cart.items[itemIndex].quantity <= 0) {
//         cart.items.splice(itemIndex, 1);
//       }
//     }

//     await cart.save();

//     const data = await getCartResponse(auth.decoded.id);
//     return NextResponse.json({ status: "success", data });
//   } catch (err: any) {
//     return NextResponse.json({ status: "error", message: err.message || "Something went wrong" }, { status: 500 });
//   }
// }










//   // if (action === "increase") {
//     //     // ✅ ADD THIS — total across all colors+sizes check
 

//     //   if (cart.items[itemIndex].quantity + 1 > product.stock) {
//     //     return NextResponse.json(
//     //       { status: "error", message: "Quantity is more than the stock" },
//     //       { status: 400 }
//     //     );
//     //   }
//     //   cart.items[itemIndex].quantity += 1;
//     // }
    











import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
 
import { CartModel } from "@/models/Cart";
import { ProductModel } from "@/models/Product";
import { connectDB } from "@/lib/connectDB";

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
  if (!token) return { error: "Unauthorized", status: 401 };
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
    return { decoded };
  } catch {
    return { error: "Invalid token", status: 401 };
  }
}

function formatProduct(product: ProductPreview) {
  const image =
    product.images.find((item) => item.isCover)?.url ||
    product.images[0]?.url ||
    "";
  const finalPrice = product.salePercentage
    ? Math.round(product.price - (product.price * product.salePercentage) / 100)
    : product.price;
  return { productId: String(product._id), title: product.title, brand: product.brand, image, finalPrice };
}

async function getCartResponse(userId: string) {
  const cart = await CartModel.findOne({ user: userId }).populate(
    "items.product", "title brand price salePercentage images"
  );
  // const cartItems = (cart?.items || []) as CartPreviewItem[];
  const cartItems = (cart?.items || []) as unknown as CartPreviewItem[];
  const items = cartItems.flatMap((cartItem) => {
    if (!cartItem.product) return [];
    return [{ ...formatProduct(cartItem.product), quantity: cartItem.quantity, color: cartItem.color, size: cartItem.size }];
  });
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return { items, totalQuantity };
}

function isSameCartItem(item: any, productId: string, color?: string, size?: string) {
  return (
    String(item.product) === productId &&
    (item.color || "") === (color || "") &&
    (item.size || "") === (size || "")
  );
}

// PATCH /api/customer/cart/items/[productId]/[action]
// action = "increase" | "decrease"
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string; action: string }> }
) {
  await connectDB();

  const auth = getAuthUser(req);
  if (auth.error) {
    return NextResponse.json({ status: "error", message: auth.error }, { status: auth.status });
  }

  try {
    const { productId, action } = await params;
    const colorValue = String(req.nextUrl.searchParams.get("color") || "").trim();
    const sizeValue = String(req.nextUrl.searchParams.get("size") || "").trim();

    if (!productId) {
      return NextResponse.json({ status: "error", message: "Product id is required" }, { status: 400 });
    }

    if (action !== "increase" && action !== "decrease") {
      return NextResponse.json({ status: "error", message: "Invalid action" }, { status: 400 });
    }

    const cart = await CartModel.findOne({ user: auth.decoded.id });
    if (!cart) {
      return NextResponse.json({ status: "error", message: "Cart not found" }, { status: 404 });
    }

    const product = await ProductModel.findOne({ _id: productId, status: "active" });
    if (!product) {
      return NextResponse.json({ status: "error", message: "Product not found" }, { status: 404 });
    }

    let color: string | undefined;
    let size: string | undefined;

    if (product.colors.length > 0) color = colorValue || undefined;
    if (product.sizes.length > 0) size = sizeValue || undefined;

    const itemIndex = cart.items.findIndex((item: any) =>
      isSameCartItem(item, String(product._id), color, size)
    );

    if (itemIndex < 0) {
      return NextResponse.json({ status: "error", message: "Cart item not found" }, { status: 400 });
    }

  

  const MAX_PER_PRODUCT = 5;

if (action === "increase") {
  const totalAlreadyInCart = cart.items
    .filter((item: any) => String(item.product) === String(product._id))
    .reduce((sum: number, item: any) => sum + item.quantity, 0);

  // ✅ Stock check
  if (totalAlreadyInCart + 1 > product.stock) {
    return NextResponse.json(
      { status: "error", message: `Only ${product.stock - totalAlreadyInCart} items left in stock` },
      { status: 400 }
    );
  }

  // ✅ Max 5 per product check
  if (totalAlreadyInCart + 1 > MAX_PER_PRODUCT) {
    return NextResponse.json(
      { status: "error", message: `Maximum ${MAX_PER_PRODUCT} items allowed per product` },
      { status: 400 }
    );
  }

  cart.items[itemIndex].quantity += 1;
}
    
    
    else {
      cart.items[itemIndex].quantity -= 1;
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    }

    await cart.save();

    const data = await getCartResponse(auth.decoded.id);
    return NextResponse.json({ status: "success", data });
  } catch (err: any) {
    return NextResponse.json({ status: "error", message: err.message || "Something went wrong" }, { status: 500 });
  }
}








 