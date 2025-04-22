"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePostRedemptions } from "@/api/redemptions/redemptions";
import type { PostRedemptionsBody } from "@/api/model/postRedemptionsBody";
import { useCredentials } from "@/app/credentialsProvider";
import { GetRewards200RewardsItem } from "@/api/model";

interface RedeemRewardProps {
  reward: GetRewards200RewardsItem;
  balancePoints: number;
  onRedeemed?: () => void;
}

export default function RedeemReward({ reward, balancePoints, onRedeemed }: RedeemRewardProps) {
  const { getToken } = useCredentials();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { mutate, status } = usePostRedemptions({
    fetch: {
      headers: { Authorization: `Bearer ${getToken()}` },
    },
    mutation: {
      onSuccess: () => {
        setSuccess("Redemption successful!");
        setError(null);
        // Assuming the backend returns the new balance, otherwise recalculate locally
        if (onRedeemed) {
          onRedeemed();
        }
      },
      onError: () => {
        setError("Failed to redeem reward.");
        setSuccess(null);
      },
    },
  });

  const maxAllowed = Math.min(
    reward.quantity,
    Math.floor(balancePoints / reward.value_per_unit)
  );

  const handleRedeem = () => {
    setError(null);
    setSuccess(null);
    if (quantity < 1) {
      setError("Quantity must be at least 1.");
      return;
    }
    if (quantity > maxAllowed) {
      setError(`Maximum allowed quantity is ${maxAllowed}.`);
      return;
    }
    const body: PostRedemptionsBody = {
      reward_id: reward.id,
      quantity,
    };
    mutate({ data: body });
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={1}
          max={maxAllowed}
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          className="w-20 text-center"
          disabled={status === "pending"}
        />
        <Button
          onClick={handleRedeem}
          disabled={status === "pending" || maxAllowed < 1}
        >
          Redeem
        </Button>
      </div>
      {error && <div className="text-xs text-red-500">{error}</div>}
      {success && <div className="text-xs text-green-600">{success}</div>}
      {maxAllowed < 1 && (
        <div className="text-xs text-muted-foreground">Not enough balance.</div>
      )}
    </div>
  );
}
