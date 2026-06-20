import { Control, Controller, FieldErrors } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import { GradientButton, Input, ScreenLayout, SocialButtons } from "@/shared/components";

import { SignInFormData } from "./schemas/sign-in.schema";

export type SignInProps = {
  control: Control<SignInFormData>;
  errors: FieldErrors<SignInFormData>;
  isSubmitting: boolean;
  onSubmit: () => void;
  onNavigateSignUp: () => void;
  onForgotPassword: () => void;
};

export function SignIn({
  control,
  errors,
  isSubmitting,
  onSubmit,
  onNavigateSignUp,
  onForgotPassword,
}: SignInProps) {
  return (
    <ScreenLayout
      topContent={
        <View className="items-center gap-1">
          <Text className="text-white text-3xl font-bold">Welcome Back</Text>
          <Text className="text-white/70 text-sm text-center">
            Ready to continue your journey?{"\n"}
            <Text className="text-white font-semibold">Your path is right here.</Text>
          </Text>
        </View>
      }
    >
      <View className="gap-6">
        <View className="gap-4">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                isPassword
                secureTextEntry
                error={errors.password?.message}
              />
            )}
          />

          <Pressable onPress={onForgotPassword} className="self-end">
            <Text className="text-primary text-sm font-medium">Forgot password?</Text>
          </Pressable>
        </View>

        <GradientButton label="Log In" onPress={onSubmit} loading={isSubmitting} />

        <SocialButtons label="Sign in with" />

        <View className="flex-row justify-center gap-1">
          <Text className="text-gray-500 text-sm">Don't have an account?</Text>
          <Pressable onPress={onNavigateSignUp}>
            <Text className="text-primary text-sm font-semibold">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </ScreenLayout>
  );
}
