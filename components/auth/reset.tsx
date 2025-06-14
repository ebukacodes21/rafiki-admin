"use client";
import React, { useState } from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { CardWrapper } from "@/components/card-wrapper";
import { routes } from '@/constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema } from '@/schema';
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClipLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { apiCall, formatError } from '@/utils/helper';
import toast from 'react-hot-toast';

export const ResetForm = () => {
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const [loading, setIsLoading] = useState<boolean>(false);
    const token = useSearchParams().get('token')!;

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
        setIsLoading(true);
        const result = await apiCall("/api/reset", "POST", {...data, token});
        if (result.name === 'AxiosError') {
            toast.error(formatError(result));
            setIsLoading(false);
            return;
        }

        toast.success(result.message);
        setIsLoading(false);
        form.reset();
    }

    return (
        <CardWrapper
            headerLabel='Reset Password'
            backButtonHref={routes.LOGIN}
            backButtonLabel='Back to Login'
            subTitle="Reset your password to regain access to your account"
            topSlot={
                <h1 className="text-3xl text-start font-bold text-gray-900 px-7 italic">
                Rafiki
                </h1>
            }>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'>
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password:</FormLabel>
                                    <FormControl>
                                        <div className='flex items-center border border-gray-200 rounded-md focus-visible:ring-ring focus-visible:ring-1'>
                                            <Input {...field}
                                                placeholder='Enter Password'
                                                type={isHidden ? 'password' : 'text'}
                                                className='border-0 shadow-none outline-none focus-visible:none focus-visible:ring-0'
                                            />
                                            <div className='cursor-pointer mr-2'>
                                                {isHidden ? <BsEyeSlash onClick={() => setIsHidden(false)} /> : <BsEye onClick={() => setIsHidden(true)} />}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password:</FormLabel>
                                    <FormControl>
                                        <div className='flex items-center border border-gray-200 rounded-md focus-visible:ring-ring focus-visible:ring-1'>
                                            <Input {...field}
                                                placeholder='Enter Password'
                                                type={isHidden ? 'password' : 'text'}
                                                className='border-0 shadow-none outline-none focus-visible:none focus-visible:ring-0'
                                            />
                                            <div className='cursor-pointer mr-2'>
                                                {isHidden ? <BsEyeSlash onClick={() => setIsHidden(false)} /> : <BsEye onClick={() => setIsHidden(true)} />}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type='submit' className='w-full bg-gray-900 hover:bg-gray-900 cursor-pointer' disabled={loading}>
                        {loading ? 'Resetting...' : "Reset Password"}
                        <ClipLoader
                            color="#ffffff"
                            loading={loading}
                            size={20}
                            className="ml-4"
                        />
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}