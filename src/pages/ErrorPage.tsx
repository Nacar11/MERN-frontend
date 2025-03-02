const ErrorPage = () => {
  return (
    <main className="flex flex-col items-center min-h-screen text-center p-4">
      <h1 className="text-2xl font-bold text-red-600">Error 404</h1>
      <p className="text-gray-700"> Page not found</p>
        <pre className="w-full p-4 overflow-x-auto bg-gray-100 dark:bg-gray-800 rounded-md">
          <code className="text-sm text-gray-600 dark:text-gray-300">Invalid Route</code>
        </pre>
    </main>
  );
};

export default ErrorPage;