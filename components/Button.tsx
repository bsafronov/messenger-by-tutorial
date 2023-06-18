"use client";

import clsx from "clsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Loader from "./Loader";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  fullWidth?: boolean;
  label?: string;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

export default function Button({
  danger,
  disabled,
  fullWidth,
  label,
  onClick,
  secondary,
  type,
  isLoading,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
      className={clsx(
        "relative flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        {
          "pr-9": isLoading,
          "text-white": !secondary,
          "text-gray-900": secondary,
          "w-full": fullWidth,
          "bg-rose-500 focus-visible:outline-rose-600 enabled:hover:bg-rose-600":
            danger,
          "bg-sky-500 focus-visible:outline-sky-600 enabled:hover:bg-sky-600":
            !secondary && !danger,
          "cursor-default opacity-50": disabled || isLoading,
        }
      )}
    >
      <span className="">{label}</span>
      {isLoading && (
        <Loader className="absolute right-3 h-4 w-4 fill-white text-sky-300" />
      )}
    </button>
  );
}
