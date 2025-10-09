import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casa Botanical Dashboard",
  description: "Buy faux leather luxury home decor and dining products online in India. Casa Botanical presents decorative accessories & artefacts for your home and office.",
};

export default function SignIn() {
  return <SignInForm />;
}
