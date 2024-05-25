'use client'

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { logout } from "@/api/http";
import { setUser } from "@/lib/redux/features/user/userSlice";

const UserAvatar = () => {
    const { user } = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        // logout the user
        try {
            await logout();
            dispatch(setUser({}));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {
                !user.firstName ? (
                    <Link href={'/login'} className="bg-primary text-white px-2.5 py-1.5 rounded">
                        Login
                    </Link>
                ) : (
                    <Popover>
                        <PopoverTrigger>
                            <Avatar >
                                <AvatarFallback>
                                    {user.firstName.split('')[0]}
                                </AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-36">
                            <div className="flex flex-col gap-1.5 items-center w-full">
                                <Link href={'/'} className="flex items-center hover:bg-slate-200 w-full py-1.5 px-2.5 rounded">
                                    <CgProfile className="mr-2" />
                                    Profile
                                </Link>
                                <Link href={'/'} className="flex items-center hover:bg-slate-200 w-full py-1.5 px-2.5 rounded">
                                    <BsCart4 className="mr-2" />
                                    Orders
                                </Link>
                                <button onClick={handleLogout} className="flex items-center hover:bg-slate-200 w-full py-1.5 px-2.5 rounded">
                                    <RiLogoutCircleRLine className="mr-2" />
                                    Logout
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                )
            }
        </>
    )
}

export default UserAvatar