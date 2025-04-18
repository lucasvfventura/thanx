"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCredentials } from "@/app/credentialsProvider";
import { usePostRewards } from "@/api/rewards/rewards";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RewardsAdminPage() {
  const { getRole, getToken } = useCredentials();
  const router = useRouter();
  const role = getRole();
  const token = getToken();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [valuePerUnit, setValuePerUnit] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { mutate, status } = usePostRewards({
    fetch: {
      headers: { Authorization: `Bearer ${token}` },
    },
    mutation: {
      onSuccess: () => {
        setSuccess("Reward created successfully!");
        setError(null);
        setTitle("");
        setDescription("");
        setValuePerUnit(0);
        setQuantity(0);
      },
      onError: (err: any) => {
        setError("Failed to create reward.");
        setSuccess(null);
      },
    },
  });

  if (role !== 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="mb-4 text-red-500">You must be an admin to access this page.</div>
          <Button onClick={() => router.push("/")}>Go Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Reward</h1>
      <Card className="p-8 max-w-md w-full mx-auto flex flex-col gap-4">
        <label className="text-sm font-medium">Title</label>
        <Input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={status === "pending"}
        />
        <label className="text-sm font-medium">Description</label>
        <Input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          disabled={status === "pending"}
        />
        <label className="text-sm font-medium">Value Per Unit</label>
        <Input
          placeholder="Value Per Unit"
          type="number"
          value={valuePerUnit}
          onChange={e => setValuePerUnit(Number(e.target.value))}
          disabled={status === "pending"}
        />
        <label className="text-sm font-medium">Quantity</label>
        <Input
          placeholder="Quantity"
          type="number"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
          disabled={status === "pending"}
        />
        <Button
          onClick={() => mutate({ data: { title, description, value_per_unit: valuePerUnit, quantity } })}
          disabled={status === "pending" || !title || !valuePerUnit || !quantity}
        >
          {status === "pending" ? "Creating..." : "Create Reward"}
        </Button>
        {success && <div className="text-green-600 text-sm">{success}</div>}
        {error && <div className="text-red-500 text-sm">{error}</div>}
      </Card>
    </div>
  );
}
