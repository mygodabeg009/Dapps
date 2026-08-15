import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IconClose, IconMenu, IconWallet } from "./Icons";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Wallets", href: "/#wallets" },
  { label: "Contact", href: "/#contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-zinc-200 bg-white/90 backdrop-blur-xl"
          : "border-transparent bg-white/80"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white text-sm font-bold tracking-tight text-black">
            D
          </span>
          <span className="text-lg font-semibold tracking-tight text-zinc-900">
            DappToken
          </span>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to="/wallets"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            <IconWallet className="h-4 w-4" />
            Connect Wallet
          </NavLink>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 text-zinc-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <IconClose className="h-5 w-5" />
          ) : (
            <IconMenu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-zinc-200 bg-white px-6 pb-8 pt-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
              >
                {link.label}
              </a>
            ))}
          </div>
          <NavLink
            to="/wallets"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            <IconWallet className="h-4 w-4" />
            Connect Wallet
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Navbar;
