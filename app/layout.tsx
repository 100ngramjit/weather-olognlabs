import { Karla } from "next/font/google";
import "./globals.css";

const karla = Karla({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={karla.className}>
        <div className="flex flex-col min-h-screen">
          <header className="py-4 bg-white">
            <h1 className="text-6xl font-bold text-center">Weather App</h1>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="py-4 text-sm text-center text-gray-600">
            <p>© 2023 Weather App. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
