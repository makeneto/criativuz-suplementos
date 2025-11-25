import Link from "next/link"

export default function SmallGallery() {
    return (
        <div className="smallGallery">
            <Link
                href="https://pt.wikipedia.org/wiki/Ronnie_Coleman"
                target="_blank"
                title="Ronnie Coleman"
            />
            <Link
                href="https://pt.wikipedia.org/wiki/Phil_Heath"
                target="_blank"
                title="Phil Heath"
            />
            <Link
                href="https://en.wikipedia.org/wiki/Kevin_Levrone"
                target="_blank"
                title="Kevin Levrone"
            />
            <Link
                href="https://pt.wikipedia.org/wiki/Arnold_Schwarzenegger"
                target="_blank"
                title="Arnold Schwarzenegger"
            />
            <Link
                href="https://pt.wikipedia.org/wiki/Chris_Bumstead"
                target="_blank"
                title="Chris Bumstead"
            />
        </div>
    )
}
