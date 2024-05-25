import Navbar from "@/components/common/navbar"

export default function CartLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}