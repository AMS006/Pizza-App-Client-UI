'use client'
import { useEffect, useState } from "react"
import ToppingCard from "./topping-card"
import { useSearchParams } from "next/navigation"

interface ToppingListProps {
    selectedToppings: Topping[]
    onToppingSelect: (topping: Topping) => void
}
const ToppingList = ({ selectedToppings, onToppingSelect }: ToppingListProps) => {

    const searchParams = useSearchParams();
    const [toppings, setToppings] = useState<Topping[]>([])

    useEffect(() => {
        const fetchToppings = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catlog/topping?tenantId=${searchParams.get('restaurantId')}`)
            const data = await response.json()
            console.log(data)
            setToppings(data.data)
        }
        fetchToppings();
    }, [searchParams])

    return (
        <div className="grid grid-cols-3 gap-4 mt-2">
            {toppings.map((topping) => (
                <ToppingCard key={topping._id} topping={topping} selectedToppings={selectedToppings} onToppingSelect={onToppingSelect} />
            ))}
        </div>
    )
}

export default ToppingList
