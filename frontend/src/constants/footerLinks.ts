export const aboutLinks = [
    { label: "Quem Somos", href: "/#about" },
    { label: "Mais Vendidos", href: "/#bestseller" },
    { label: "Contacto", href: "tel:244923801395" },
]

export const productLinks = [
    {
        label: "Proteínas e Ganhos Musculares",
        href: `/search?query=${encodeURIComponent("Proteína, Ganho de Massa")}`,
    },
    {
        label: "Creatina e Aminoácidos",
        href: `/search?query=${encodeURIComponent("Creatina, Glutamina")}`,
    },
    {
        label: "Emagrecimento e Termogênicos",
        href: `/search?query=${encodeURIComponent("Queima gordura")}`,
    },
    {
        label: "Suporte à Saúde",
        href: `/search?query=${encodeURIComponent("Suporte à Saúde")}`,
    },
]

export const categoryLinks = [
    {
        label: "Proteínas",
        href: `/search?query=${encodeURIComponent("Proteína")}`,
    },
    {
        label: "Creatina",
        href: `/search?query=${encodeURIComponent("Creatina")}`,
    },
    {
        label: "Pré-treinos",
        href: `/search?query=${encodeURIComponent("Pré-treino")}`,
    },
    {
        label: "Ganhos Musculares",
        href: `/search?query=${encodeURIComponent("Ganho de Massa")}`,
    },
    {
        label: "Testosterona",
        href: `/search?query=${encodeURIComponent("Testosterona")}`,
    },
    {
        label: "Aminoácidos",
        href: `/search?query=${encodeURIComponent("Creatina, Glutamina")}`,
    },
    {
        label: "Emagrecedores",
        href: `/search?query=${encodeURIComponent("Queima gordura")}`,
    },
]
