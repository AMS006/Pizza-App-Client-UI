import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React from 'react';
import ProductModal from './product-modal';
import { getFromPrice } from '@/lib/utils';
import Image from 'next/image';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type ProductCardProps = {
    product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <Card className='flex flex-col gap-2 shadow'>
            <CardHeader className='flex items-center h-[200px]'>
                <Image src={product.image} alt='Product Image' width={200} height={200} />
            </CardHeader>

            <CardContent>
                <h3 className='font-semibold'>{product.name}</h3>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className='w-full'>
                            <p className='truncate'>{product.description}</p>
                        </TooltipTrigger>
                        <TooltipContent className='w-80'>
                            <p className='text-sm text-gray-500'>{product.description}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardContent>

            <CardFooter className='flex justify-between items-center'>
                <div>
                    <span>From: </span>
                    <span className='font-semibold'>₹{getFromPrice(product)}</span>
                </div>
                <ProductModal product={product} />
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
