

import Image from "next/image"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import Link from "next/link"
import { Phone, ShoppingBasket } from "lucide-react"
import { Button } from "../ui/button"
import SelectRestaurant from "./select-restaurant"
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
                    {/* <ul className="flex items-center font-medium space-x-4">
                        <li>
                            <Link className="hover:text-primary" href={'/'}>
                                Menu
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-primary" href={'/'}>
                                Orders
                            </Link>
                        </li>
                    </ul> */}
                    <CartWithoutSSR />


                    <UserAvatar />
                </div>

            </nav>
        </header>
    )
}

export default Navbar
