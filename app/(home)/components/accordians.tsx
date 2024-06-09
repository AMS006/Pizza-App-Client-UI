import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '@/components/ui/accordion'
import React from 'react'

const Accordians = () => {
    return (
        <div className='container lg:w-3/4 mb-6'>
            <h1 className="text-3xl font-bold text-center mb-6 text-primary">Why Choose Us</h1>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value='item-1'>
                    <AccordionTrigger>
                        <span className="flex-1 text-left">Seamless Multi-Location Management</span>

                    </AccordionTrigger>
                    <AccordionContent>
                        Manage all your restaurant locations from a single, intuitive admin console. Our system allows you to oversee operations, track sales, and manage inventory seamlessly, whether you have one location or a hundred.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                    <AccordionTrigger>
                        <span className="flex-1 text-left">Enhanced Customer Experience</span>

                    </AccordionTrigger>
                    <AccordionContent>
                        Provide your customers with a smooth and user-friendly ordering experience. Our client application is designed to make browsing the menu, placing orders, and making payments quick and easy, enhancing customer satisfaction and loyalty.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value={'item-3'}>
                    <AccordionTrigger>
                        <span className="flex-1 text-left">Real-Time Analytics</span>

                    </AccordionTrigger>
                    <AccordionContent>
                        Stay informed with real-time analytics and reporting. Monitor sales performance, track popular menu items, and gain insights into customer preferences, helping you make data-driven decisions to grow your business.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value={'item-4'}>
                    <AccordionTrigger>
                        <span className="flex-1 text-left">Secure and Reliable</span>

                    </AccordionTrigger>
                    <AccordionContent>
                        We prioritize the security of your data. Our system is built with robust security measures to protect sensitive information and ensure reliable performance, giving you peace of mind.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value={'item-5'}>
                    <AccordionTrigger>
                        <span className="flex-1 text-left">Customizable and Scalable</span>

                    </AccordionTrigger>
                    <AccordionContent>
                        Our platform is fully customizable to meet the unique needs of your restaurant. Whether you’re a small café or a large chain, our system scales with your business, offering the flexibility to add new locations and features as you grow.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value={'item-6'}>
                    <AccordionTrigger>
                        <span className="flex-1 text-left">Dedicated Support</span>

                    </AccordionTrigger>
                    <AccordionContent>
                        Enjoy the confidence of having dedicated support at your fingertips. Our team is available to assist you with any questions or issues, ensuring that your operations run smoothly without interruption.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Accordians
