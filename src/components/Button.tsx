export enum ButtonVariant {
  Primary = 1,
  Secondary = 2,
  Icon = 3,
  Small = 4,
  Sticky = 5,
  SecondaryAndSmall = 6,
}

interface ButtonProps {
  variant: ButtonVariant;
  type: "button" | "submit" | "reset";
  onClick?: (event: any) => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: any;
  id?: string;
}

export default function Button({
  children,
  variant,
  type,
  className,
  disabled,
  style,
  id,
  onClick,
}: ButtonProps) {
  let buttonStyles = "";
  switch (variant) {
    case ButtonVariant.Primary: {
      buttonStyles = `w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`;
      break;
    }
    case ButtonVariant.Secondary: {
      buttonStyles = `w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow ${className}`;

      break;
    }
    case ButtonVariant.Icon: {
      buttonStyles = `text-gray-400 ${className}`;
      break;
    }
    case ButtonVariant.Small: {
      buttonStyles = `bg-blue-400 text-white active:bg-pink-600 font-bold uppercase text-extra-sm px-3 py-1 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${className}`;
      break;
    }
    // case ButtonVariant.SecondaryAndSmall: {
    //   buttonStyles = `w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold px-3 py-1 rounded shadow ${className}`;
    //   break;
    // }
    case ButtonVariant.SecondaryAndSmall: {
      buttonStyles = `w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold px-3 py-1 rounded shadow ${className}`;
      break;
    }
    default: {
      throw new Error(`Button variant not supported : ${variant}`);
    }
  }

  return (
    <button
      className={buttonStyles}
      style={{ ...style }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      id={id}
    >
      {children}
    </button>
  );
}
