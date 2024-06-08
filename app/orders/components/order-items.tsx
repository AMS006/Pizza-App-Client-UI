'use client'

import { getUserOrders } from "@/api/http";
import Cart from "@/components/common/cart";
import { Card, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { History } from 'lucide-react';
import OrderItem from "./order-item";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedOrder } from "@/lib/redux/features/order/orderSlice";


const OrderItems = () => {

    const { data: orderItems } = useQuery({
        queryKey: ['userOrderItems'],
        queryFn: getUserOrders,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (orderItems && orderItems.data?.data.length > 0) {
            dispatch(setSelectedOrder(orderItems.data.data[0]));
        }
    }, [orderItems, dispatch]);


    return (
        <Card className="w-1/3">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <History className="text-primary" />
                    <h1 className="font-bold text-xl">Order history</h1>
                </div>
            </CardHeader>

            <div className="flex flex-col gap-4 px-2.5">
                {orderItems?.data?.data?.map((order: OrderType) => (
                    <OrderItem key={order?.orderId} order={order} />
                ))}
            </div>

        </Card>
    )
}

export default OrderItems
