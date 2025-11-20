import TestimonialItem from "../testimonials/TestimonialItem"

export default function Testimonials() {
    return (
        <div className="testimonials">
            <div className="brandsSection">
                <p className="intro__category">Testimonials</p>
                <h1 className="font-medium ">Progresso Comprovado</h1>
                <p className="brandsSection__description">
                    <span className="lightTag">
                        Relatos de quem já sente evolução
                    </span>{" "}
                    no gás, na força e na recuperação.
                </p>
            </div>

            <div className="testimonials__grid">
                <TestimonialItem
                    message="Criativuz mudou completamente o meu ritmo nos treinos. A
                        energia sobe logo cedo e o meu corpo reage bué rápido. A
                        consistência fica mais fácil quando sentes o progresso a
                        bater de verdade no dia-a-dia."
                    abbr="MN"
                    author="Makene Neto"
                    job="Atleta de Performance"
                    className="testimonials__item--1"
                >
                    <img src="/icons/makenedev-logo.png" alt="" />
                </TestimonialItem>

                <TestimonialItem
                    message="Criativuz é mesmo poderoso e direto, não complica nada.
                        Dá logo aquele empurrão forte. Ouro puro, meu irmão."
                    abbr="BC"
                    author="Bruno “Trovão” Cangala"
                    job="Personal Trainer"
                    className="testimonials__item--2"
                />

                <TestimonialItem
                    message="Esse suplemento dá outro gás, mano. Sentes o corpo a
                        reagir na hora, a força sobe, o foco não te larga e a
                        energia dura o dia inteiro."
                    abbr="YF"
                    author="Yola Fit"
                    job="Atleta Profissional"
                    className="testimonials__item--3"
                />

                <TestimonialItem
                    message="Criativuz entregou resultados que eu não via há tempo.
                        Fiquei impressionado com a recuperação. Produto sério,
                        sem brincadeira nenhuma."
                    abbr="FM"
                    author="Fábio “Hulk” Mabiala"
                    job="Instrutor de Força"
                    className="testimonials__item--4"
                />
            </div>
        </div>
    )
}
