import { Inter as Sans, Roboto_Mono as Mono } from "next/font/google";
import "../styles/globals.css";

const sans = Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${mono.variable} antialiased min-h-screen bg-background text-foreground dark`}
      >
        {children}
      </body>
    </html>
  );
}
