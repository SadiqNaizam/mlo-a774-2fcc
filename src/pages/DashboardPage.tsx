import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');

  // Placeholder user data
  const username = "Demo User";
  const userInitials = username
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header isAuthenticated={true} username={username} />

      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <Card className="w-full max-w-xl shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                {/* Using a placeholder image, replace with actual user avatar if available */}
                <AvatarImage src="https://i.pravatar.cc/150?u=demouser" alt={`@${username.toLowerCase().replace(' ', '')}`} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-semibold">Welcome back, {username}!</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  Successfully Authenticated
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-lg">
              This is your main dashboard. You have successfully logged in to AuthSecure.
            </p>
            <p>
              From here, you would typically access various features and sections of the application.
              For now, this is a placeholder page demonstrating successful authentication.
            </p>
            <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link to="/dashboard">Explore Features (Placeholder)</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/settings">Account Settings (Placeholder)</Link>
              </Button>
              {/* The Header component already provides a Logout button */}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;