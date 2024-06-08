import Navbar from "@/components/common/navbar"

export default function CheckoutLayout({
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