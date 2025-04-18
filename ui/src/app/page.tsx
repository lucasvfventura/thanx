"use client";

import { useGetRewards } from "@/api/rewards/rewards";
import { Card } from "@/components/ui/card";
import { useCredentials } from "@/app/credentialsProvider";
import RedeemReward from "./RedeemReward";

export default function RewardsPage() {
  const { getBalancePoints, refetchUser } = useCredentials();
  const balancePoints = getBalancePoints();
  const { data, isLoading, error } = useGetRewards();

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
      <h1 className="text-3xl font-bold mb-6">Rewards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.rewards?.map((reward: any) => (
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