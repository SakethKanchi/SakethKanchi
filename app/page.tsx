import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-bg font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        {/* Theme switcher — temporary mount for verification */}
        <div className="mb-8 flex items-center gap-4">
          <ThemeSwitcher />
        </div>

        {/* Token verification sample — temporary */}
        <div className="bg-surface text-fg border border-line p-4 rounded-lg w-full">
          <p className="text-muted mb-4 text-sm">
            Theme token test: surface bg · fg text · line border · muted text
          </p>
          <button className="bg-accent text-accent-fg px-3 py-1 rounded font-medium">
            CTA (accent bg)
          </button>
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left mt-8">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-fg">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-muted">
            Switch themes using the dropdown above to verify token swapping.
          </p>
        </div>
      </main>
    </div>
  );
}
