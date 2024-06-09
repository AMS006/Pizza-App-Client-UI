import { Card, CardHeader } from '@/components/ui/card'
import { Rating } from '@smastrom/react-rating'
import Image from 'next/image'
import React from 'react'
import '@smastrom/react-rating/style.css'

interface TestimonialPorps {
    testimonial: ReviewType
}
const TestimonialCard = ({ testimonial }: TestimonialPorps) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col items-center gap-2">
                    <Image src={'/profile.jpeg'} alt="avatar" width={40} height={40} className="w-10 h-10 rounded-full" />

                    <h1 className="font-bold text-lg">{testimonial?.userName}</h1>
                </div>
            </CardHeader>
            <div className="flex flex-col items-center justify-center p-4">
                <Rating value={testimonial?.rating} readOnly style={{ width: '120px' }} />
                <p className="text-gray-500">{testimonial?.review}</p>
            </div>
        </Card>
    )
}

export default TestimonialCard
