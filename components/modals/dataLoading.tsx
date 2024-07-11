import React from "react";

export default function MultiLineLoading() {
  return (
    <div role="status" className="w-full h-32 animate-pulse">
      <div className="h-7 rounded-full bg-gray-400 dark:bg-gray-700 mb-4"></div>
      <div className="h-7 rounded-full bg-gray-400 dark:bg-gray-700 mb-4"></div>
      <div className="h-7 rounded-full bg-gray-400 dark:bg-gray-700 mb-4"></div>
    </div>
  );
}

export function SingleLineLoading() {
  return (
    <div role="status" className="w-full h-32 animate-pulse">
      <div className="h-7 rounded-md bg-gray-400 dark:bg-gray-700 mb-4"></div>
    </div>
  );
}
