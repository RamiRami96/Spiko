import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

import { authService } from "@/shared/services";

import { SignUpFormData, signUpSchema } from "../schemas/sign-up.schema";
import { SignUp } from "../SignUp";

export function SignUpForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      dateOfBirth: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      await authService.signUp(data);
      router.replace("/clubs");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError("email", { message });
    }
  };

  return (
    <SignUp
      control={control}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      onNavigateSignIn={() => router.push("/sign-in")}
    />
  );
}
