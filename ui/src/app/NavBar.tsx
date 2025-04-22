"use client";
import { useCredentials } from "./credentialsProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavBar() {
  const { getRole, getBalancePoints, clear } = useCredentials();
  const role = getRole();
  const balancePoints = getBalancePoints();
  const router = useRouter();
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-border mb-6">
      <div className="flex gap-4 items-center">
        <Link href="/" className="font-bold text-lg">Thanx</Link>
        {role !== null && <Link href="/redemptions" className="hover:underline">Redemptions</Link>}
        {/* Show only for admin */}
        {role === 0 && <>
          <Link href="/users" className="hover:underline">Users</Link>
        </>}

      </div>
      <div className="flex gap-4 items-center">
        {role !== null && balancePoints !== null && (
          <span className="font-mono text-sm text-muted-foreground">Balance: {balancePoints}</span>
        )}
        {/* Show login/logout based on auth state */}
        {role === null ? (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/signup" className="hover:underline">Sign Up</Link>
          </>
        ) : (
          <Button onClick={() => {clear(); router.push("/login")}}>Logout</Button>
        )}
      </div>
    </nav>
  );
}
