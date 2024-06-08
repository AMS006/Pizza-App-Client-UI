import Image from "next/image"
import Link from "next/link"
import AddressModal from "./address-modal"
import dynamic from "next/dynamic"
import UserAvatar from "./user-avator"

const CartWithoutSSR = dynamic(() => import('./cart'), { ssr: false });

const Navbar = async () => {
    const tenantResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/tenants`);

    if (!tenantResponse.ok) {
        return null;
    }

    const restaurants = (await tenantResponse.json()).tenants;

    return (
        <header className="bg-white">
            <nav className="container flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <Link href={'/'}>
                        <Image src="/logo.jpg" alt="Logo" width={80} height={80} />
                    </Link>
                    {/* <SelectRestaurant tenants={restaurants} /> */}
                    <AddressModal tenants={restaurants} />
                </div>

                <div className="flex gap-4 items-center">

                    <CartWithoutSSR />


                    <UserAvatar />
                </div>

            </nav>
        </header>
    )
}

export default Navbar
