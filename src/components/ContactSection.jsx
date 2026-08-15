import { useState } from "react";
import BASE_URL from "./urls";

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending message..." });

    try {
      const response = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to send message");
      }

      setForm({ name: "", email: "", message: "" });
      setStatus({ type: "success", message: data.message });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  return (
    <section
      id="contact"
      className="border-t border-zinc-200 bg-white py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Get in touch
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Have a wallet to list, or a question?
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-zinc-600">
            Reach out and our team will get back to you within one business day.
            Wallet integrations, partnerships, and press welcome.
          </p>
        </div>

        <form
          className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8"
          onSubmit={handleSubmit}
        >
          <div className="space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Name</span>
              <input
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-zinc-500"
                name="name"
                onChange={handleChange}
                required
                value={form.name}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Email</span>
              <input
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-zinc-500"
                name="email"
                onChange={handleChange}
                required
                type="email"
                value={form.email}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-zinc-700">Message</span>
              <textarea
                className="mt-2 min-h-32 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none transition focus:border-zinc-500"
                name="message"
                onChange={handleChange}
                required
                value={form.message}
              />
            </label>
          </div>
          <button
            className="mt-6 w-full rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={status.type === "loading"}
            type="submit"
          >
            {status.type === "loading" ? "Sending..." : "Send message"}
          </button>
          {status.message && (
            <p
              className={`mt-4 text-sm ${
                status.type === "error" ? "text-red-500" : "text-zinc-700"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
