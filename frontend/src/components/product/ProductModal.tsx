import { useIsInCart } from "@/hooks/cart/useIsInCart"
import { useID } from "@/hooks/product/useID"
import { useProductLogic } from "@/hooks/product/useProductLogic"
import { ProductModalProps } from "@/interfaces/interfaces"
import { useState } from "react"
import ModalHeader from "../modal/ModalHeader"
import PModalImage from "../modal/PModalImage"
import ModalInfo from "../modal/ModalInfo"
import ProductOptions from "../ui/ProductOptions"
import ModalActions from "../modal/ModalActions"

export default function ProductModal({
    product,
    setProduct,
    onSubmit,
}: ProductModalProps) {
    const [deliveryDate, setDeliveryDate] = useState<Date>()
    const prodId = useID()
    const {
        imageIndex,
        qtd,
        formattedPrice,
        formattedDiscountPrice,
        selectedWeight,
        selectedFlavor,
        handleQtd,
        handleSelectWeight,
        handleSelectFlavor,
        handleAddToCart,
        handleOrder,
    } = useProductLogic({ product, onSubmit, setProduct, deliveryDate })

    const itemData =
        selectedWeight && selectedFlavor
            ? {
                  id: prodId,
                  name: product.name,
                  image: product.postImages[0],
                  price: 0,
                  discountPrice: 0,
                  flavor: selectedFlavor,
                  weight: selectedWeight,
                  category: "unknown",
                  quantity: 1,
              }
            : null
    const isInCart = useIsInCart(itemData)

    const handleAddClick = () => {
        handleAddToCart()
        window.dispatchEvent(new Event("cartUpdated"))
    }

    return (
        <div className="modalOverlay">
            <div className="modalProduct">
                <ModalHeader product={product} setProduct={setProduct} />
                <div className="modalProduct__container">
                    <PModalImage
                        src={product.postImages[imageIndex]}
                        alt={product.name}
                    />
                    <form className="modalProduct__container--content">
                        <ModalInfo
                            product={product}
                            formattedPrice={formattedPrice}
                            formattedDiscountPrice={formattedDiscountPrice}
                        />
                        <ProductOptions
                            weights={product.weight}
                            flavors={product.flavors}
                            selectedWeight={selectedWeight}
                            selectedFlavor={selectedFlavor}
                            onSelectWeight={handleSelectWeight}
                            onSelectFlavor={handleSelectFlavor}
                        />
                        <ModalActions
                            isInCart={isInCart}
                            handleAddClick={handleAddClick}
                            handleOrder={handleOrder}
                            setProduct={setProduct}
                            deliveryDate={deliveryDate}
                            setDeliveryDate={setDeliveryDate}
                            qtd={qtd}
                            onAdd={() => handleQtd("add")}
                            onSubtract={() => handleQtd("subtract")}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
