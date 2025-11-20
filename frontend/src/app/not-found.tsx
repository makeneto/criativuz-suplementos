import Link from "next/link"

export default function NotFoundPage() {
    return (
        <div className="notFoundPage">
            <div className="text-center">
                <h1>404</h1>
                <p>
                    Epa, tá perdido? Não sabes qual suplemento escolher? Relaxa,
                    mano! Volta ao nosso catálogo e encontra exatamente o que o
                    teu corpo precisa para ganhar força, energia e foco.
                </p>
                <Link prefetch href="/">
                    Home Page
                </Link>
            </div>
        </div>
    )
}
