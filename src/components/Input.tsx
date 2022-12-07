import React from "react";

interface InputProps {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type: string;
  id?: string;
  placeholder?: string;
  error?: string;
  defaultValue?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value,
      onChange,
      onBlur,
      onClick,
      onKeyDown,
      type,
      id,
      placeholder,
      error,
      defaultValue,
    },
    ref
  ) => {
    const inputStyles = error
      ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline-none focus:ring focus:ring-blue-300 h-11"
      : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:outline-none focus:ring focus:ring-blue-300 h-11";

    return (
      <div className="text-left">
        <input
          ref={ref}
          placeholder={placeholder}
          id={id}
          type={type}
          className={inputStyles}
          value={value}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onBlur={onBlur}
          onClick={onClick}
          defaultValue={defaultValue}
        />
        {error && <span className="text-fail italic ">{error}</span>}
      </div>
    );
  }
);

export default Input;
