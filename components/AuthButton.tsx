"use client";

import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  label?: string;
  onClick?: () => void;
}

export default function AuthSocialButton({
  icon: Icon,
  onClick,
  label,
}: AuthSocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 transition-colors hover:bg-gray-50 focus:outline-offset-0"
    >
      <Icon />
      {label}
    </button>
  );
}
