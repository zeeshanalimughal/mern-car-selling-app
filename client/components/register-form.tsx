"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from './ui/use-toast'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AuthService from '@/services/auth'
import { useRouter } from 'next/navigation'
import useIsClient from '@/hooks/useIsClient'


const RegisterFormSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email({ message: "Invalid email" }),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters long")
})


function RegisterForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const isClient = useIsClient()

    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })


    const onSubmit = async (data: z.infer<typeof RegisterFormSchema>) => {
        try {
            setLoading(true);
            const response = await AuthService.signUp(data);
            if (response?.status === 201) {
                toast({
                    title: response?.message,
                });
                setTimeout(() => {
                    form.reset()
                    router.push('/login');
                }, 1200)
            } else {
                toast({
                    variant: 'destructive',
                    title: "Invalid credentials! Please try again.",
                });
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: error?.message,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Enter name" type='text' {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Enter email" type='email' {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Enter password" type='password' {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='w-full' disabled={loading}>Register</Button>
            </form>
        </Form>
    )
}

export default RegisterForm