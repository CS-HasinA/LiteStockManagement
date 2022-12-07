import React from "react";

interface SelectProps {
  id: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  children: React.ReactNode;
}

export default function Select({
  id,
  className,
  onChange,
  onBlur,
  error,
  children,
}: SelectProps) {
  const inputStyles = error
    ? `shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`
    : `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`;

  return (
    <div className="text-left">
      <select
        id={id}
        onChange={onChange}
        className={inputStyles}
        onBlur={onBlur}
      >
        <option value="">Select an option</option>
        {children}
      </select>
      {error && <span className="text-fail italic ">{error}</span>}
    </div>
  );
}
