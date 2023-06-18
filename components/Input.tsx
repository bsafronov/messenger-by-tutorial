"use client";

import clsx from "clsx";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import Loader from "./Loader";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function Input({
  errors,
  id,
  label,
  register,
  disabled,
  required,
  type,
  isLoading,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type={type}
          required={required}
          disabled={disabled || isLoading}
          autoComplete={id}
          {...register(id, { required })}
          className={clsx(
            "form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6",
            errors[id] && "focus:ring-rose-500",
            disabled && "cursor-default opacity-50"
          )}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader className=" fill-sky-400 text-gray-100" />
          </div>
        )}
      </div>
    </div>
  );
}
