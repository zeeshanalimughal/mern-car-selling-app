"use client"
import useIsClient from '@/hooks/useIsClient'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

function Navbar() {
    const isClient = useIsClient()
    const session = useSession()

    if (!isClient) return null
    return (
        <nav className="bg-white shadow-md rounded-lg p-5 mt-5 mx-5">
            <div className="flex items-center justify-between">
                <div className="flex gap-8">
                    <div className="text-xl font-bold text-blue-900">
                        <Link href={"/"}>CAR SELL</Link>
                    </div>

                    <div className="flex gap-5">
                        <Link href={"/my-cars"}>Listing</Link>
                    </div>
                </div>
                <div>
                    {session.status !== "loading" && <>
                        {session?.status === "authenticated" ? <div className='flex gap-5 items-center'>
                            <div className="text-blue-900">Welcome {session.data?.user?.name}</div>
                            <button onClick={() => signOut({ redirect: true })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Sign Out
                            </button>
                        </div> : <Link href={"/login"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Sign In
                        </Link>}
                    </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar