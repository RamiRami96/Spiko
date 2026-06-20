import { Control, Controller, FieldErrors } from "react-hook-form";
import { Pressable, Text, View } from "react-native";

import { GradientButton, Input, ScreenLayout } from "@/shared/components";

import { SignUpFormData } from "./schemas/sign-up.schema";

export type SignUpProps = {
  control: Control<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  isSubmitting: boolean;
  onSubmit: () => void;
  onNavigateSignIn: () => void;
};

export function SignUp({
  control,
  errors,
  isSubmitting,
  onSubmit,
  onNavigateSignIn,
}: SignUpProps) {
  return (
    <ScreenLayout
      topContent={
        <View className="items-center gap-1">
          <Text className="text-white text-3xl font-bold">Create Your Account</Text>
          <Text className="text-white/70 text-sm text-center">
            We're here to help you reach the peaks of learning.{" "}
            <Text className="text-white font-bold">Are you ready?</Text>
          </Text>
        </View>
      }
    >
      <View className="gap-6">
        <View className="gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter full name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoCapitalize="words"
                error={errors.name?.message}
              />
            )}
          />

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
                placeholder="Enter password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                isPassword
                secureTextEntry
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Date of birth (YYYY-MM-DD)"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors.dateOfBirth?.message}
              />
            )}
          />
        </View>

        <GradientButton label="Get Started" onPress={onSubmit} loading={isSubmitting} />

        <View className="flex-row justify-center gap-1">
          <Text className="text-gray-500 text-sm">Already have an account?</Text>
          <Pressable onPress={onNavigateSignIn}>
            <Text className="text-primary text-sm font-semibold">Log In</Text>
          </Pressable>
        </View>
      </View>
    </ScreenLayout>
  );
}
