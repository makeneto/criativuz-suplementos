import Spinner from "../ui/Spinner";

export default function ProductPageLoader() {
    return (
        <div
            className="productPage"
            style={{
                height: "70dvh",
                paddingTop: "10rem",
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
            }}
        >
            <Spinner size="64" />
        </div>
    )
}
