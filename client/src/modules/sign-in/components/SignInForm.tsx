import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { router } from "expo-router";
import { useForm } from "react-hook-form";

import { useSignInMutation } from "@/shared/queries/auth.queries";

import { SignInFormData, signInSchema } from "../schemas/sign-in.schema";
import { SignIn } from "../SignIn";

export function SignInForm() {
  const signInMutation = useSignInMutation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: standardSchemaResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await signInMutation.mutateAsync(data);
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
