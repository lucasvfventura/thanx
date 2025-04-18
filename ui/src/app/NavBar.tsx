"use client";
import { useCredentials } from "./credentialsProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const { getRole, getBalancePoints, clear } = useCredentials();
  const role = getRole();
  const balancePoints = getBalancePoints();
  const router = useRouter();
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-border mb-6">
      <div className="flex gap-4 items-center">
        <a href="/" className="font-bold text-lg">Thanx</a>
        {role !== null && <a href="/redemptions" className="hover:underline">Redemptions</a>}
        {/* Show only for admin */}
        {role === 0 && <>
          <a href="/rewards" className="hover:underline">Rewards</a>
          <a href="/users" className="hover:underline">Users</a>
        </>}

      </div>
      <div className="flex gap-4 items-center">
        {role !== null && balancePoints !== null && (
          <span className="font-mono text-sm text-muted-foreground">Balance: {balancePoints}</span>
        )}
        {/* Show login/logout based on auth state */}
        {role === null ? (
          <>
            <a href="/login" className="hover:underline">Login</a>
            <a href="/signup" className="hover:underline">Sign Up</a>
          </>
        ) : (
          <Button onClick={() => {clear(); router.push("/login")}}>Logout</Button>
        )}
      </div>
    </nav>
  );
}
