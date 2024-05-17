import Image from "next/image"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import Link from "next/link"
import { Phone, ShoppingBasket } from "lucide-react"
import { Button } from "../ui/button"
import SelectRestaurant from "./select-restaurant"

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
                    <Image src="/logo-1.png" alt="Logo" width={80} height={80} />
                    <SelectRestaurant tenants={restaurants} />
                </div>

                <div className="flex gap-4 items-center">
                    <ul className="flex items-center font-medium space-x-4">
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
                    </ul>

                    <div className="relative">
                        <ShoppingBasket />
                        <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center">2</span>
                    </div>

                    <div className="flex items-center ml-12">
                        <Phone />
                        <span>+91 9800 098 998</span>
                    </div>
                    <Button size={'sm'}>Logout</Button>
                </div>

            </nav>
        </header>
    )
}

export default Navbar
