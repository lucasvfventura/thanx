"use client";

import { useRouter } from "next/navigation";
import { useGetUsers } from "@/api/users/users";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCredentials } from "@/app/credentialsProvider";

export default function UsersPage() {
  const router = useRouter();

  const { getToken, getRole } = useCredentials();
  const token = getToken();
  const { data, isLoading, error } = useGetUsers({
    fetch: {
      headers: { Authorization: `Bearer ${token}` },
    },
  });

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="mb-4">You must be logged in as admin to view users.</div>
          <button onClick={() => router.push("/login")}>Go to Login</button>
        </Card>
      </div>
    );
  }

  if (getRole() !== 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="mb-4">You are not authorized to view users.</div>
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
          <div className="mb-4 text-red-500">Failed to load users.</div>
        </Card>
      </div>
    );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                <a href={`/users/${user.id}`} className="text-blue-600 underline hover:text-blue-800">
                  {user.email}
                </a>
              </TableCell>
              <TableCell>{user.role === 0 ? "Admin" : "Client"}</TableCell>
              <TableCell>{user.balance_points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
