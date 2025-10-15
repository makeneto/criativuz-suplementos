import StepItem from "./StepItem"

export default function Steps() {
    return (
        <section className="stepSection">
            <StepItem
                num={1}
                title="Escolha o Produto"
                description="Explora o nosso catálogo e encontra o produto certo para os teus objetivos."
            />

            <StepItem
                num={2}
                title="Faça a Encomenda"
                description="Seleciona o produto e adiciona-o ao carrinho ou faz a tua encomenda diretamente."
            />

            <StepItem
                num={3}
                title="Fale Connosco"
                description="Serás redirecionado para o WhatsApp, onde confirmas o pedido com a nossa equipa."
            />

            <StepItem
                num={4}
                title="Receba e Supere-se"
                description="Recebe o teu pedido em casa e aproveita produtos que elevam a tua performance."
            />
        </section>
    )
}
