// Create a hook to check whether a user is logged in or not using redux statee
import { useAppSelector } from '@/lib/redux/hooks'

export const useIsLoggedIn = () => {
    const { user } = useAppSelector(state => state.user)
    return !!user.firstName
}