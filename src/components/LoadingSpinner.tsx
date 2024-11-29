import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      <span className="ml-2 text-gray-600">Loading words...</span>
    </div>
  );
}