"use client";

import Login from "@/components/Login/Login";
import Signup from "@/components/Signup/Signup";
import { SegmentedControl } from "@mantine/core";
import { useState } from "react";

export default function Home() {
  const [credentialsTab, setCredentialsValue] = useState("login");

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="border rounded shadow p-4 w-1/4">
        <SegmentedControl
          value={credentialsTab}
          onChange={setCredentialsValue}
          fullWidth
          size="md"
          data={[
            { label: "Login", value: "login" },
            { label: "Sign Up", value: "signUp" },
          ]}
        />
        {credentialsTab == "login" ? <Login /> : <Signup />}
      </div>
    </main>
  );
}
