import React from 'react'
import ProductCard from './product-card'
import SearchProduct from './search-product'

interface ProductListProps {
    categoryId: string
    searchParams: {
        restaurantId: string
        search: string
    }
}

const ProductList = async ({ searchParams, categoryId }: ProductListProps) => {
    console.log(categoryId, "CategoryId")

    const productResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catlog/product?tenantId=${searchParams.restaurantId}&categoryId=${categoryId}&search=${searchParams?.search || ''}`, {
        next: {
            revalidate: 10 // revalidate every 10 seconds
        }
    });

    if (!productResponse.ok) {
        return null;
    }

    const products = (await productResponse.json()).data;

    return (
        <div>
            <SearchProduct />
            {products?.length !== 0 ? <div className='grid grid-cols-4 gap-4 my-4'>
                {products.map((product: Product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div> :
                <div className='text-center mt-6'>
                    <p className=' text-gray-500'>No Items Found</p>
                </div>}
        </div>
    )
}

export default ProductList
