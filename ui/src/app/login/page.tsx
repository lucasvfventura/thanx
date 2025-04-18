"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePostAuthenticationLogin } from "@/api/authentication/authentication";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCredentials } from "@/app/credentialsProvider";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, isError } = usePostAuthenticationLogin();
  const { setToken, setRefreshToken } = useCredentials();

  const login = () => {
    mutate({ data: { email, password } }, {
      onSuccess: (res) => {
        if (res.status === 200) {
          setToken(res.data.token);
          setRefreshToken(res.data.refresh_token);

          router.push("/");
        }
      },
    });
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="mb-4 text-red-500">Failed to log in.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <form
        className="bg-card p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault();
          login();
        }}
      >
        <h1 className="text-2xl font-bold mb-2 text-center">Sign In</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
