"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-[300px] text-center px-4">
      <h2 className="text-red-600 text-4xl font-bold mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-700 mb-6">An unexpected error occurred.</p>
      <p>{error.message}</p>
      <button
        style={{
          background:
            "linear-gradient(to right, rgba(30, 214, 169, 1) 0%, rgba(1, 180, 228, 1) 100%)",
        }}
        onClick={() => reset()}
        className="text-white px-6 py-2 rounded-md transition"
      >
        Try Again
      </button>
    </div>
  );
}
