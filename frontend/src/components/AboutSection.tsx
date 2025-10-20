import React from "react"
import WhatsAppIcon from "./ui/WhatsAppIcon"

export default function AboutSection() {
    return (
        <section className="about">
            <div className="about_image"></div>
            <div className="about_content">
                <h1>
                    Sobre a <span className="lightTag">Criativuz</span>
                </h1>

                <p>
                    A Criativuz Suplementos nasceu da vontade de inspirar
                    evolução real — aquela que vem da disciplina, da paciência e
                    da vontade de se superar todos os dias. Acreditamos que o
                    progresso verdadeiro é construído passo a passo, com
                    escolhas conscientes e dedicação, porque, afinal,{" "}
                    <span className="lightTag">
                        quem cresce natural é planta
                    </span>
                    .
                </p>

                <p>
                    Mais do que uma loja, somos uma marca que acredita na força
                    interior de cada pessoa. Cada produto da Criativuz é pensado
                    para acompanhar a tua jornada, fortalecendo o corpo, a mente
                    e o propósito de seguir firme, respeitando o processo e
                    celebrando cada conquista.
                </p>
            </div>
        </section>
    )
}
