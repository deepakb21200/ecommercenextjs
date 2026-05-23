import { Suspense } from "react";
import ShopPage from "./ShopPageContent";
 

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopPage />
    </Suspense>
  );
}