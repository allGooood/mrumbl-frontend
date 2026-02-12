import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({ 
  label, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div>
      {label && 
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      }
      <input
        ref={ref}
        className={
          `w-full rounded-xl border border-gray-300 px-4 py-3 text-sm ` +
          `focus:outline-none focus:ring-2 focus:ring-black focus:border-black ` +
          className
        }
        {...props}
      />
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;

