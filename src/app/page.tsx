"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";
import { Button } from "@heroui/react";

export default function Home() {
  const [output, setOutput] = useState("");

  async function run() {
    // @ts-ignore
    const result = await window.electronAPI.runCommand(["--info"]);
    setOutput(result);
  }

  return (
    <main className="p-10 space-y-4">
      <h1 className="text-2xl font-bold flex gap-2 items-center">
        <Terminal className="w-5 h-5" /> Razer CLI
      </h1>

      <Button onClick={run}>Get Info</Button>

      <pre className="bg-gray-800 text-white p-4 rounded">{output}</pre>
    </main>
  );
}
