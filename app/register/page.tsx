import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import React from 'react'
import RegisterForm from './components/register-form'
import Link from 'next/link'

const Register = () => {
    return (
        <div className='flex h-full w-full justify-center items-center py-4'>
            <Card className='min-w-[500px]'>
                <CardHeader>
                    <h1 className='font-bold text-xl text-center'>Register</h1>
                </CardHeader>

                <CardContent>
                    <RegisterForm />
                </CardContent>

                <CardFooter className='flex justify-center w-full'>
                    <p className='text-center'>Already have an account? <Link href='/login' className='text-primary font-semibold'>Login</Link></p>
                </CardFooter>

            </Card>
        </div>
    )
}

export default Register
