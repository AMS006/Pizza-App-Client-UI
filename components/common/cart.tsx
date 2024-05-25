'use client'
import { useAppSelector } from '@/lib/redux/hooks'
import { ShoppingBasket } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Cart = () => {
    const { cartItems } = useAppSelector(state => state.cart)
    return (
        <Link href={'/cart'} className="relative">
            <ShoppingBasket />
            <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center">{cartItems.length}</span>
        </Link>
    )
}

export default Cart
