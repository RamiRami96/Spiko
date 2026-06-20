import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

import { authService } from "@/shared/services";

import { SignInFormData, signInSchema } from "../schemas/sign-in.schema";
import { SignIn } from "../SignIn";

export function SignInForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await authService.signIn(data.email, data.password);
      router.replace("/clubs");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError("email", { message });
    }
  };

  return (
    <SignIn
      control={control}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
      onNavigateSignUp={() => router.push("/sign-up")}
      onForgotPassword={() => {}}
    />
  );
}
