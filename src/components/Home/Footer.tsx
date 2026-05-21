
 export function Footer() {
  return (
    <footer className="bg-[#222831] px-5 pb-10 pt-20 text-white/80">
      <div className="mx-auto max-w-7xl ">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4 text-center  ">
          <div>
            <h2 className="text-3xl font-semibold text-white">VELVET</h2>

            <p className="mt-1 text-[12px] uppercase tracking-[0.15em] text-white/50">
              Fashion Store
            </p>

            <p className="mt-6 max-w-xs text-sm leading-7 text-white/50">
              Redefining everyday fashion with premium quality clothing for men,
              women, and kids.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/50">
              <a href="#">Home</a>
              <a href="#">Shop</a>
              <a href="#">Sale</a>
              <a href="#">About</a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
              Customer
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/50">
              <a href="#">My Account</a>
              <a href="#">Orders</a>
              <a href="#">Returns</a>
              <a href="#">FAQs</a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
              Legal
            </h3>

            <div className="flex flex-col gap-3 text-sm text-white/50">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms</a>
              <a href="#">Shipping</a>
              <a href="#">Refund</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm text-white/40 md:flex-row">
          <p>© 2026 Velvet Fashion Store. All rights reserved.</p>

          <div className="flex gap-3">
            {['Visa', 'Mastercard', 'UPI', 'PayTM', 'COD'].map((item) => (
              <span
                key={item}
                className="rounded-md border border-white/10 px-3 py-1 text-[10px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}