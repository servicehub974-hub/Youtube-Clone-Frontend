"use client";

import { useQuery } from "@tanstack/react-query";
import { apiGet, API_URL } from "@/lib/api";
import { Pill } from "@/components/ui/glass-panel";

type Health = {
  status: string;
  service: string;
  version: string;
  environment: string;
};

type DbHealth = { database: string; detail?: string };

/**
 * Status chips confirming (1) the frontend reaches the FastAPI backend and
 * (2) the backend reaches the database. Handy while wiring deployments.
 */
export function HealthCheck() {
  const api = useQuery({
    queryKey: ["health"],
    queryFn: () => apiGet<Health>("/api/health"),
    retry: false,
  });

  const db = useQuery({
    queryKey: ["health-db"],
    queryFn: () => apiGet<DbHealth>("/api/health/db"),
    retry: false,
    enabled: api.isSuccess, // only check DB once the API is up
  });

  // --- API chip ---
  let apiDot = "bg-white/30";
  let apiLabel = "Connecting to API…";
  if (api.isError) {
    apiDot = "bg-rose";
    apiLabel = `API offline — ${API_URL}`;
  } else if (api.data) {
    apiDot = "bg-cyan shadow-glow-cyan";
    apiLabel = `API online · v${api.data.version} · ${api.data.environment}`;
  }

  // --- DB chip ---
  let dbDot = "bg-white/30";
  let dbLabel = "Database —";
  if (db.data?.database === "connected") {
    dbDot = "bg-cyan shadow-glow-cyan";
    dbLabel = "Database connected";
  } else if (db.data?.database === "not_configured") {
    dbDot = "bg-gold";
    dbLabel = "Database not configured";
  } else if (db.data?.database === "error" || db.isError) {
    dbDot = "bg-rose";
    dbLabel = "Database error";
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Pill className="gap-2">
        <span className={`h-2 w-2 rounded-full ${apiDot}`} />
        <span className="text-white/70">{apiLabel}</span>
      </Pill>
      {api.isSuccess && (
        <Pill className="gap-2">
          <span className={`h-2 w-2 rounded-full ${dbDot}`} />
          <span className="text-white/70">{dbLabel}</span>
        </Pill>
      )}
    </div>
  );
}
