'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'

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
import { login, logout } from '@/api/http'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { setUser } from '@/lib/redux/features/user/userSlice'
import { useToast } from '@/components/ui/use-toast'
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useIsLoggedIn } from '@/app/hooks'

const formSchema = z.object({
    email: z.string({ message: "Email is Required" }).email("Invalid email address"),
    password: z.string({ message: "Password is Required" }),
})

const LoginForm = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const isLoggedIn = useIsLoggedIn();
    console.log(isLoggedIn)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const [showPassword, setShowPassword] = React.useState(false);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {

            const { data } = await login(values);
            if (data.role !== 'customer') {
                // logout the user
                await logout();
                return;
            }
            // redirect to the dashboard
            router.push('/');
            dispatch(setUser(data));
        } catch (error) {
            toast({
                variant: "destructive",
                description: 'Invalid Email or Password',
                duration: 5000,
            })

        }
    }

    if (isLoggedIn) {
        router.push('/')
    }

    return (
        <Form {...form} >
            <form className="space-y-8" onSubmit={
                form.handleSubmit(onSubmit)
            }>
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
                            <FormControl>
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
                <Button type="submit" className='w-full'>Login</Button>
            </form>
        </Form>
    )
}

export default LoginForm
