"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

import { CredentialsProvider } from "./credentialsProvider";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
      <QueryClientProvider client={queryClient}>
        <CredentialsProvider>{children}</CredentialsProvider>
      </QueryClientProvider>
  );
}
