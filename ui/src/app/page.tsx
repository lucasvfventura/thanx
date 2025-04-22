"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetRewards } from "@/api/rewards/rewards";
import { Card } from "@/components/ui/card";
import { useCredentials } from "@/app/credentialsProvider";


import RedeemReward from "./RedeemReward";

export default function RewardsPage() {
const router = useRouter();
  const { getBalancePoints, getRole, refetchUser } = useCredentials();
  const balancePoints = getBalancePoints();
  const { data, isLoading, error, refetch } = useGetRewards();

  if (isLoading)
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>;
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="mb-4 text-red-500">Failed to load rewards.</div>
        </Card>
      </div>
    );

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Rewards</h1>
        {getRole() === 0 && (
          <Button onClick={() => router.push('/rewards')}>Create Reward</Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.rewards?.map((reward) => (
          <Card key={reward.id} className="p-6 flex flex-col gap-2 bg-card border border-border">
            <div className="font-bold text-lg">{reward.title}</div>
            <div className="text-muted-foreground">{reward.description}</div>
            <div className="text-sm">Value: <span className="font-mono">{reward.value_per_unit}</span></div>
            <div className="text-sm">Quantity: <span className="font-mono">{reward.quantity}</span></div>
            {balancePoints !== null && (
              <RedeemReward
                reward={reward}
                balancePoints={balancePoints}
                onRedeemed={() => {
                  refetch();
                  refetchUser();
                }}
              />
            )}
          </Card>
        ))}
      </div>
      {/* TODO: Pagination controls */}
    </div>
  );
}