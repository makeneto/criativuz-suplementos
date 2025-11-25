"use client"

import { useMediaQuery } from "react-responsive"
import LargeGallery from "../gallery/LargeGallery"
import SmallGallery from "../gallery/SmallGallery"

export default function Gallery() {
    const isMobile = useMediaQuery({ maxWidth: 639 })

    return !isMobile ? <LargeGallery /> : <SmallGallery />
}
