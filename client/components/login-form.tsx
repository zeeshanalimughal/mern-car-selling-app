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
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import useIsClient from '@/hooks/useIsClient'


const LoginFormSchema = z.object({
    email: z.string().email({ message: "Invalid email" }).nonempty("Email is required"),
    password: z.string().nonempty("Password is required")
})


function LoginForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const isClient = useIsClient()
    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


    const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
        try {
            setLoading(true);
            const response = await signIn("credentials", { redirect: false, ...data });
            if (response?.error) {
                toast({
                    variant: 'destructive',
                    title: "Invalid credentials! Please try again.",
                });
                return
            }
            toast({
                title: "Logged in successfully!",
            });
            setTimeout(() => {
                form.reset()
                router.push('/');
            }, 1200)
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: error?.message,
            });
        } finally {
            setLoading(false);
        }
    }

    if (!isClient) return null

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

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

                <Button type="submit" className='w-full' disabled={loading}>Login</Button>
            </form>
        </Form>
    )
}

export default LoginForm