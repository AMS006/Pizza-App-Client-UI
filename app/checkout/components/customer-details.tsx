'use client'

import { getAddress } from '@/api/http'
import { useIsLoggedIn } from '@/app/hooks'
import AddAddressModal from '@/components/common/add-address-modal'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { setComment, setPaymentMethod, setSelectedAddress } from '@/lib/redux/features/order/orderSlice'
import { useAppDispatch } from '@/lib/redux/hooks'
import { Label } from '@radix-ui/react-label'
import { useQuery } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BsCashStack } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";

const availablePaymentOptions = [
    {
        key: "cod",
        name: "Cash on Delivery",
        icon: <BsCashStack />,
    },
    {
        key: "online",
        name: "Card",
        icon: <CiCreditCard1 />,

    }
]

const CustomerDetails = () => {

    const isLoggedIn = useIsLoggedIn();
    const dispatch = useAppDispatch();
    const [modalOpen, setModalOpen] = useState(false);


    if (!isLoggedIn) {
        redirect('/login?redirect=/checkout');
    }

    const { data: address } = useQuery({
        queryKey: ['address'],
        queryFn: getAddress,

    });


    const handleAddressChange = (value: string) => {
        const selectedAddress = address?.data.find((item: AddressType) => item._id === value);

        if (selectedAddress) {
            dispatch(setSelectedAddress(selectedAddress));
        }
    }

    const handlePaymentModeChange = (value: string) => {
        dispatch(setPaymentMethod(value));
    }

    const handleCommentChange = (value: string) => {
        dispatch(setComment(value));
    }

    useEffect(() => {
        if (address?.data && address?.data.length > 0) {
            dispatch(setSelectedAddress(address.data[0]));
        }
    }, [address, dispatch])

    useEffect(() => {
        dispatch(setPaymentMethod(availablePaymentOptions[0].key));
    }, [dispatch]);



    return (

        <Card className="w-2/3">
            <CardHeader>
                <h1 className="text-lg font-bold">Customer details</h1>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-1.5">
                    <h4 className="text-sm font-semibold">Delivery Address</h4>
                    <div>
                        <RadioGroup
                            onValueChange={handleAddressChange}
                            defaultValue={address && address.data?.length > 0 ? address.data[0]?._id : ''} className="grid grid-cols-3 gap-4 mt-2">
                            {
                                address && address.data && address.data?.length > 0 && address?.data.map((item: AddressType) => {
                                    return (
                                        <div key={item._id}>
                                            <RadioGroupItem
                                                value={item._id}
                                                id={item._id}
                                                aria-label={item._id}
                                                className="peer sr-only"
                                            />

                                            <Label
                                                htmlFor={item._id}
                                                className="flex flex-col items-start  rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                <div className='flex flex-col items-start'>
                                                    <div className='flex flex-col'>
                                                        <span>{item.name}</span>
                                                        <span>{item.mobile}</span>
                                                    </div>
                                                    <div className='flex flex-wrap gap-1'>
                                                        <span>{item.addressLine1}</span>
                                                        <span>{item.addressLine2}</span>
                                                    </div>
                                                    <div className='flex flex-wrap gap-1'>
                                                        <span>{item.city}</span>
                                                        <span>{item.state}</span>
                                                        <b>{item.pincode}</b>
                                                    </div>
                                                </div>
                                            </Label>
                                        </div>
                                    )
                                })
                            }
                            <AddAddressModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
                        </RadioGroup>
                    </div>

                </div>
                <div className="flex flex-col gap-1.5 mt-6">
                    <h4 className="text-sm font-semibold">Payment Mode</h4>
                    <RadioGroup
                        onValueChange={handlePaymentModeChange}
                        defaultValue={availablePaymentOptions[0].key} className="grid grid-cols-3 gap-4 mt-2">
                        {
                            availablePaymentOptions.map((item) => {
                                return (
                                    <div key={item.name}>
                                        <RadioGroupItem
                                            value={String(item.key)}
                                            id={String(item.key)}
                                            aria-label={String(item.name)}
                                            className="peer sr-only"
                                        />

                                        <Label
                                            htmlFor={String(item.key)}
                                            className="flex flex-col items-center justify-between rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                        >
                                            {item.icon}
                                            {item.name}
                                        </Label>
                                    </div>
                                )
                            })
                        }
                    </RadioGroup>

                </div>
                <div className="flex flex-col gap-1.5 mt-6">
                    <Label htmlFor="comment" className="text-sm font-semibold">Comment</Label>
                    <Textarea onChange={(e) => handleCommentChange(e.target.value)} id="comment" placeholder="Add a comment" />
                </div>

            </CardContent>
        </Card>
    )
}

export default CustomerDetails
