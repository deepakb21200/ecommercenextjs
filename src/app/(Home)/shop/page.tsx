
 import ShopPage from "./ShopPageContent";

import { Suspense } from "react";

 

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ShopPage />
    </Suspense>
  );
}








 