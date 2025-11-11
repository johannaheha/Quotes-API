// app/quotes/page.tsx
// Server Component: lists quotes and includes a server-action form at the top
// to create a new quote via your backend.

import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic"; // always fresh

// --- Server Action: Create quote in your backend ---------------------------
// Works without turning the whole file into a client component.
async function addQuote(formData: FormData) {
  "use server";

  const text = String(formData.get("text") || "").trim();
  const author = String(formData.get("author") || "").trim();

  if (!text) {
    // silently ignore or throw — here we just stop
    return;
  }

  try {
    await fetch("http://localhost:4000/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ quote: text, author }),
      // do not cache mutations
      cache: "no-store",
    });
  } catch (e) {
    console.error("Failed to POST quote:", e);
  }

  // Revalidate this page so the new quote appears instantly
  revalidatePath("/quotes");
}

// Helper to normalize uncertain API fields
function pickText(q: any) {
  return q?.text ?? q?.content ?? q?.quote ?? "";
}

async function getQuotes() {
  try {
    const res = await fetch("http://localhost:4000/quotes", {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`API responded with ${res.status}`);

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Failed to fetch quotes:", err);
    return null;
  }
}

export default async function QuotesPage() {
  const quotes = await getQuotes();

  if (quotes === null) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-4xl font-semibold tracking-tight">Quotes</h1>
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
          Uff… Konnte die Zitate gerade nicht laden. Läuft dein Backend auf
          <code className="mx-1 rounded bg-black/5 px-1 py-0.5 text-sm dark:bg-white/10">http://localhost:4000/quotes</code>?
        </p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 antialiased dark:bg-black dark:text-zinc-50">
      {/* Soft ambient gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-violet-500/20 to-fuchsia-400/20 blur-3xl" />
        <div className="absolute -bottom-48 right-1/2 h-[28rem] w-[28rem] translate-x-1/3 rounded-full bg-gradient-to-tr from-sky-400/20 to-emerald-400/20 blur-3xl" />
      </div>

      <main className="mx-auto max-w-6xl px-6 py-16">
        <header className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Quotes</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Live aus deinem Backend – hübsch präsentiert.</p>
          </div>
          <a
            href="http://localhost:4000/quotes"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            target="_blank"
            rel="noreferrer"
          >
            Open raw API
          </a>
        </header>

        {/* --- Add Quote Form (top of page) -------------------------------- */}
        <section className="mt-8">
          <form action={addQuote} className="rounded-2xl border border-black/5 bg-white/70 p-6 shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/60">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">Neues Zitat hinzufügen</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label htmlFor="text" className="mb-1 block text-sm font-medium">Zitat</label>
                <textarea
                  id="text"
                  name="text"
                  required
                  rows={3}
                  placeholder="The only limit to our realization of tomorrow is our doubts of today."
                  className="block w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-base shadow-sm outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-600"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="author" className="mb-1 block text-sm font-medium">Autor (optional)</label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Franklin D. Roosevelt"
                  className="block w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-base shadow-sm outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-600"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-3">
              <button type="reset" className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800">Zurücksetzen</button>
              <button type="submit" className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-95 dark:bg-white dark:text-black">Speichern</button>
            </div>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">Speichert per <code>POST /quotes</code> an dein Backend und aktualisiert die Liste automatisch.</p>
          </form>
        </section>

        {/* Grid of quotes */}
        <section className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.length === 0 && (
            <div className="col-span-full rounded-2xl border border-zinc-200 bg-white p-8 text-zinc-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              Keine Zitate gefunden.
            </div>
          )}

          {quotes.map((q: any) => {
            const text = pickText(q);
            const author = q?.author ?? q?.by ?? q?.name ?? "Unknown";
            const id = q?.id ?? q?._id ?? text?.slice(0, 24);

            return (
              <article
                key={id}
                className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white/70 p-6 shadow-xl backdrop-blur-sm transition hover:shadow-2xl dark:border-white/10 dark:bg-zinc-900/60"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="mb-4 h-6 w-6 opacity-60">
                  <path d="M7.17 6C5.42 6 4 7.42 4 9.17V20h7V9.17C11 7.42 9.58 6 7.83 6H7.17zm9 0C14.42 6 13 7.42 13 9.17V20h7V9.17C20 7.42 18.58 6 16.83 6h-.66z"/>
                </svg>
                <p className="text-lg leading-7">{text}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">— {author}</span>
                  {author !== "Unknown" && (
                    <span className="rounded-full border border-zinc-200 px-2 py-1 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                      #{String(id).slice(-4)}
                    </span>
                  )}
                </div>
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition group-hover:opacity-100 dark:via-white/5" />
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
