import { ButtonHTMLAttributes, FC } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  return (
    <button
      className={twMerge(
        `px-4 py-2 rounded-md 
        bg-blue-600
        text-white transition-all
        hover:bg-blue-600/80 hover:shadow-md hover:animated-pulse
        active:bg-blue-700/80
        `,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
