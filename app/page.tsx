export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">HR Compliance, Simplified.</h1>
      <p className="mb-8 text-lg text-gray-600 max-w-xl">
        Get instant HR policy answers and templates tailored to your state.
      </p>
      <a
        href="/select-location"
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
      >
        Select Your Location
      </a>
      <footer className="mt-12 text-sm text-gray-400">
        © {new Date().getFullYear()} HR Suite MVP — Not legal advice.
      </footer>
    </main>
  );
}
