import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center">
      <AlertCircle className="text-red-500 w-6 h-6 mr-3" />
      <p className="text-red-700">{message}</p>
    </div>
  );
}