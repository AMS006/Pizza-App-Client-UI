import Image from 'next/image'
import React from 'react'

interface ItemCardProps {
    orderItem: OrderItemType
}

const ItemCard = ({ orderItem }: ItemCardProps) => {
    return (
        <div className='flex gap-4 border-b pb-4'>
            <Image src={orderItem.image} alt={orderItem.name} height={50} width={140} />
            <div className='flex flex-col gap-0'>
                <span className='font-semibold text-sm'>{orderItem.name}</span>

                <div className='flex flex-col'>
                    {
                        Object.entries(orderItem.chosenConfiguration.priceConfiguration)
                            .map(([key, value], index) => {
                                return (
                                    <span key={index} className='text-sm'>
                                        <span className='font-semibold'>{key}</span> : {value}
                                    </span>
                                )
                            })
                    }
                    <div className='flex gap-2'>
                        <span className='text-sm font-semibold'>
                            Toppings:
                        </span>
                        {
                            orderItem.chosenConfiguration.selectedToppings.map((topping, index) => (
                                <span key={index} className='text-sm'>
                                    {topping.name}
                                </span>
                            ))
                        }
                    </div>
                </div>

                <span className='text-sm'><span className='font-semibold'>Quantity</span>: {orderItem.qty}</span>
                <span className='text-sm'><span className='font-semibold'>Total Price</span>: {orderItem.totalPrice}</span>
            </div>
        </div>
    )
}

export default ItemCard
