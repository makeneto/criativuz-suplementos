import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import NavBar from "@/components/NavBar"
import WhatsAppButton from "@/components/WhatsAppButton"
import Footer from "@/components/Footer"

import "../css/style.css"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
})

export const metadata: Metadata = {
    title: "Criativuz Suplementos",
    description: "Quem Cresce Natural é Planta - Resultados não vêm só do treino",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${poppins.variable} antialiased`}>
                <NavBar />
                {children}
                <WhatsAppButton />
                <Footer />
            </body>
        </html>
    )
}
