import { AlertCircle } from "lucide-react";

interface ErrorPageProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorPage({
  message = "Something went wrong.",
  onRetry,
}: ErrorPageProps) {
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <AlertCircle className="text-error" size={44} />

      <h1 className="text-3xl">Unable to load content</h1>

      <p className="text-base-content/70">{message}</p>

      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </section>
  );
}
