'use client'
import React from 'react'
import TestimonialCard from './testimonial-cart';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';
import { getTopReviews } from '@/api/http';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


const Testimonials = () => {

    const { data: reviews, isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: getTopReviews,
    })

    if (isLoading) {
        return <div>Loading...</div>
    }


    return (
        <div className='container w-full my-4'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {reviews?.data.length !== 0 ? reviews?.data.map((review: ReviewType) => (
                    <SwiperSlide key={review._id}>
                        <TestimonialCard testimonial={review} />
                    </SwiperSlide>
                )) :
                    <div className='text-center mt-6'>
                        <p className=' text-gray-500'>No Testimonials Found</p>
                    </div>}
            </Swiper>
        </div>
    )
}

export default Testimonials
