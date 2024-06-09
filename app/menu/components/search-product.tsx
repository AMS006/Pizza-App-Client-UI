'use client'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { debounce } from 'lodash'

const SearchProduct = () => {

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
        <div className='container w-full bg-white rounded flex items-center justify-start'>
            <div className='relative py-2.5 w-1/2'>
                <Input prefix={'Search'} value={search} onChange={(e) => handleSearch(e.target.value)} className='rounded-full focus:border-0' placeholder='Search for items' />
                <SearchIcon className='absolute right-4 top-4 text-lg text-gray-600' />
            </div>
        </div>
    )
}

export default SearchProduct
