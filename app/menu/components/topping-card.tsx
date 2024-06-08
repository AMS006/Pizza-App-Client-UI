import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CircleCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface ToppingCardProps {
    topping: Topping
    selectedToppings: Topping[]
    onToppingSelect: (topping: Topping) => void
}

const ToppingCard = ({ topping, selectedToppings, onToppingSelect }: ToppingCardProps) => {
    return (
        <Button
            variant={"outline"}
            className={cn('relative flex flex-col h-auto gap-2 items-center justify-center border', selectedToppings.includes(topping) ? 'border-primary' : 'border-transparent')}
            onClick={() => onToppingSelect(topping)}
        >
            <Image src={topping.image} alt={topping.name} width={80} height={80} />
            <h3>{topping.name}</h3>
            <span>₹{topping.price}</span>
            {selectedToppings.includes(topping) && <CircleCheck className='absolute top-2 right-2 text-primary' size={24} />}
        </Button>
    )
}

export default ToppingCard
