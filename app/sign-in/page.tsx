import type { Metadata } from "next";
import { SignIn } from "@/components/sign-in";

export const metadata: Metadata = {
  title: "Sign in | DriverXmobile",
  description: "Sign in to your DriverXmobile account.",
};

export default function SignInPage() {
  return <SignIn />;
}
