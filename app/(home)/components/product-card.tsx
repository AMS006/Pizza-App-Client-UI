import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import ProductModal from './product-modal'
import { getFromPrice } from '@/lib/utils'

type ProductCardProps = {
    product: Product
}
const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Card className='flex flex-col gap-2 shadow'>
            <CardHeader className='flex items-center h-[150px]'>
                <Image src={product.image} alt='Product Image' width={150} height={150} />
            </CardHeader>

            <CardContent >
                <h3 className='font-semibold'>{product.name}</h3>
                <p>{product.description}</p>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
                <div>
                    <span >From: </span>
                    <span className='font-semibold'>₹{getFromPrice(product)}</span>
                </div>
                <ProductModal product={product} />
            </CardFooter>
        </Card>
    )
}

export default ProductCard
