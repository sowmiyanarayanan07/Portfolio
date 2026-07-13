import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { GridOverlay } from "@/components/layout/GridOverlay";
import { FloatingMenu } from "@/components/layout/FloatingMenu";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

export const metadata: Metadata = {
  title: "SOWMIYA NARAYANAN S — Portfolio",
  description:
    "Aspiring Data Scientist specializing in AI, Machine Learning, and Data Science. Building intelligent solutions from real-world datasets.",
  keywords: [
    "Data Scientist",
    "Machine Learning",
    "AI",
    "Python",
    "Portfolio",
    "SOWMIYA NARAYANAN",
  ],
  authors: [{ name: "SOWMIYA NARAYANAN S" }],
  openGraph: {
    title: "SOWMIYA NARAYANAN S — Portfolio",
    description:
      "Aspiring Data Scientist specializing in AI, Machine Learning, and Data Science.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <LoadingScreen />
          <CustomCursor />
          <GridOverlay />
          <FloatingMenu />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
