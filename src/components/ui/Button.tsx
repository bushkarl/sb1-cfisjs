import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
  icon?: React.ReactNode;
}

const variants = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-green-500 hover:bg-green-600 text-white',
  success: 'bg-green-500 hover:bg-green-600 text-white',
};

export function Button({ 
  children, 
  variant = 'primary',
  icon,
  className = '',
  ...props 
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        px-6 py-2 rounded-md
        transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
}