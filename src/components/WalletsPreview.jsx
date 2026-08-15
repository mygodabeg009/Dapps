import { Link } from "react-router-dom";
import { wallets } from "../data/wallets";
import { IconArrowRight } from "./Icons";

function WalletsPreview() {
  const preview = wallets.slice(0, 8);

  return (
    <section
      id="wallets"
      className="border-t border-zinc-200 bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Wallets
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Supported wallets &amp; exchanges
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              Connect with any major wallet or exchange — from self-custody apps
              to leading centralized platforms.
            </p>
          </div>
          <Link
            to="/wallets"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-100"
          >
            View all wallets
            <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {preview.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-8 text-center transition hover:border-zinc-300 hover:bg-zinc-100"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white text-xs font-bold text-black">
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={`${item.name} logo`}
                    loading="lazy"
                    className="h-8 w-8 rounded-full object-contain"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      const fallback = event.currentTarget.nextElementSibling;
                      if (fallback) fallback.style.display = "inline";
                    }}
                  />
                ) : null}
                <span style={{ display: item.logo ? "none" : "inline" }}>
                  {item.monogram}
                </span>
              </span>
              <span className="text-sm font-medium text-zinc-900">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WalletsPreview;
