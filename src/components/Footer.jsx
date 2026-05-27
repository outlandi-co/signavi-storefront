import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaEnvelope,
  FaLocationDot
} from "react-icons/fa6"

import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-black shadow-lg shadow-cyan-500/20">
                S
              </div>

              <div>
                <h3 className="text-2xl font-black">
                  SignaVi
                </h3>

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Storefront
                </p>
              </div>
            </div>

            <p className="max-w-xl leading-relaxed text-slate-400">
              Premium apparel, laser engraving, signs, branded merchandise,
              graphics, and creative products crafted with precision and purpose.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                Apparel
              </span>

              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                Canopies
              </span>

              <span className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
                Table Covers
              </span>

              <span className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
                Laser Engraving
              </span>
            </div>

            <div className="mt-8 flex gap-5 text-2xl">
              <a
                href="https://www.facebook.com/signavi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-slate-400 transition hover:text-cyan-400"
              >
                <FaFacebook />
              </a>

              <a
                href="https://www.instagram.com/signavistudio/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-slate-400 transition hover:text-cyan-400"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.tiktok.com/@signavi.studio?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-slate-400 transition hover:text-cyan-400"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-bold">
              Shop
            </h4>

            <div className="flex flex-col gap-3 text-slate-400">
              <Link className="hover:text-cyan-300" to="/">
                Home
              </Link>

              <Link className="hover:text-cyan-300" to="/store">
                Store
              </Link>

              <Link className="hover:text-cyan-300" to="/gallery">
                Gallery
              </Link>

              <Link className="hover:text-cyan-300" to="/track">
                Track Order
              </Link>

              <Link className="hover:text-cyan-300" to="/customer-login">
                Customer Login
              </Link>

              <Link className="hover:text-cyan-300" to="/customer-register">
                Create Account
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-bold">
              Contact
            </h4>

            <div className="flex flex-col gap-4 text-slate-400">
              <div className="flex items-center gap-3">
                <FaLocationDot className="text-cyan-400" />
                <span>Merced, California</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-cyan-400" />
                <span>support@signavistudio.store</span>
              </div>
            </div>

            <Link
              to="/store"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-105"
            >
              Shop Products
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-5 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} SignaVi.
            All rights reserved.
          </p>

          <p>
            Signature Vision • Built for the Storefront
          </p>
        </div>
      </div>
    </footer>
  )
}