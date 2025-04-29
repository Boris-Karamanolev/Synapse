"use client";

import { useEffect, useState } from "react";
import Device from "@/modules/components/Device";
import { DeviceInfo } from "@/types/gobal";
import loadDevice from "@/lib/load-device";
import { Spinner } from "@heroui/react";
import Modes from "@/modules/components/Modes";
import Brightness from "@/modules/components/Brightness";

export default function Home() {
  const [output, setOutput] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    async function fetchDeviceInfo() {
      try {
        const deviceInfo = await loadDevice();
        setOutput(deviceInfo);
      } catch (error) {
        console.error("Error loading device info:", error);
      }
    }

    fetchDeviceInfo();
  }, []);

  if (!output) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <Spinner color="success" />
      </main>
    );
  }

  return (
    <main className="space-y-4">
      <Device name={output?.Device.name} />

      <section className="page-section">
        <div>
          <h2>Performance Modes</h2>

          <p className="text-sm text-gray-300">Current Mode: {output.Performance}</p>
        </div>

        <Modes />
      </section>

      <section className="page-section">
        <h2>Keyboard Brightness</h2>

        <Brightness defaultValue={output["kbd-backlight"]} />
      </section>

      <pre className="border-1 text-gray-200 p-4 overflow-auto">
        {JSON.stringify(output, null, 2)}
      </pre>
    </main>
  );
}
