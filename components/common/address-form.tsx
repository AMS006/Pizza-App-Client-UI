'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from '../ui/card';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAddress } from '@/api/http';

const addressSchema = z.object({
    name: z.string({ message: "Name is required" }),
    mobile: z.string({ message: "Mobile number is required" }).regex(/^\d{10}$/, "Mobile number must be 10 digits"),
    house: z.string({ message: "House Number is required" }),
    area: z.string({ message: "Street is required" }),
    landmark: z.string().optional(),
    city: z.string({ message: "City is required" }),
    state: z.string({ message: "State is required" }).min(1, { message: "State is required" }),
    pincode: z.string({ message: "Pincode is required" }).regex(/^\d{6}$/, "Pincode must be 6 digits"),
});


interface AddressFormProps {
    setModalOpen: (open: boolean) => void;
}
const AddressForm = ({ setModalOpen }: AddressFormProps) => {
    const form = useForm<z.infer<typeof addressSchema>>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            state: "", // Ensure the state field is initialized
        }
    });
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ['addAddress'],
        mutationFn: (data: AddressType) => addAddress(data),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['address'] });
            setModalOpen(false);
        },
    })

    const onSubmit = (data: AddressType) => {
        console.log(data);
        mutate(data);
    };



    return (
        <Card className='w-full overflow-y-auto h-[calc(100vh+10px)]'>
            <CardHeader className='text-xl font-bold'>Add Address</CardHeader>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className='flex flex-col gap-4'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-0'>
                                    <FormLabel htmlFor="name">Full Name (First and Last name)</FormLabel>
                                    <FormControl>
                                        <Input id="name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}

                        >

                        </FormField>

                        <FormField
                            control={form.control}
                            name="mobile"
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-0'>
                                    <FormLabel htmlFor="mobile">Mobile Number</FormLabel>
                                    <FormControl>
                                        <Input id="mobile" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >

                        </FormField>

                        <FormField
                            control={form.control}
                            name="house"
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-0'>
                                    <FormLabel htmlFor="house">Flat, House no, Building, Company, Apartment</FormLabel>
                                    <FormControl>
                                        <Input id="house" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >
                        </FormField>

                        <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-0'>
                                    <FormLabel htmlFor="street">Area, Street, Sector, Village</FormLabel>
                                    <FormControl>
                                        <Input id="street" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="landmark"
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-0'>
                                    <FormLabel htmlFor="landmark">Landmark</FormLabel>
                                    <FormControl>
                                        <Input placeholder='E.g. near apollo hospital' id="landmark" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >
                        </FormField>


                        <div className='grid grid-cols-2 gap-2.5'>
                            <FormField
                                control={form.control}
                                name="pincode"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-0'>
                                        <FormLabel htmlFor="pincode">Pincode</FormLabel>
                                        <FormControl>
                                            <Input id="pincode" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >

                            </FormField>
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem className='flex flex-col gap-0'>
                                        <FormLabel htmlFor="pincode">Town/City</FormLabel>
                                        <FormControl>
                                            <Input id="pincode" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            >

                            </FormField>
                        </div>

                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem className='flex flex-col gap-0'>
                                    <FormLabel htmlFor="state">State</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={(value) => field.onChange(value)}  >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your state" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                                                <SelectItem value="Arunachal Pradesh">Arunachal Pradesh</SelectItem>
                                                <SelectItem value="Assam">Assam</SelectItem>
                                                <SelectItem value="Bihar">Bihar</SelectItem>
                                                <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                                                <SelectItem value="Goa">Goa</SelectItem>
                                                <SelectItem value="Gujarat">Gujarat</SelectItem>
                                                <SelectItem value="Haryana">Haryana</SelectItem>
                                                <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                                                <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                                                <SelectItem value="Karnataka">Karnataka</SelectItem>
                                                <SelectItem value="Kerala">Kerala</SelectItem>
                                                <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                                                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                                                <SelectItem value="Manipur">Manipur</SelectItem>
                                                <SelectItem value="Meghalaya">Meghalaya</SelectItem>
                                                <SelectItem value="Mizoram">Mizoram</SelectItem>
                                                <SelectItem value="Nagaland">Nagaland</SelectItem>
                                                <SelectItem value="Odisha">Odisha</SelectItem>
                                                <SelectItem value="Punjab">Punjab</SelectItem>
                                                <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                                                <SelectItem value="Sikkim">Sikkim</SelectItem>
                                                <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                                                <SelectItem value="Telangana">Telangana</SelectItem>
                                                <SelectItem value="Tripura">Tripura</SelectItem>
                                                <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                                                <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                                                <SelectItem value="West Bengal">West Bengal</SelectItem>
                                                <SelectItem value="Andaman and Nicobar Islands">Andaman and Nicobar</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >
                        </FormField>

                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Submit</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
};

export default AddressForm;
