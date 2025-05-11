
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <BookOpen className="h-16 w-16 text-edu-primary" />
        <h1 className="mt-6 text-4xl font-bold text-gray-900">404</h1>
        <p className="mt-2 text-xl text-gray-600">Page not found</p>
        <p className="mt-2 text-center text-gray-500">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-6 bg-edu-primary hover:bg-edu-primary/90">
          <Link to="/">
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
