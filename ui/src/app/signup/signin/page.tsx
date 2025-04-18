"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePostAuthenticationSignin } from "@/api/authentication/authentication";
import { useCredentials } from "@/app/credentialsProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const router = useRouter();
  const { setToken } = useCredentials();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutate, status } = usePostAuthenticationSignin({
    mutation: {
      onSuccess: (data: any) => {
        setToken(data.token);
        router.push("/");
      },
      onError: (err: any) => {
        setError(err?.response?.data?.errors?.join(" ") || "Failed to create account.");
      },
    },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <Card className="p-8 max-w-md w-full mx-auto flex flex-col gap-4">
        <label className="text-sm font-medium">Email</label>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={status === "pending"}
        />
        <label className="text-sm font-medium">Password</label>
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={status === "pending"}
        />
        <label className="text-sm font-medium">Confirm Password</label>
        <Input
          placeholder="Confirm Password"
          type="password"
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
          disabled={status === "pending"}
        />
        <Button
          onClick={() => mutate({ data: { email, password, password_confirmation: passwordConfirmation } })}
          disabled={status === "pending" || !email || !password || !passwordConfirmation}
        >
          {status === "pending" ? "Creating Account..." : "Sign Up"}
        </Button>
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </Card>
    </div>
  );
}
