'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CartItem as CartType } from '@/lib/redux/features/cart/cartSlice';
import { useAppSelector } from '@/lib/redux/hooks';
import CartItem from './cart-item';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CartItems = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isClient, setIsClient] = React.useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const cart = useAppSelector((state) => state.cart.cartItems);

    const calculateTotalPrice = React.useMemo(() => {
        return cart.reduce((acc, curr) => acc + curr.totalPrice, 0);
    }, [cart]);

    if (!isClient) {
        return null;
    }

    if (!cart.length) {
        return (
            <div className='flex flex-col items-center justify-center gap-4'>
                <Image src={'/empty-cart.png'} alt="Empty Cart" width={200} height={200} />
                <div className="flex items-center justify-center gap-2">

                    <ShoppingCart />
                    <p className="text-gray-500">
                        Your cart is empty!{' '}
                        <Link
                            className="text-orange-500"
                            href={`/?restaurantId=${searchParams.get('restaurantId')}`}>
                            continue shopping?
                        </Link>
                    </p>
                </div>
            </div>
        );
    }



    return (
        <div className="flex flex-col gap-8 ">
            {cart.map((cartItem: CartType) => (
                <CartItem key={cartItem.hash} item={cartItem} />
            ))}
            <div className="flex justify-between items-center">
                <span className="font-bold text-xl">&#8377;{calculateTotalPrice}</span>
                <Button
                    onClick={() => {
                        router.push('/checkout');
                    }}
                >
                    Checkout
                    <ArrowRight size={16} className="ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default CartItems;