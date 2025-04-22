"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { decodeJwtPayload } from "@/app/utils/jwt";
import { useGetUsersId } from "@/api/users/users";

// Define the context type
export type CredentialsContextType = {
  getToken: () => string | null;
  setToken: (token: string | null) => void;
  getRefreshToken: () => string | null;
  setRefreshToken: (token: string | null) => void;
  getRole: () => number | null;
  getBalancePoints: () => number | null;
  refetchUser: () => void;
  clear: () => void;
};

const CredentialsContext = createContext<CredentialsContextType | undefined>(undefined);

export const CredentialsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => (typeof window !== "undefined" ? localStorage.getItem("token") : null));
  const [refreshToken, setRefreshTokenState] = useState<string | null>(() => (typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null));

  // Setters that also update localStorage
  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken === null) localStorage.removeItem("token");
    else localStorage.setItem("token", newToken);
  };
  const setRefreshToken = (newToken: string | null) => {
    setRefreshTokenState(newToken);
    if (newToken === null) localStorage.removeItem("refresh_token");
    else localStorage.setItem("refresh_token", newToken);
  };

  const [role, setRole] = useState<number | null>(null);
  const [balancePoints, setBalancePoints] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!token) return;
    const payload = decodeJwtPayload(token);
    if (payload && payload.role !== undefined) {
      setRole(Number(payload.role));
    }
    // Get user id from token payload
    if (payload && payload.user_id !== undefined) {
      setUserId(Number(payload.user_id));
    }
  }, [token]);

  const { data: user, refetch: refetchUser } = useGetUsersId(userId!, {
    query: {
      enabled: !!userId,
    },
    fetch: {
      headers: { Authorization: `Bearer ${token}` },
    },
  });

  useEffect(() => {
    refetchUser();
  }, [userId, refetchUser]);

  useEffect(() => {
    if (user?.data?.balance_points !== undefined) {
      setBalancePoints(Number(user.data.balance_points));
    }
  }, [user]);

  // Getters
  const getToken = () => token;
  const getRefreshToken = () => refreshToken;
  const getRole = () => role;
  const getBalancePoints = () => balancePoints;

  const clear = () => {
    setToken(null);
    setRefreshToken(null);
    setRole(null);
    setBalancePoints(null);
    localStorage.clear();
  };

  return (
    <CredentialsContext.Provider value={{
      getToken,
      setToken,
      getRefreshToken,
      setRefreshToken,
      getRole,
      getBalancePoints,
      refetchUser,
      clear,
    }}>
      {children}
    </CredentialsContext.Provider>
  );
};

export function useCredentials() {
  const ctx = useContext(CredentialsContext);
  if (!ctx) throw new Error("useCredentials must be used within a CredentialsProvider");
  return ctx;
}
