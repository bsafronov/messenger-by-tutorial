"use client";

import { useState } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "./Inputs/Input";
import Button from "./Buttons/Button";
import AuthSocialButton from "./Buttons/AuthSocialButton";

type Variant = "LOGIN" | "REGISTER";

export default function AuthForm() {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setLoading] = useState(false);

  const toggleVariant = () => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    if (variant === "REGISTER") {
      /* Axios Register */
    }

    if (variant === "LOGIN") {
      /* NextAuth SignIn */
    }
  };

  const onSocialAction = (action: string) => {
    setLoading(true);
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              label="Name"
              register={register}
              errors={errors}
              id="name"
              disabled={isLoading}
            />
          )}
          <Input
            label="Email"
            register={register}
            errors={errors}
            id="email"
            disabled={isLoading}
          />
          <Input
            label="Password"
            register={register}
            errors={errors}
            id="password"
            disabled={isLoading}
          />
          <div>
            <Button
              isLoading={isLoading}
              label={variant === "LOGIN" ? "Sign in" : "Register"}
              fullWidth
              type="submit"
            />
          </div>
        </form>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <AuthSocialButton
            icon={BsGithub}
            label="GitHub"
            onClick={() => onSocialAction("github")}
          />
          <AuthSocialButton
            icon={BsGoogle}
            label="Google"
            onClick={() => onSocialAction("google")}
          />
        </div>

        <div className="mt-6 flex justify-center gap-1 text-sm text-gray-500">
          <span>
            {variant === "LOGIN" ? "New to Messenger?" : "Have an account?"}
          </span>
          <button
            className="cursor-pointer text-sky-500 hover:underline"
            onClick={toggleVariant}
          >
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
