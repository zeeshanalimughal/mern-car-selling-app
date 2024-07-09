"use client"
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import useIsClient from '@/hooks/useIsClient'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { z } from "zod"
import { Label } from './ui/label'
import CarService from '@/services/car'

const AddCarFormSchema = z.object({
    carModel: z.string().nonempty("Car model is required"),
    price: z.coerce.number().refine((value: number) => value > 0, { message: "Price must be greater than 0" }),
    phone: z.string().nonempty("Phone number is required").min(11, "Phone number must be at least 11 characters").max(11, "Phone number must be at most 11 characters"),
    city: z.string().nonempty("City is required"),
    copies: z.coerce.number().refine((value: number) => value > 0, { message: "Copies must be greater than 0" }),
})


function AddCarForm() {
    const [loading, setLoading] = useState(false)
    const isClient = useIsClient()
    const [images, setImages] = useState<FileList | null>(null);
    const form = useForm<z.infer<typeof AddCarFormSchema>>({
        resolver: zodResolver(AddCarFormSchema),
        defaultValues: {
            carModel: "",
            price: 0,
            phone: "",
            city: "",
            copies: 0,
        },
    })


    const onSubmit = async (data: z.infer<typeof AddCarFormSchema>) => {

        if (!images || images.length === 0) {
            toast({
                variant: 'destructive',
                title: 'At least one image is required',
            });
            return;
        }
        if (images.length > 8) {
            toast({
                variant: 'destructive',
                title: 'At most 8 images are allowed',
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('carModel', data.carModel);
            formData.append('price', String(data.price));
            formData.append('phone', data.phone);
            formData.append('city', data.city);
            formData.append('copies', String(data.copies));
            for (let i = 0; i < images.length; i++) {
                formData.append('pictures', images[i]);
            }
            setLoading(true);
            const response = await CarService.create(formData);
            if (response?._id) {
                toast({
                    title: "Car added successfully!",
                });
                setTimeout(() => {
                    form.reset()
                }, 1200)
            } else {
                toast({
                    variant: 'destructive',
                    title: response?.message || 'Something went wrong',
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

    if (!isClient) return null

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                <FormField
                    control={form.control}
                    name="carModel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Car Model</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Enter car model" {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Enter price" type='number' {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input disabled={loading} placeholder="Enter phone" type='text' {...field} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}

                />

                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="lahore" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Lahore
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="karachi" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Karachi</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}


                />

                <FormField
                    control={form.control}
                    name="copies"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Copies</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <SelectItem key={index} value={String(++index)}>{index}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <Label className='mb-2 block'>Select Images</Label>
                    <Input disabled={loading} placeholder="Enter phone" type='file' accept='image/*' multiple onChange={(e) => setImages(e.target.files)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <Button type="submit" className='w-full' disabled={loading}>Add Car</Button>
            </form>
        </Form>
    )
}

export default AddCarForm