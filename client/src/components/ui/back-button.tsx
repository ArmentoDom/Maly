import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  fallbackPath?: string;
  forceUsePathFallback?: boolean; // New prop to force using the fallback path
}

export function BackButton({ 
  className = "", 
  variant = "ghost", 
  fallbackPath = "/discover",
  forceUsePathFallback = false
}: BackButtonProps) {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    // If forceUsePathFallback is true, always use the fallback path
    if (forceUsePathFallback) {
      setLocation(fallbackPath);
      return;
    }
    
    // Check if we're on a profile page where back functionality may be problematic
    const isProfilePage = window.location.pathname.startsWith('/profile/');
    
    // For profile pages or if history is empty, use the fallback path
    if (isProfilePage || window.history.length <= 1) {
      setLocation(fallbackPath);
    } else {
      // Otherwise try to use browser history
      window.history.back();
    }
  };

  return (
    <Button
      variant={variant}
      size="icon"
      className={`text-white/60 hover:text-white ${className}`}
      onClick={handleBack}
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
}