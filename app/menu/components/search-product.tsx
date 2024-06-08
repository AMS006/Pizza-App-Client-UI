'use client'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { debounce, set } from 'lodash'

const SearchProduct = ({ categoryId }: { categoryId: string }) => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = React.useState<string>(searchParams.get('search') || '');

    const handleSearch = (search: string) => {
        console.log('searching...');

        setSearch(search);

        const restaurantId = searchParams.get('restaurantId');

        debounce(() => {
            router.push(`?restaurantId=${restaurantId}&search=${search}`);
        }, 400)()

    }

    return (
        <div className='relative py-2.5 w-1/2'>
            <Input prefix={'Search'} value={search} onChange={(e) => handleSearch(e.target.value)} className='rounded-full focus:border-0' placeholder='Search for items' />
            <SearchIcon className='absolute right-4 top-4 text-lg text-gray-600' />
        </div>
    )
}

export default SearchProduct
