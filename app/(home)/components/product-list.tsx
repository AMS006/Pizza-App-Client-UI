import React from 'react'
import ProductCard from './product-card'

interface ProductListProps {
    categoryId: string
    searchParams: {
        restaurantId: string
    }
}

const ProductList = async ({ searchParams, categoryId }: ProductListProps) => {
    console.log(categoryId, "CategoryId")

    const productResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catlog/product?tenantId=${searchParams.restaurantId}&categoryId=${categoryId}`, {
        next: {
            revalidate: 10 // revalidate every 10 seconds
        }
    });

    if (!productResponse.ok) {
        return null;
    }

    const products = (await productResponse.json()).data;

    return (
        <div className='grid grid-cols-4 gap-4'>
            {products.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    )
}

export default ProductList
