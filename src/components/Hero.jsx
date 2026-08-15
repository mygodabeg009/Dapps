import { Link } from "react-router-dom";
import { IconArrowRight, IconWallet } from "./Icons";

const stats = [
  { label: "Total Value Locked", value: "$1.9B+" },
  { label: "Supported Wallets", value: "20+" },
  { label: "Active Users", value: "480K+" },
  { label: "Chains Supported", value: "14" },
];

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-zinc-200/60 glow-orb" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-zinc-100/80 glow-orb" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-10 lg:pb-32 lg:pt-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-100 px-4 py-1.5 text-xs font-medium text-zinc-700">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 animate-pulse" />
            Now live across 14 chains
          </div>

          <h1 className="mt-8 text-5xl font-semibold leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
            Every wallet.
            <br />
            <span className="text-gradient">One secure connection.</span>
          </h1>

          <p className="mt-6 max-w-xl text-balance text-lg leading-8 text-zinc-600">
            DappToken is the connective layer for the decentralized web —
            connect any major wallet or exchange in one click, from a single,
            secure entry point.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              to="/wallets"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200 sm:w-auto"
            >
              <IconWallet className="h-4 w-4" />
              Connect Wallet
              <IconArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center rounded-full border border-zinc-300 px-7 py-3.5 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-100 sm:w-auto"
            >
              How it works
            </a>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white px-4 py-7 text-center transition hover:bg-zinc-50 sm:px-6"
            >
              <p className="text-2xl font-semibold text-zinc-900 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs text-zinc-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
