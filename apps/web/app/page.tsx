"use client";

import { authClient } from "@/lib/auth-client";

export default function HomePage() {

  async function handleRegister() {
  try {
    console.log("Registering user...");
    const result =
      await authClient.signUp.email({
        name: "John Doe",
        email: "johnwqwe@gmail.com",
        password: "Password123!"
      });

    console.log("SUCCESS:", result);

  } catch (error) {

    console.error("ERROR:", error);

  }
}

  return (
    <div className="p-10">
      <button
        onClick={handleRegister}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </div>
  );
}