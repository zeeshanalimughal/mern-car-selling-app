import RegisterForm from '@/components/register-form'
import Link from 'next/link'
import React from 'react'

function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <RegisterForm />
                <br />
                <span>Already have an account ? <Link className='text-blue-800 font-semibold' href="/login">Login</Link></span>
            </div>
        </div>
    )
}

export default Register