import { Inter } from "next/font/google";
import "./globals.css";

// Inter is the canonical open-source substitute for Söhne (see DESIGN.md).
// Loaded at the brand's thin (300) and regular (400) weights.
const inter = Inter({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Learning Portal",
  description: "Designer learning portal — student profile",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
