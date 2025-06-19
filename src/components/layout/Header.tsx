import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, LogOut, UserCircle } from 'lucide-react';

interface HeaderProps {
  isAuthenticated?: boolean; // This would typically come from auth context/state
  username?: string;         // User's name or email
  onLogout?: () => void;     // Callback for logout action
}

const Header: React.FC<HeaderProps> = ({
  isAuthenticated = false, // Default to unauthenticated
  username = 'User',
  onLogout,
}) => {
  console.log('Header loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    // Simulate logout and redirect to login page
    // In a real app, this would involve clearing auth tokens, etc.
    console.log('User logged out');
    navigate('/'); // Redirect to login page
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-lg">AuthSecure</span>
        </Link>

        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Welcome, {username}
              </span>
              <UserCircle className="h-6 w-6 sm:hidden" />
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/" className={navLinkClasses}>
                Login
              </NavLink>
              <Button variant="default" size="sm" asChild>
                <Link to="/registration">Register</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;