import { useNavigate } from "react-router-dom"

import FeaturedProjects from "../components/FeaturedProjects"
import Testimonials from "../components/Testimonials"
import FAQSection from "../components/FAQSection"

const collections = [
  {
    title: "Laser Engraving",
    image: "/images/services/engraving.jpg",
    description:
      "Tumblers, leather patches, wood, acrylic, keychains, awards, and custom gifts."
  },
  {
    title: "Custom Apparel",
    image: "/images/services/apparel.jpg",
    description:
      "DTF transfers, shirts, hoodies, hats, team gear, uniforms, and branded merch."
  },
  {
    title: "Signs & Graphics",
    image: "/images/services/signs.jpg",
    description:
      "Business signage, banners, decals, pop-up event graphics, and promotional displays."
  },
  {
    title: "Graphic Design",
    image: "/images/services/design.jpg",
    description:
      "Logos, brand identity, layout design, product mockups, and marketing graphics."
  }
]

const stats = [
  ["Custom", "Apparel & Merch"],
  ["Laser", "Engraving"],
  ["Signs", "Graphics"],
  ["Veteran", "Owned"]
]

export default function Home() {

  const navigate = useNavigate()

  return (
    <main className="bg-[#020617] text-white">

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,.18),transparent_35%),linear-gradient(180deg,#020617,#0f172a)] px-6 py-28 text-center md:py-32">

        <div className="absolute -right-24 -top-36 h-[500px] w-[500px] rounded-full bg-cyan-400 opacity-15 blur-[180px]" />

        <div className="relative z-10 mx-auto max-w-6xl">

          <p className="mb-5 inline-block rounded-full border border-slate-500/25 bg-slate-900/70 px-4 py-2 text-sm uppercase tracking-[0.18em] text-cyan-300">
            Veteran Owned Creative Brand
          </p>

          <h1 className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-[-0.04em] md:text-7xl lg:text-8xl">
            From Iteration
            <br />
            To Creation
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
            Premium apparel, laser engraving, signs, branded merchandise,
            graphics, and creative products crafted with precision and purpose.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <button
              type="button"
              onClick={() => navigate("/store")}
              className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-7 py-4 font-bold text-white shadow-xl shadow-blue-600/30 transition hover:scale-[1.02]"
            >
              Shop Collection
            </button>

            <button
              type="button"
              onClick={() => navigate("/gallery")}
              className="rounded-2xl border border-slate-500/30 bg-slate-900/75 px-7 py-4 font-bold text-white transition hover:border-cyan-400 hover:text-cyan-300"
            >
              View Gallery
            </button>

          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-6">

            {stats.map(([stat, label]) => (

              <div
                key={`${stat}-${label}`}
                className="min-w-[170px] rounded-3xl border border-slate-500/20 bg-slate-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl"
              >

                <h2 className="text-3xl font-black text-cyan-300">
                  {stat}
                </h2>

                <p className="mt-2 text-slate-300">
                  {label}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      <section className="bg-[#020617] px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mb-14 text-center">

            <p className="mb-3 text-sm uppercase tracking-[0.18em] text-cyan-300">
              Featured Collection
            </p>

            <h2 className="text-4xl font-extrabold md:text-5xl">
              What We Create
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Explore premium products, apparel, engraving, and creative merchandise.
            </p>

          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {collections.map((collection) => (

              <article
                key={collection.title}
                className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-cyan-500"
              >

                <div className="h-56 overflow-hidden bg-slate-900">

                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.src =
                        "/image_placeholder/placeholder.png"
                    }}
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-2xl font-bold">
                    {collection.title}
                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">
                    {collection.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/store")}
                    className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-3 font-bold text-white transition hover:scale-[1.02]"
                  >
                    Shop Now
                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>

      <FeaturedProjects />

      <section className="bg-gradient-to-b from-[#020617] to-[#0f172a] px-6 py-24">

        <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-500/20 bg-slate-900/70 px-6 py-14 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">

          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-cyan-300">
            Why SignaVi
          </p>

          <h2 className="text-4xl font-extrabold md:text-5xl">
            Signature Work With A Clear Vision
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            SignaVi blends creativity, branding, and product craftsmanship
            into premium merchandise and experiences.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <button
              type="button"
              onClick={() => navigate("/gallery")}
              className="rounded-2xl border border-slate-600 px-6 py-3 font-bold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              View Gallery
            </button>

            <button
              type="button"
              onClick={() => navigate("/store")}
              className="rounded-2xl bg-cyan-500 px-6 py-3 font-black text-black transition hover:bg-cyan-400"
            >
              Shop Collection
            </button>

          </div>

        </div>

      </section>

      <Testimonials />

      <FAQSection />

    </main>
  )
}