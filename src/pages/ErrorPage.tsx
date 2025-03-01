import React from "react";

interface ErrorPageProps {
  message: string;
  details?: string;
  stack?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message, details, stack }) => {
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1 className="text-2xl font-bold text-red-600">{message}</h1>
      {details && <p className="text-gray-700">{details}</p>}
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-gray-100 dark:bg-gray-800 rounded-md">
          <code className="text-sm text-gray-600 dark:text-gray-300">{stack}</code>
        </pre>
      )}
    </main>
  );
};

export default ErrorPage;