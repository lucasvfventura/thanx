"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCredentials } from "@/app/credentialsProvider";
import { useGetUsersId, usePutUsersId } from "@/api/users/users";

export default function UserDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = React.use(paramsPromise);

  const { getRole, getToken, refetchUser} = useCredentials();
  const role = getRole();
  const { data, isLoading, isError} = useGetUsersId(Number(params.id), {
    fetch: {
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  });
  const { mutate } = usePutUsersId({
    fetch: {
      headers: { Authorization: `Bearer ${getToken()}` },
    },
  });
  const [balance, setBalance] = useState<number>(0);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setBalance(data.data.balance_points || 0);
    }
  }, [data]);

  const updateUserBalance = async () => {
    await mutate({ id: Number(params.id), data: { balance_points: balance } }, {
      onSuccess: () => {
        refetchUser();
      },
      onError: () => {
        setSuccess(null);
      },
    });
  };

  if (role !== 0) {
    return <div className="p-8 text-center text-red-500">Forbidden: Admins only.</div>;
  }

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (isError) return <div className="p-8 text-center text-red-500">{isError}</div>;

  const handleUpdate = async () => {
    setUpdating(true);
    setSuccess(null);
    try {
      await updateUserBalance();
      setSuccess("Balance updated successfully!");
    } catch {
      setSuccess(null);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <Card className="p-8 flex flex-col gap-4">
        <h2 className="text-xl font-bold mb-2">User Details</h2>
        <div><b>Email:</b> {data?.data.email}</div>
        <div><b>Role:</b> {data?.data.role === 0 ? "Admin" : "Client"}</div>
        <div className="flex items-center gap-2">
          <b>Balance Points:</b>
          <Input
            type="number"
            value={balance}
            min={0}
            onChange={e => setBalance(Number(e.target.value))}
            className="w-24"
            disabled={updating}
          />
          <Button onClick={handleUpdate} disabled={updating}>Update</Button>
        </div>
        {success && <div className="text-green-600 text-xs">{success}</div>}
        {isError && <div className="text-red-500 text-xs">{isError}</div>}
      </Card>
    </div>
  );
}
