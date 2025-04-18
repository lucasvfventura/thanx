"use client";

import { useRouter } from "next/navigation";
import { useGetRedemptions} from "@/api/redemptions/redemptions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCredentials } from "@/app/credentialsProvider";

export default function RedemptionsPage() {
  const router = useRouter();
  const { getToken } = useCredentials();
  const token = getToken();

  const { data, isLoading, error } = useGetRedemptions({
    fetch: {
      headers: { Authorization: `Bearer ${token}` },
    },
  });

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="mb-4">You must be logged in to view redemptions.</div>
          <Button onClick={() => router.push("/login")}>Go to Login</Button>
        </Card>
      </div>
    );
  }

  if (isLoading)
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>;
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="mb-4 text-red-500">Failed to load redemptions.</div>
        </Card>
      </div>
    );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Redemptions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.redemptions?.map((redemption: any) => (
          <Card key={redemption.id} className="p-6 flex flex-col gap-2 bg-card border border-border">
            <div className="font-bold text-lg">{redemption.reward?.title || 'Reward'}</div>
            <div className="text-sm">Date: <span className="font-mono">{redemption.created_at ? new Date(redemption.created_at).toLocaleString() : ''}</span></div>
            <div className="text-sm">Quantity: <span className="font-mono">{redemption.quantity}</span></div>
          </Card>
        ))}
      </div>
      {/* TODO: Pagination controls */}
    </div>
  );
}
