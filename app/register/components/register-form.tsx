'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { register } from '@/api/http'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { AxiosError } from 'axios'
import { useAppSelector } from '@/lib/redux/hooks'
import { useIsLoggedIn } from '@/app/hooks'

const formSchema = z.object({
    firstName: z.string({ message: 'First Name is required' }),
    lastName: z.string({ message: 'Last Name is required' }),
    email: z.string({ message: "Email is required" }).email("Invalid email address"),
    password: z.string({ message: 'Password is required' }).min(8, 'Password must be at least 8 characters')
})
const RegisterForm = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [showPassword, setShowPassword] = React.useState(false);

    const isLoggedIn = useIsLoggedIn();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

        try {
            const { data } = await register(values);
            if (data) {
                toast({
                    description: 'Registration Successful',
                    duration: 5000,
                })
            }
            // redirect to the dashboard
            router.push('/login');
        } catch (error) {
            if (error instanceof AxiosError) {
                const message = error?.response?.data?.errors[0]?.message || 'Unable to register'
                console.log(error?.response?.data?.errors[0]?.message);
                toast({
                    variant: "destructive",
                    description: message,
                    duration: 5000,
                })
            } else {
                toast({
                    variant: "destructive",
                    description: 'Unable to register',
                    duration: 5000,
                })
            }

        }
    }

    if (isLoggedIn) {
        router.push('/')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className='grid grid-cols-2 gap-2.5 w-full'>
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter Your First Name'   {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter Your Last Name'   {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter Your Email'  {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className='relative'>
                            <FormLabel>Password</FormLabel>
                            <FormControl className='relative'>
                                <Input type={showPassword ? 'text' : 'password'} placeholder='Enter Your Password' {...field} />
                            </FormControl>

                            <FormMessage />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                type='reset' className='cursor-pointer absolute right-2 top-[34px]'>
                                {
                                    showPassword ? <IoEyeOutline className='text-gray-600 text-[20px]' /> : <IoEyeOffOutline className='text-gray-600 text-[20px]' />
                                }
                            </button>
                        </FormItem>
                    )}
                />

                <Button type="submit" className='w-full'>Register</Button>
            </form>


        </Form>
    )
}

export default RegisterForm
