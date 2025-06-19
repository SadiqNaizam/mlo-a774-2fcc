import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ShieldCheck, AlertCircle } from 'lucide-react'; // For Alert icon

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormCard from '@/components/AuthFormCard';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Used directly, but FormField will use it too
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from "@/components/ui/use-toast"; // For sonner/toast notifications


const registrationFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must be 50 characters or less." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." }),
  confirmPassword: z.string().min(8, { message: "Please confirm your password." }),
  agreeToTerms: z.boolean().refine(value => value === true, {
    message: "You must agree to the terms and conditions to register.",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Set error on confirmPassword field
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const RegistrationPage: React.FC = () => {
  console.log('RegistrationPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    setFormError(null);
    console.log("Registration form submitted:", values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Example success/error handling
    const isSuccess = Math.random() > 0.3; // Simulate success/failure

    if (isSuccess) {
      toast({
        title: "Registration Successful!",
        description: "You have successfully created an account. Please login.",
      });
      // Redirect to login page upon successful registration.
      // Login page is at path "/" as per App.tsx
      navigate('/');
    } else {
      const errorMessage = "Registration failed. An account with this email may already exist or server error.";
      setFormError(errorMessage);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header isAuthenticated={false} />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center">
        <AuthFormCard
          title="Create Your Account"
          description="Fill in the details below to join AuthSecure."
          className="w-full max-w-lg"
          footerContent={
            <div className="text-center text-sm w-full">
              <span>Already have an account? </span>
              <Link to="/" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                Login here
              </Link>
            </div>
          }
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {formError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Full Name</FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="John Doe" {...field} />
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
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" placeholder="name@example.com" {...field} />
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
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input id="password" type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters and include uppercase, lowercase, number, and special character.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                    <FormControl>
                      <Input id="confirmPassword" type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Checkbox
                        id="agreeToTerms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="agreeToTerms" className="font-normal">
                        I agree to the{" "}
                        <Link to="/terms" className="text-blue-600 hover:underline dark:text-blue-400">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
                          Privacy Policy
                        </Link>
                        .
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;