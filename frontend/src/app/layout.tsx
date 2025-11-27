import type { Metadata } from "next"
import ReactQueryProvider from "@/components/ReactQueryProvider"
import { Poppins } from "next/font/google"

import Footer from "@/components/sections/Footer"

import "../css/global.css"
import "../css/style.css"
import { ReduxProvider } from "@/redux/ReduxProvider"
import { Toaster } from "sonner"
import WhatsAppButton from "@/components/ui/WhatsAppButton"
import NavBar from "@/components/navbar/NavBar"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
})

export const metadata: Metadata = {
    title: "Criativuz Suplementos",
    description:
        "Quem Cresce Natural é Planta - Resultados não vêm só do treino",
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-BR">
            <body className={poppins.className + " antialiased"}>
                <ReduxProvider>
                    <ReactQueryProvider>
                        <NavBar />
                        {children}
                        <Toaster />
                        <WhatsAppButton />
                        <Footer />
                    </ReactQueryProvider>
                </ReduxProvider>
            </body>
        </html>
    )
}
