import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { LocaleProvider } from "@/components/providers/locale-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "IgnisCore",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <LocaleProvider>
                        {children}
                        <Toaster />
                    </LocaleProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
