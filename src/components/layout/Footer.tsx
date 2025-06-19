import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <div className="mb-4 md:mb-0">
          <p>&copy; {currentYear} AuthSecure. All rights reserved.</p>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link to="/contact" className="hover:text-primary transition-colors">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;