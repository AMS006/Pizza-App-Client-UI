'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAppSelector } from '@/lib/redux/hooks'
import React from 'react'

const OrderSummary = () => {
    const { cartItems } = useAppSelector(state => state.cart);
    console.log(cartItems)

    const calculateTotalPrice = React.useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    }, [cartItems])

    if (cartItems.length === 0) return null;

    return (
        <Card className="w-1/3 h-auto">
            <CardHeader>
                <h1 className="text-lg font-bold">Order Summary</h1>
            </CardHeader>
            <CardContent className='flex flex-col gap-2.5'>
                <div className='w-full flex justify-between items-center'>
                    <h4 className="">Subtotal</h4>
                    <p className="font-semibold">₹ {calculateTotalPrice}</p>
                </div>

                <div className='w-full flex justify-between items-center'>
                    <h4 className="">Taxes</h4>
                    <p className=" font-semibold">₹ {(calculateTotalPrice * 0.18).toFixed(2)}</p>
                </div>

                <div className='w-full flex justify-between items-center'>
                    <h4 className="">Shipping</h4>
                    <p className="font-semibold">₹{calculateTotalPrice > 500 ? 0 : 40}</p>
                </div>

                <div className='w-full flex justify-between items-center'>
                    <h4 className="">Discount</h4>
                    <p className=" font-semibold">₹{0}</p>
                </div>

                {/* Add a Horizon */}
                <hr className='border-t border-gray-300 mt-2' />

                <div className='w-full flex justify-between items-center'>
                    <h4 className="font-semibold">Order Total</h4>
                    <p className="font-semibold">₹ {(calculateTotalPrice + (calculateTotalPrice * 0.18) + (calculateTotalPrice > 500 ? 0 : 40)).toFixed(2)}</p>
                </div>




                <div className='flex gap-2'>
                    <Input placeholder='Coupon Code' />
                    <Button variant={"outline"} >Apply</Button>
                </div>
            </CardContent>

            <div className='flex justify-end px-2.5 '>
                <Button >Place Order</Button>
            </div>
        </Card>
    )
}

export default OrderSummary
