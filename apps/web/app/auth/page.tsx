"use client";

import { authClient } from "@/lib/auth-client";

export default function AuthPage() {
  const getSession = async () => {
    const session = await authClient.getSession();

    console.log(session);
  };

  return (
    <button onClick={getSession}>
      Get Session
    </button>
  );
}