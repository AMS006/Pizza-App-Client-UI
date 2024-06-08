'use client'
import { placeOrder, validateCoupon } from '@/api/http';
import LoadingButton from '@/components/common/loading-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { clearCart } from '@/lib/redux/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { useMutation } from '@tanstack/react-query';
import { CircleCheck, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const SucessToast = () => {
    return (
        <>
            <div className="flex items-center gap-2">
                <CircleCheck className="text-green-700" />
                <span className="font-bold">Order Placed Successfully</span>
            </div>
        </>
    );
};

const OrderSummary = () => {
    const { cartItems } = useAppSelector(state => state.cart);
    const { orderData } = useAppSelector(state => state.order);
    const { user } = useAppSelector(state => state.user);

    const [couponCode, setCouponCode] = React.useState('');
    const [couponStatus, setCouponStatus] = React.useState('');
    const [couponDiscount, setCouponDiscount] = React.useState(0);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { toast } = useToast();

    const { mutate, isPending: placingOrder } = useMutation({
        mutationKey: ['placeOrder'],
        mutationFn: (order: OrderType) => placeOrder(order),
        onSuccess: (data) => {
            console.log('Order Placed', data);

            toast({
                description: <SucessToast />,
            });

            dispatch(clearCart());
            router.push('/orders');
        },
        onError: (error) => {
            console.log('Order Error', error);

        }
    });

    const { mutate: applyCoupon, isPending: validatingCoupon } = useMutation({
        mutationKey: ['validateCoupon'],
        mutationFn: (couponCode: string) => validateCoupon(couponCode),
        onSuccess: (data) => {
            console.log('Coupon Validated', data);
            if (data.data?.error) {
                setCouponStatus('error');
                return;
            } else {
                setCouponStatus('success');
                setCouponDiscount(data.data?.discount);
            }
        },
        onError: (error) => {
            setCouponStatus('error');
            console.log('Coupon Error', error);
        }
    })


    const calculateTotalPrice = React.useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    }, [cartItems]);

    const handleApplyCoupon = () => {
        setCouponStatus('loading');
        applyCoupon(couponCode);
    }


    const handleSubmit = () => {

        const tenant = JSON.parse(localStorage.getItem('selectedTenant') || '{}');


        const order: OrderType = {
            paymentMethod: orderData.paymentMethod || 'cod',
            comment: orderData.comment,
            addressId: orderData.selectedAddress?._id || '',
            orderItems: cartItems as OrderItemType[],
            userEmail: user.email,
            customerName: orderData.selectedAddress?.name || user.firstName,
            restaurantName: tenant.name,
            restaurantId: tenant.id,
            paymentStatus: 'success',
            orderAmount: calculateFinalTotal,
            discountPercent: couponDiscount,
        }
        mutate(order);
    }


    const calculateFinalTotal = React.useMemo(() => {

        if (couponDiscount > 0) {
            return calculateTotalPrice + (calculateTotalPrice * 0.18) + (calculateTotalPrice > 500 ? 0 : 40) - (calculateTotalPrice * couponDiscount / 100);
        }

        return calculateTotalPrice + (calculateTotalPrice * 0.18) + (calculateTotalPrice > 500 ? 0 : 40);
    }, [calculateTotalPrice, couponDiscount])







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
                    <p className="font-semibold">₹ {(calculateFinalTotal).toFixed(2)}</p>
                </div>

                <div className='flex gap-2'>
                    <div className='flex flex-col gap-0 w-full'>
                        <div className='relative w-full'>
                            <Input disabled={validatingCoupon} placeholder='Coupon Code' value={couponCode} onChange={(e) => setCouponCode(e.target.value)
                            } />
                            {validatingCoupon && <LoaderCircle className='animate-spin absolute right-2 top-2 text-gray-500' />}
                        </div>
                        <span className='text-sm text-red-500'>{couponStatus === 'error' && couponCode.length > 0 && 'Invalid Coupon Code'}</span>
                        <span className='text-sm text-green-500'>{couponStatus === 'success' && couponCode.length > 0 && `${couponDiscount}% Discount Applied`}</span>
                    </div>
                    <Button variant={"outline"} onClick={handleApplyCoupon} >Apply</Button>
                </div>
            </CardContent>

            <div className='flex justify-end px-2.5 '>
                <LoadingButton onClick={handleSubmit} loading={placingOrder} text='Place Order' type='button' variant='default' />
            </div>
        </Card >
    )
}

export default OrderSummary
