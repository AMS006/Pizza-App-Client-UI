'use client'

import { getAddress } from '@/api/http'
import AddAddressModal from '@/components/common/add-address-modal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { useAppSelector } from '@/lib/redux/hooks'
import { Label } from '@radix-ui/react-label'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { BsCashStack } from "react-icons/bs";
import { CiCreditCard1 } from "react-icons/ci";
import { MdAdd } from "react-icons/md";

const availablePaymentOptions = [
    {
        name: "Cash on Delivery",
        icon: <BsCashStack />,
    },
    {
        name: "Card",
        icon: <CiCreditCard1 />,

    }
]

const CustomerDetails = () => {

    const { data: address } = useQuery({
        queryKey: ['address'],
        queryFn: getAddress
    });
    console.log(address, "Address");


    const [modalOpen, setModalOpen] = useState(false);
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
                            onValueChange={(value) => { }}
                            defaultValue={address?.data[0].house + address?.data[0].area + address?.data[0].city + address?.data[0].pincode} className="grid grid-cols-3 gap-4 mt-2">
                            {
                                address && address.data && address.data?.length > 0 && address?.data.map((item: AddressType) => {
                                    return (
                                        <div key={item.house + item.area + item.city + item.pincode}>
                                            <RadioGroupItem
                                                value={String(item.house + item.area + item.city + item.pincode)}
                                                id={String(item.house + item.area + item.city + item.pincode)}
                                                aria-label={String(item.house + item.area + item.city + item.pincode)}
                                                className="peer sr-only"
                                            />

                                            <Label
                                                htmlFor={String(item.house + item.area + item.city + item.pincode)}
                                                className="flex flex-col items-start  rounded-md border-2 bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                            >
                                                <div className='flex flex-col items-start'>
                                                    <div className='flex flex-col'>
                                                        <span>{item.name}</span>
                                                        <span>{item.mobile}</span>
                                                    </div>
                                                    <div className='flex flex-wrap gap-1'>
                                                        <span>{item.house}</span>
                                                        <span>{item.area}</span>
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
                        onValueChange={(value) => { }}
                        defaultValue={availablePaymentOptions[0].name} className="grid grid-cols-3 gap-4 mt-2">
                        {
                            availablePaymentOptions.map((item) => {
                                return (
                                    <div key={item.name}>
                                        <RadioGroupItem
                                            value={String(item.name)}
                                            id={String(item.name)}
                                            aria-label={String(item.name)}
                                            className="peer sr-only"
                                        />

                                        <Label
                                            htmlFor={String(item.name)}
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
                    <Textarea id="comment" placeholder="Add a comment" />
                </div>

            </CardContent>
        </Card>
    )
}

export default CustomerDetails
