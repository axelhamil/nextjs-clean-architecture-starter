import { type ReactElement, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useGetUserQuery } from "./libs/api/useGetUserQuery";
import { Providers } from "./libs/providers";

function App(): ReactElement {
  const { data, status, isLoading } = useGetUserQuery();

  const serverOK = status === "success";

  if (!serverOK || isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <span className="block text-5xl">🔌</span>
          </div>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
            Server unavailable
          </h2>
          <p className="text-gray-600">
            Please verify that the server is running.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            React Boilerplate
          </h1>
          <p className="mt-4 text-lg text-gray-900">
            A modern and optimized starting point for your React applications
          </p>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
                <span className="text-xl font-medium text-white">
                  {data?.name?.toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {data?.name}
                </h3>
                <p className="text-gray-900">{data?.email}</p>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">ID:</span>
                <code className="rounded bg-white px-2 py-1 text-sm font-mono text-gray-900 ring-1 ring-gray-200">
                  {data?.id}
                </code>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-4">
              {serverOK ? (
                <p className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                    ✓
                  </span>
                  Server is accessible
                </p>
              ) : (
                <p className="flex items-center gap-2 text-sm font-medium text-red-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100">
                    ✕
                  </span>
                  Server is not accessible
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>,
);
