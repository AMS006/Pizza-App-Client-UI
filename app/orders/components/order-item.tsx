
import React from 'react'
import Steps from 'rc-steps';
import 'rc-steps/assets/index.css';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setSelectedOrder } from '@/lib/redux/features/order/orderSlice';
import Tag from '@/components/common/tag';


const OrderItem = ({ order }: { order: OrderType }) => {

    const dispatch = useAppDispatch();

    const { selectedOrder } = useAppSelector(state => state.order);

    const handleSelectedOrder = () => {
        dispatch(setSelectedOrder(order));
    }




    return (
        <div onClick={handleSelectedOrder} className='relative flex items-center justify-between border-b px-2.5 pb-2.5 cursor-pointer'>
            <div>
                <h2 className='text-primary font-semibold text-sm'>{order?.orderItems?.map((item: OrderItemType) => item?.name).join(", ")}</h2>
                <p className='text-sm'>₹{order?.orderAmount}</p>
                <p className='text-sm text-gray-400'>{order.orderItems?.length} Items</p>
                <div>
                    <span className='text-sm'>Status: </span>
                    <Tag type={order?.orderStatus === 'Ordered' ? 'info' : order?.orderStatus === 'Cancelled' ? 'danger' : order?.orderStatus === 'Delivered' ? 'success' : 'info'}>{order?.orderStatus}</Tag>
                </div>

            </div>
            <div>

            </div>

            {selectedOrder?.orderId === order?.orderId && <div className='absolute -left-[10px] top-0 bottom-0 h-full bg-primary w-[4px] rounded-tr rounded-br' />}



        </div>
    )
}

export default OrderItem
