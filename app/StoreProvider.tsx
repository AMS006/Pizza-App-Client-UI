'use client'
import { useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/redux/store'
import { setInitialCartItems } from '@/lib/redux/features/cart/cartSlice'
import { fetchUserDetails } from '@/lib/redux/features/user/userSlice'
import dynamic from 'next/dynamic';

// Dynamically import the Loader component with SSR disabled
const Loader = dynamic(() => import('../components/common/Loader'), { ssr: false });

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()
    const [loading, setLoading] = useState(true);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()

        const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage

        if (isLocalStorageAvailable) {
            const cart = localStorage.getItem('cart')
            if (cart) {
                try {
                    const parsedCart = JSON.parse(cart)
                    storeRef.current.dispatch(setInitialCartItems(parsedCart))
                } catch (error) {
                    console.error('Error parsing cart from localStorage', error)
                }
            }
        }
        storeRef.current.dispatch(fetchUserDetails()).finally(() => setLoading(false));
    } else {
        // setLoading(false)
    }
    if (loading) {
        return <Loader />
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}