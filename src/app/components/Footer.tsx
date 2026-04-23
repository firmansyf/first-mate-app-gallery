import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-gray-200 bg-white">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Link href="/" className="text-lg font-bold text-blue-600 font-serif">
          FirstMate
        </Link>

        <p className="text-xs text-gray-500 text-center">
          &copy; {year} Yusuf Firmansyah. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <Link href="/" className="hover:text-blue-600">
            Gallery
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>
          <span className="text-gray-300">|</span>
          <span>@yusuf.firmansyah_</span>
        </div>
      </div>
    </footer>
  );
}
