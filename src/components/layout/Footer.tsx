export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-200 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row">
        <p className="font-display text-lg font-semibold">A&A Garden Suites</p>

        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} A&A Garden Suites. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
