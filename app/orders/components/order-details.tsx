'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useAppSelector } from '@/lib/redux/hooks'
import { Item } from '@radix-ui/react-select'
import Image from 'next/image'
import React, { useEffect } from 'react'
import ItemCard from './item-card'
import Steps from 'rc-steps'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelOrder } from '@/api/http'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import LoadingButton from '@/components/common/loading-button'
import { cn } from '@/lib/utils'
import Tag from '@/components/common/tag'
import { ReviewModal } from './review-modal'

const cancellationReasons = [
    'I placed the order by mistake',
    'I want to change the delivery address',
    'I want to change the payment method',
    'I want to change the items in the order',
    'I want to cancel the order for some other reason',
];

const formSchema = z.object({
    cancelReason: z.string({ message: "Cancellation Reason is Required" }),
})


const OrderDetails = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { selectedOrder } = useAppSelector(state => state.order);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const queryClient = useQueryClient();

    const { mutate, isPending: cancellingOrder } = useMutation({
        mutationKey: ['cancelOrder'],
        mutationFn: (reason: string) => cancelOrder(selectedOrder?._id || '', reason),
        onSuccess: () => {
            console.log('Order Cancelled');
            setIsDialogOpen(false);
            queryClient.invalidateQueries({ queryKey: ['userOrderItems'] });
        },
        onError: (error) => {
            console.log('Order Cancel Error', error);
        }
    });

    const handleCancelOrder = () => {
        console.log(form.getValues());
        if (form.getValues().cancelReason) {
            mutate(form.getValues().cancelReason);
        }

    }

    return (
        <Card className='w-2/3'>
            <CardHeader className='flex flex-row items-center justify-between w-full'>
                <h1 className='font-bold text-xl '>Order Details</h1>
                {!selectedOrder?.isReviewAdded && <ReviewModal />}
            </CardHeader>

            <CardContent>
                <div className='flex gap-4 justify-between  px-2.5 '>
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-4 justify-between '>
                            <div className='flex flex-col gap-1'>
                                <span className='font-semibold'>Order ID</span>
                                <Tag type='info'>{selectedOrder?.orderId}</Tag>
                            </div>

                            {selectedOrder?.orderDate && <div className='flex flex-col gap-1'>
                                <span className='font-semibold'>Order Date</span>
                                <Tag type='info'>{new Date(selectedOrder?.orderDate).toLocaleString('en-IN', {
                                    timeZone: 'Asia/Kolkata',
                                })}</Tag>
                            </div>}

                            {/* Total Amount */}
                            <div className='flex flex-col gap-1 px-2.5'>
                                <span className='font-semibold'>Total Amount</span>
                                <Tag type='info'>₹ {selectedOrder?.orderAmount}</Tag>
                            </div>
                        </div>


                    </div>


                </div>

                {/* Display the list of order items */}
                <div className='flex flex-col gap-4 px-2.5 mt-4'>
                    <h1 className='font-bold text-lg'>Order Items</h1>
                    {selectedOrder?.orderItems?.map((item, index) => (
                        <ItemCard key={item?._id} orderItem={item} />
                    ))}
                </div>

                {/* Additional Details which include Restaurant Name, Delivery Address, Order Status, Payment Method */}

                <h1 className='font-bold text-lg'>Additional Details</h1>
                <div className={cn('flex   w-full mt-4', !selectedOrder?.isCancelled ? 'justify-between' : 'items-start gap-4')}>
                    <div className='flex flex-col gap-4 px-2.5'>
                        <div className='flex flex-col gap-4 justify-between'>
                            <div className='flex flex-col gap-1'>
                                <span className='font-semibold'>Restaurant Name</span>
                                <span className='text-primary'>{selectedOrder?.restaurantName}</span>
                            </div>

                            <div className='flex flex-col gap-1'>
                                <span className='font-semibold'>Delivery Address</span>
                                <div className='flex flex-col'>
                                    <span className='text-primary'>{selectedOrder?.address?.name}</span>
                                    <span className='text-primary'>{selectedOrder?.address?.mobile}</span>
                                    <span className='text-primary'>{selectedOrder?.address?.addressLine1}</span>
                                    <span className='text-primary'>{selectedOrder?.address?.addressLine2}</span>
                                    <div className='flex gap-1'>
                                        <span className='text-primary'>{selectedOrder?.address?.city}</span>
                                        <span className='text-primary'>{selectedOrder?.address?.state}</span>
                                        <span className='text-primary'>{selectedOrder?.address?.pincode}</span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col items-start gap-1'>
                                <span className='font-semibold'>Payment Method</span>
                                <Tag type='info'  >{selectedOrder?.paymentMethod}</Tag>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2.5'>
                        {
                            selectedOrder?.isDelivered && selectedOrder?.deliveryDate &&
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <span className='font-semibold'>Delivered At</span>
                                    <Tag type='info' >{new Date(selectedOrder?.deliveryDate).toLocaleString('en-IN', {
                                        timeZone: 'Asia/Kolkata',
                                    })}</Tag>
                                </div>
                            </div>
                        }
                        {!selectedOrder?.isCancelled ? <Steps
                            labelPlacement="vertical"
                            direction='vertical'
                            current={0}
                            className='text-primary border-primary w-full'

                            items={[
                                {
                                    title: 'Ordered',
                                    status: selectedOrder?.orderStatus === 'Ordered' && !selectedOrder?.isConfirmed ? 'process' : 'finish',
                                },
                                {
                                    title: 'Confirmed',
                                    status: selectedOrder?.isConfirmed && selectedOrder?.orderStatus !== 'Delivered' && !selectedOrder?.isCancelled ? 'process' : selectedOrder?.orderStatus === 'Ordered' ? 'wait' : 'finish',
                                },
                                {
                                    title: 'Prepared',
                                    status: selectedOrder?.orderStatus === 'Prepared' ? 'process' : selectedOrder?.orderStatus === 'Ordered' ? 'wait' : 'finish',
                                },
                                {
                                    title: 'Out for Delivery',
                                    status: selectedOrder?.orderStatus === 'Out for Delivery' ? 'process' : selectedOrder?.orderStatus === 'Delivered' ? 'finish' : 'wait',
                                },
                                {
                                    title: 'Delivered',
                                    status: selectedOrder?.orderStatus === 'Delivered' ? 'finish' : 'wait',
                                },
                            ]}
                        /> :
                            // Display order Status, if order is cancelled with cancellation reason & cancellation date
                            <div className='flex flex-col gap-2.5'>
                                <div className='flex flex-col items-start gap-1'>
                                    <span className='font-semibold'>Order Status</span>
                                    <Tag type='danger'>{selectedOrder?.orderStatus}</Tag>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <span className='font-semibold'>Cancellation Reason</span>
                                    <span className='text-primary'>{selectedOrder?.cancelReason}</span>
                                </div>
                                {selectedOrder?.cancelDate && <div className='flex flex-col items-start gap-1'>
                                    <span className='font-semibold'>Cancelled At</span>
                                    <Tag type='info'>{new Date(selectedOrder?.cancelDate).toLocaleString('en-IN', {
                                        timeZone: 'Asia/Kolkata',
                                    })}</Tag>
                                </div>}
                            </div>
                        }
                    </div>
                </div>


                {/* Cancel button if order is not confirmed */}

                {!selectedOrder?.isConfirmed && !selectedOrder?.isCancelled && <div className='flex justify-end mt-4'>
                    <AlertDialog open={isDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <LoadingButton text='Cancel Order' loading={cancellingOrder} type='button' variant="default" onClick={() => setIsDialogOpen(true)} />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <Form {...form} >
                                <form className="space-y-8" onSubmit={
                                    form.handleSubmit(handleCancelOrder)
                                }>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to cancel your order? This action cannot be undone.
                                        </AlertDialogDescription>
                                        {/* Select  cancellation reason */}
                                        <FormField
                                            control={form.control}
                                            name="cancelReason"

                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='font-normal'>Cancellation Reason</FormLabel>
                                                    <FormControl>
                                                        <Select {...field} onValueChange={(val) => form.setValue('cancelReason', val, { shouldValidate: true })}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select a cancellation reason" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {cancellationReasons.map((reason, index) => (
                                                                        <SelectItem key={index} value={reason} >{reason}</SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage className='font-normal' />
                                                </FormItem>
                                            )}
                                        />
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className='mt-4'>
                                        <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
                                        <LoadingButton type='submit' text='Continue' loading={cancellingOrder} onClick={handleCancelOrder} variant='default' />
                                    </AlertDialogFooter>
                                </form>
                            </Form>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>}

            </CardContent>

        </Card>
    )
}

export default OrderDetails
