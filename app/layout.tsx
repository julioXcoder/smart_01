import type { Metadata } from "next";
import { ThemeProvider } from "@/providers/theme-provider";
import { open_sans } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "SMART",
  description:
    "SMART is a comprehensive and advanced application designed to revolutionize the educational experience by providing an all-encompassing platform for students, educators, parents, and administrators. It serves as a centralized hub for managing academic activities, resources, communication, and progress tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
