import React, { Suspense } from 'react'
import CategoryList from './components/category-list'

const Menu = ({ searchParams }: { searchParams: { restaurantId: string, search: string } }) => {
    return (
        <section>
            <Suspense fallback={<div>Loading...</div>}>
                <CategoryList searchParams={searchParams} />
            </Suspense>
        </section>
    )
}

export default Menu
