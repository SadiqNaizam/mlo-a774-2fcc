import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthFormCardProps {
  title: string;
  description?: string;
  children: React.ReactNode; // For form elements like Input, Label
  footerContent?: React.ReactNode; // For submission buttons, links
  className?: string; // Allow additional custom styling
}

const AuthFormCard: React.FC<AuthFormCardProps> = ({
  title,
  description,
  children,
  footerContent,
  className,
}) => {
  console.log('AuthFormCard loaded, title:', title);

  return (
    <Card className={`w-full max-w-md mx-auto ${className || ''}`}>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
      {footerContent && (
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-2">
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthFormCard;