import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import Header from '@/components/layout/Header'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component
import AuthFormCard from '@/components/AuthFormCard'; // Custom component

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// Alert might be used for general form errors, but sonner/toast is primary for feedback here
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  console.log('ForgotPasswordPage loaded');
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    // Simulate API call
    console.log('Password reset requested for:', data.email);
    
    // Show success notification
    toast.success("If an account with that email exists, a password reset link has been sent.", {
      description: "Please check your inbox (and spam folder).",
    });

    // Optionally, reset form or redirect
    form.reset();
    // navigate('/'); // Or keep user on page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header isAuthenticated={false} />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthFormCard
          title="Forgot Your Password?"
          description="No problem. Enter your email address below and we'll send you a link to reset your password."
          className="w-full max-w-md"
          footerContent={
            <>
              <Button type="submit" form="forgot-password-form" className="w-full">
                Send Reset Link
              </Button>
              <Button variant="link" asChild className="w-full sm:w-auto mt-2 sm:mt-0">
                <Link to="/">Back to Login</Link> {/* Path from App.tsx */}
              </Button>
            </>
          }
        >
          <Form {...form}>
            <form id="forgot-password-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 
                An Alert component could be placed here for general form errors 
                if form.formState.errors.root were used, e.g.:
                {form.formState.errors.root && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
                  </Alert>
                )}
              */}
            </form>
          </Form>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;