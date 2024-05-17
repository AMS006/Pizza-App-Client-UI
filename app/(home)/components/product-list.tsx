import React from 'react'
import ProductCard from './product-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ProductListProps {
    searchParams: {
        restaurantId: string
    }
}
const ProductList = async ({ searchParams }: ProductListProps) => {

    const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catlog/category`);

    if (!categoryResponse.ok) {
        return null;
    }

    const categories = (await categoryResponse.json())


    const productResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catlog/product?tenantId=${searchParams.restaurantId}`, {
        next: {
            revalidate: 360 // revalidate every 6 minutes
        }
    });

    if (!productResponse.ok) {
        return null;
    }

    const products = (await productResponse.json()).data;



    return (
        <section >
            <div className='container py-8'>
                <Tabs defaultValue={categories[0].name}>
                    <TabsList className='mb-6' >
                        {categories.map((category: Category) => (
                            <TabsTrigger key={category._id} value={category.name}>
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {categories.map((category: Category) => (
                        <TabsContent key={category._id} value={category.name}>
                            <div className='grid grid-cols-4 gap-4'>
                                {products.filter((product: Product) => product.categoryId === category._id).map((product: Product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        </TabsContent>

                    ))}
                </Tabs>
            </div>
        </section>
    )
}

export default ProductList
