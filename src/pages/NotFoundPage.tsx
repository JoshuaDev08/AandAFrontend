import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[65vh] flex-col items-center justify-center gap-5 px-6 text-center">
      <span className="text-sm font-semibold tracking-widest text-secondary">
        ERROR 404
      </span>

      <h1 className="text-5xl">Page Not Found</h1>

      <p className="max-w-md text-base-content/70">
        The page you're looking for doesn't exist.
      </p>

      <Link to="/" className="btn btn-primary">
        Return Home
      </Link>
    </section>
  );
}
