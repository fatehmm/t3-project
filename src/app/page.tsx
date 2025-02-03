import Link from "next/link";
import { siteConfig } from "../config/site";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white via-slate-100 to-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="mb-6 text-7xl font-semibold tracking-tighter">
              <span className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 bg-clip-text text-transparent">
                {siteConfig.home.homeTitle}
              </span>
            </h1>
            <p className="mb-12 text-xl font-light tracking-tighter text-slate-500">
              {siteConfig.home.description}
            </p>

            <Link
              href={siteConfig.home.ctaButton.url}
              className="inline-flex items-center rounded-xl border-x-2 border-b-4 border-x-primary border-b-primary bg-gradient-to-r from-primary/90 to-primary/80 px-6 py-2 text-base font-medium text-white shadow transition-all hover:opacity-90"
            >
              {siteConfig.home.ctaButton.name}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
