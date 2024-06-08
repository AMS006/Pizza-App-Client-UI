import React from 'react'
import OrderItems from './components/order-items'
import OrderDetails from './components/order-details'

const Orders = async () => {

    return (
        <div className='container py-6'>
            <h1 className='font-bold text-2xl'>Your Orders</h1>

            <div className='flex gap-8'>
                <OrderItems />
                <OrderDetails />
            </div>
        </div>
    )
}

export default Orders
