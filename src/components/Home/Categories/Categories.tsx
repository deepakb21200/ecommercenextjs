const categories = [
  {
    title: "Men",
    count: "48 Products",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&h=700&fit=crop",
  },
  {
    title: "Women",
    count: "64 Products",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Kids",
    count: "32 Products",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=500&h=700&fit=crop",
  },
];

export default function Categories() {
  return (
    <section className="px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#24998a]">
            Browse By
          </p>

          <h2 className="text-5xl font-light text-[#222831]">
            Shop by <em className="text-[#24998a]">Category</em>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => (
            <div
              key={item.title}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-4xl text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/70">{item.count}</p>

                <button className="mt-4 w-fit rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-lg transition hover:bg-white hover:text-black">
                  Shop Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}