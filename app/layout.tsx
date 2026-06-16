import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import "./globals.css";

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["400", "600", "700", "800", "900"],
    variable: "--font-nunito",
});

export const metadata: Metadata = {
    title: "Ajuda Prudente",
    description:
        "Conectando pessoas a causas que transformam e construindo uma comunidade mais solidária",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body
                className={`${nunito.variable} antialiased flex flex-col min-h-screen`}
            >
                <NavBar /> {}
                <main className="flex flex-col flex-1">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
