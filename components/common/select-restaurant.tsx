'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

interface SelectRestaurantProps {
    tenants: Tenant[];
}

const SelectRestaurant = ({ tenants }: SelectRestaurantProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleValueChange = (val: String) => {
        router.push(`/?restaurantId=${val}`);
    }
    return (
        <Select
            defaultValue={searchParams.get('restaurantId') || ''}
            onValueChange={(value) => handleValueChange(value)}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Restaurants</SelectLabel>
                    {tenants.map((tenant: Tenant) => (
                        <SelectItem key={tenant.id} value={String(tenant.id)}>{tenant.name}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectRestaurant
