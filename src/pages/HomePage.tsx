import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Server } from "lucide-react";

import { getHealth } from "../api/health";
import { getApiErrorMessage } from "../api/client";
import PageLoader from "../components/ui/PageLoader";
import ErrorPage from "./ErrorPage";

export default function HomePage() {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["api-health"],
    queryFn: getHealth,
  });

  if (isPending) return <PageLoader />;

  if (isError) {
    return (
      <ErrorPage
        message={getApiErrorMessage(error)}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <section className="mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-center gap-8 px-6 py-20 lg:px-10">
      <div className="max-w-3xl space-y-5">
        <span className="badge badge-secondary badge-outline">
          Frontend Foundation
        </span>

        <h1 className="text-5xl leading-tight md:text-7xl">
          Your Private Escape,
          <span className="block text-primary">Wherever You Stay.</span>
        </h1>

        <p className="max-w-xl text-lg text-base-content/70">
          A new digital experience for A&A Garden Suites is taking shape.
        </p>
      </div>

      <div className="card max-w-md border border-base-300 bg-base-100 shadow-sm">
        <div className="card-body gap-4">
          <div className="flex items-center gap-3">
            <Server size={20} className="text-primary" />
            <h2 className="card-title text-lg font-sans">
              Laravel API Connection
            </h2>
          </div>

          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 size={20} />
            <span className="font-semibold">Connected Successfully</span>
          </div>

          <div className="text-sm text-base-content/70">
            <p>Application: {data.data.application}</p>
            <p>Status: {data.data.status}</p>
            <p>API Version: {data.data.version}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
