'use client'
import React, { use, useEffect } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MdLocationPin } from "react-icons/md";
import { useRouter, usePathname } from 'next/navigation';

interface AddressModalProps {
    tenants: Tenant[];
}

const AddressModal = ({ tenants }: AddressModalProps) => {

    const [modalOpen, setModalOpen] = React.useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState<string>();
    const [mounted, setMounted] = React.useState(false);
    const [defaultAddress, setDefaultAddress] = React.useState<string>('');
    const router = useRouter();
    const pathname = usePathname();



    useEffect(() => {
        const selectedAddress = JSON.parse(localStorage.getItem('selectedTenant') || 'null');
        console.log(selectedAddress);
        setMounted(true);
        if (!selectedAddress || selectedAddress === null) {
            setModalOpen(true);
            console.log("Entered")
            return;
        }
        setSelectedAddress(selectedAddress?.address as string);
        setDefaultAddress(selectedAddress?.id as string);


        router.push(`?restaurantId=${selectedAddress?.id}`);

    }, [router]);



    const handleValueChange = (val: String) => {
        const selectedTenant = tenants.find((tenant) => tenant.id === Number(val));
        localStorage.setItem('selectedTenant', JSON.stringify(selectedTenant));
        setSelectedAddress(selectedTenant?.address || '');
        setDefaultAddress(String(selectedTenant?.id) || '');
        router.push(`/?restaurantId=${val}`);
        setModalOpen(false);
    }

    if (!mounted) {
        return null;
    }


    return (
        <div className='flex gap-4 items-center'>
            <div className="flex gap-1 text-primary items-center min-w-8">
                <MdLocationPin />
                <span className='font-semibold'>{selectedAddress}</span>
            </div>
            <Dialog open={modalOpen} onOpenChange={(open) => {
                console.log(modalOpen);
                if (selectedAddress) {
                    setModalOpen(false)
                }
                if (!modalOpen) {
                    setModalOpen(true);
                }
            }}>
                <DialogTrigger onClick={() => setModalOpen(true)} className="border border-primary px-2  shadow outline-none focus:outline-none ease-linear duration-150 py-2 rounded-lg">
                    Change Location
                </DialogTrigger>
                <DialogContent className="max-w-xl p-4">
                    <h3 className="text-lg font-semibold">Select Location</h3>
                    <p className="text-sm text-gray-500">Select your location to see the menu</p>
                    <Select
                        onValueChange={(value) => handleValueChange(value)}
                        defaultValue={String(defaultAddress)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Address" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {tenants.map((tenant: Tenant) => (
                                    <SelectItem key={tenant.id} value={String(tenant.id)}>{tenant.address}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddressModal
