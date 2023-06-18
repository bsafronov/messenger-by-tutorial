"use client";

import { useEffect, useState } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "@/components/buttons/AuthSocialButton";
import axios from "axios";
import { toast } from "react-hot-toast";
import { LiteralUnion, signIn, useSession } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import { useRouter } from "next/navigation";
import Input from "@/components/inputs/Input";
import Button from "@/components/buttons/Button";

type Variant = "LOGIN" | "REGISTER";

export default function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
  }, [session.status, router]);

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
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("Successfully registered!");
          signIn("credentials", data);
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok && !callback.error) {
            toast.success("Logged in!");
            router.push("/users");
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const onSocialAction = (action: LiteralUnion<BuiltInProviderType>) => {
    setLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok && !callback.error) {
          toast.success("Logged in!");
          router.push("/users");
        }
      })
      .finally(() => setLoading(false));
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
              type="text"
              id="name"
              disabled={isLoading}
            />
          )}
          <Input
            label="Email"
            register={register}
            errors={errors}
            type="email"
            id="email"
            disabled={isLoading}
          />
          <Input
            label="Password"
            register={register}
            errors={errors}
            type="password"
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
