import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'
import LoginForm from './components/login-form'
import Link from 'next/link'


const Login = () => {

    return (
        <div className='flex h-full w-full justify-center items-center'>
            <Card className='min-w-[500px]'>
                <CardHeader>
                    <h1 className='font-bold text-xl text-center'>Login</h1>
                </CardHeader>

                <CardContent>
                    <LoginForm />
                </CardContent>

                <CardFooter className='flex justify-center w-full'>
                    <p className='text-center'>Don&apos;t have an account? <Link href='/register' className='text-primary font-semibold'>Register</Link></p>
                </CardFooter>

            </Card>
        </div>
    )
}




export default Login
