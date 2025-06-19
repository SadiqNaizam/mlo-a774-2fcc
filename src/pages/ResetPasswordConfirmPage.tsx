import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Eye, EyeOff, AlertTriangle, KeyRound } from 'lucide-react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormCard from '@/components/AuthFormCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const passwordResetSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Path of error
});

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

const ResetPasswordConfirmPage: React.FC = () => {
  console.log('ResetPasswordConfirmPage loaded');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setToken(urlToken);
      console.log('Password reset token from URL:', urlToken);
    } else {
      console.error('No token found in URL for password reset.');
      toast.error("Invalid or missing password reset link. Please request a new one.");
      // Optionally redirect or show a more prominent error
    }
  }, [searchParams]);

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordResetFormValues) => {
    setFormError(null);
    if (!token) {
      setFormError("Invalid or missing reset token. Please try the link from your email again.");
      toast.error("Invalid or missing reset token.");
      return;
    }

    console.log('Attempting to reset password with token:', token, 'and new password:', data.password);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate success/failure
    const isSuccess = Math.random() > 0.2; // 80% success rate for simulation

    if (isSuccess) {
      toast.success("Password has been reset successfully! You can now log in with your new password.");
      navigate('/'); // Navigate to LoginPage as per app_tsx_content for "/"
    } else {
      const errorMessage = "Failed to reset password. The link might be expired or invalid. Please try again.";
      setFormError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isAuthenticated={false} />
      <main className="flex-grow flex items-center justify-center p-6">
        <AuthFormCard
          title="Set New Password"
          description="Enter and confirm your new password below."
          className="w-full max-w-md"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {formError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}
              {!token && !formError && (
                 <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Missing Token</AlertTitle>
                  <AlertDescription>
                    It seems the password reset token is missing from the URL. Please ensure you are using the correct link from your email. If the issue persists, try requesting a new password reset link.
                  </AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">New Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          {...field}
                          disabled={!token || form.formState.isSubmitting}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={!token || form.formState.isSubmitting}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
                     <div className="relative">
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your new password"
                          {...field}
                          disabled={!token || form.formState.isSubmitting}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={!token || form.formState.isSubmitting}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={!token || form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Resetting..." : (
                  <>
                    <KeyRound className="mr-2 h-4 w-4" /> Reset Password
                  </>
                )}
              </Button>
            </form>
          </Form>
           <div className="mt-4 text-center text-sm">
            Remember your password?{' '}
            <Link to="/" className="underline text-blue-600 hover:text-blue-800"> {/* Path from App.tsx */}
              Login
            </Link>
          </div>
        </AuthFormCard>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPasswordConfirmPage;