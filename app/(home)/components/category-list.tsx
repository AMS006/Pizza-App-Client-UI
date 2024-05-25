import React from 'react'
import ProductCard from './product-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProductList from './product-list'

interface CategoryListProps {
    searchParams: {
        restaurantId: string
    }
}
const CategoryList = async ({ searchParams }: CategoryListProps) => {

    const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catlog/category`, {
        next: {
            revalidate: 10
        }
    });

    if (!categoryResponse.ok) {
        return null;
    }

    const categories = (await categoryResponse.json())

    return (
        <section >
            <div className='container py-8'>
                <Tabs defaultValue={categories.data[0].name}>
                    <TabsList className='mb-6' >
                        {categories.data.map((category: Category) => (
                            <TabsTrigger key={category._id} value={category.name}>
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {categories.data.map((category: Category) => (
                        <TabsContent key={category._id} value={category.name}>
                            <ProductList categoryId={category._id} searchParams={searchParams} />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    )
}

export default CategoryList
