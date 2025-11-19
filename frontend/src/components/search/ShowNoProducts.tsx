import { formatCurrency } from "@/utils/formatCurrency"

interface ShowNoProducts {
    notFoundPrice: number
}

export default function ShowNoProducts({ notFoundPrice }: ShowNoProducts) {
    return (
        <div className="mt-7 flex flex-col ">
            <h1 className="text-2xl text-center font-semibold">
                Nenhum produto com o preço <br /> menor ou igual à{" "}
                <span className="lightTag">
                    {formatCurrency(notFoundPrice)}
                </span>
            </h1>
        </div>
    )
}
