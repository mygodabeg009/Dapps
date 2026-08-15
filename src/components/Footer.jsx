import { Link } from "react-router-dom";
import { IconDiscord, IconGithub, IconTwitter } from "./Icons";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Wallets", href: "/#wallets" },
      { label: "Wallet Directory", href: "/wallets" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Whitepaper", href: "#" },
      { label: "Security Audits", href: "#" },
      { label: "Brand Assets", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "/#contact" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

function Footer() {
  return (
    <footer id="contact-footer" className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white text-sm font-bold tracking-tight text-black">
                D
              </span>
              <span className="text-lg font-semibold tracking-tight text-zinc-900">
                DappToken
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-500">
              The connective layer for the decentralized web — one secure
              connection to every wallet and exchange you use.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[IconTwitter, IconDiscord, IconGithub].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-500 transition hover:border-zinc-500 hover:text-zinc-900"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-zinc-900">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-zinc-500 transition hover:text-zinc-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} DappToken. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Built for the decentralized web.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
