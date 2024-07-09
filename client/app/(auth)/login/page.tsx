import LoginForm from '@/components/login-form';
import Link from 'next/link';
import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <LoginForm />
        <br />
        <span>Do not have an account ? <Link href="/register" className='text-blue-800 font-semibold'>Create Account</Link></span>
      </div>
    </div>
  );
};

export default Login;
