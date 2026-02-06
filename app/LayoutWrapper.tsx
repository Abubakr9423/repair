"use client";

import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/lib copy/provider";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hideNavFooter = pathname === "/" || pathname === "/reg";

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ReduxProvider>
                {!hideNavFooter && <Navbar />}
                {children}
                {!hideNavFooter && <Footer />}
                <ToastContainer position="top-center" />
            </ReduxProvider>
        </ThemeProvider>
    );
}