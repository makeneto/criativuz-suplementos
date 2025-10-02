"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
    Headset,
    HeartHandshake,
    MapPinHouse,
    PhoneOutgoing,
    Search,
    ShoppingCart,
    TruckElectric,
    ChevronDown,
    ChevronRight,
    ArrowUpRight, // Adicione aqui
} from "lucide-react"
import useProducts from "@/hooks/useProducts"
import { formatCurrency } from "@/utils/formatCurrency"

export default function nav_bar() {
    const [products, setProducts] = useState<any[]>([])
    const [openCategory, setOpenCategory] = useState<string | null>(null)
    const [openExtraCategory, setOpenExtraCategory] = useState<string | null>(
        null
    )
    const [searchTerm, setSearchTerm] = useState("")
    const [showSearchDropdown, setShowSearchDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Buscar produtos assincronamente
    useEffect(() => {
        async function fetchProducts() {
            const result = await useProducts()
            setProducts(result?.all || [])
        }
        fetchProducts()
    }, [])

    const productList = products

    // Categorias principais (com nomes já formatados)
    const mainCategories = [
        "ganho de massa",
        "proteína",
        "creatina",
        "BCAA",
        "suporte à saúde",
    ]

    // Todas as categorias encontradas nos produtos
    const allCategories = Array.from(
        new Set(productList.map((p: any) => p.category).filter(Boolean))
    )

    // Categorias extras (não estão nas principais)
    const extraCategories = allCategories.filter(
        (cat) => !mainCategories.includes(cat.toLowerCase())
    )

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenCategory(null)
            }
        }
        if (openCategory) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [openCategory])

    // Fechar dropdown ao clicar fora do input ou da lista de pesquisa
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowSearchDropdown(false)
            }
        }
        if (showSearchDropdown) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showSearchDropdown])

    // Produtos por categoria
    function getProductsByCategory(category: string) {
        return productList.filter((p: any) => p.category === category)
    }

    // Função para formatar categoria
    function formatCategory(cat: string) {
        return cat.replace(/-/g, " ")
    }

    // Filtrar produtos conforme o termo de busca
    const filteredProducts =
        searchTerm.length > 0
            ? productList.filter((p: any) =>
                  p.name?.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : []

    return (
        <section className="nav">
            <div className="nav_inform">
                <Link href="">
                    <PhoneOutgoing />
                    923801395
                </Link>
                <p>
                    <TruckElectric />
                    Entrega grátis para 90% de Luanda
                </p>
                <Link href="">
                    <MapPinHouse />
                    Localização
                </Link>
            </div>

            <nav className="nav_bar">
                <Link href="/">
                    <img src="/logo.png" alt="Criativuz Logo" />
                </Link>
                <div className="nav_bar__categories" ref={dropdownRef}>
                    <ul className="nav_bar__categories-list">
                        {mainCategories.map((cat) => (
                            <li
                                key={cat}
                                className="nav_bar__category-item"
                                style={{ position: "relative" }}
                            >
                                <button
                                    className="nav_bar__categories-btn"
                                    onClick={() =>
                                        setOpenCategory(
                                            openCategory === cat ? null : cat
                                        )
                                    }
                                >
                                    {formatCategory(cat)}{" "}
                                    <ChevronDown size={16} />
                                </button>
                                {openCategory === cat && (
                                    <ul className="nav_bar__products-list">
                                        {getProductsByCategory(cat).map(
                                            (prod: any) => (
                                                <li key={prod.id}>
                                                    <Link
                                                        href={`/produto/${prod.id}`}
                                                    >
                                                        {prod.name}
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </li>
                        ))}

                        {/* Dropdown "Mais" para categorias extras */}
                        {extraCategories.length > 0 && (
                            <li
                                className="nav_bar__category-item"
                                style={{ position: "relative" }}
                            >
                                <button
                                    className="nav_bar__categories-btn"
                                    onClick={() =>
                                        setOpenCategory(
                                            openCategory === "mais"
                                                ? null
                                                : "mais"
                                        )
                                    }
                                >
                                    Mais <ChevronDown size={16} />
                                </button>
                                {openCategory === "mais" && (
                                    <ul className="nav_bar__products-list">
                                        {extraCategories.map((cat) => (
                                            <li
                                                key={cat}
                                                className="nav_bar__extra-category-item"
                                                style={{ position: "relative" }}
                                                onMouseEnter={() =>
                                                    setOpenExtraCategory(cat)
                                                }
                                                onMouseLeave={() =>
                                                    setOpenExtraCategory(null)
                                                }
                                            >
                                                <button
                                                    className="nav_bar__categories-btn"
                                                    style={{
                                                        width: "100%",
                                                        textAlign: "left",
                                                    }}
                                                    onClick={() =>
                                                        setOpenExtraCategory(
                                                            openExtraCategory ===
                                                                cat
                                                                ? null
                                                                : cat
                                                        )
                                                    }
                                                >
                                                    {formatCategory(cat)}{" "}
                                                    <ChevronRight size={14} />{" "}
                                                    {/* Aqui seta para direita */}
                                                </button>
                                                {/* Submenu à direita */}
                                                {openExtraCategory === cat && (
                                                    <ul className="nav_bar__products-list nav_bar__products-list--right">
                                                        {getProductsByCategory(
                                                            cat
                                                        ).map((prod: any) => (
                                                            <li key={prod.id}>
                                                                <Link
                                                                    href={`/produto/${prod.id}`}
                                                                >
                                                                    {prod.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        )}
                    </ul>
                </div>
                <aside className="nav_bar__aside">
                    <div
                        className="nav_bar__aside--inputContainer"
                        style={{ position: "relative" }}
                        ref={inputRef}
                    >
                        <Search />
                        <input
                            type="text"
                            placeholder="Procurar suplementos, acessórios..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setShowSearchDropdown(true)
                            }}
                            onFocus={() => {
                                if (searchTerm.length > 0)
                                    setShowSearchDropdown(true)
                            }}
                        />

                        {showSearchDropdown && filteredProducts.length > 0 && (
                            <ul className="nav_bar__search-dropdown">
                                <h5>Produtos</h5>
                                {filteredProducts
                                    .slice(0, 4)
                                    .map((prod: any) => (
                                        <li key={prod.id}>
                                            <Link
                                                href={`/produto/${prod.id}`}
                                                onClick={() =>
                                                    setShowSearchDropdown(false)
                                                }
                                            >
                                                <img
                                                    src={
                                                        prod.postImages?.[0] ||
                                                        "/placeholder.png"
                                                    }
                                                    alt={prod.name}
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        objectFit: "cover",
                                                        borderRadius: "4px",
                                                        marginRight: "0.7rem",
                                                    }}
                                                />
                                                <div>
                                                    <span
                                                        style={{
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {prod.name}
                                                    </span>
                                                    <span>
                                                        {Array.isArray(
                                                            prod.price
                                                        )
                                                            ? formatCurrency(
                                                                  prod.price[0]
                                                              )
                                                            : ""}
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}

                                <Link href="/">
                                    <h6>
                                        <span>
                                            Pesquisar por "{searchTerm}"
                                        </span>
                                        <ArrowUpRight />
                                    </h6>
                                </Link>
                            </ul>
                        )}
                    </div>
                    <p>
                        <Headset />
                        Ajuda
                    </p>
                    <p>
                        <HeartHandshake />
                        Favoritos
                    </p>
                    <p>
                        <ShoppingCart />
                        Carrinho
                    </p>
                </aside>
            </nav>
        </section>
    )
}
