import Footer from "@/components/common/footer"
import Navbar from "@/components/common/navbar"

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}