"use client";

import { useEffect, useState } from "react";
import { DeviceInfo } from "@/types/gobal";
import loadDevice from "@/lib/load-device";
import { Spinner } from "@heroui/react";
import Modes from "@/modules/components/Modes";
import Brightness from "@/modules/components/Brightness";
import { CircleGauge, Cpu, Fan } from "lucide-react";

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
      <section className="page-section">
        <div className="w-full flex justify-between gap-4">
          <p className="flex gap-2 items-center text-sm font-bold">
            <CircleGauge size={14} />
            <span>Mode: {output.Performance.replace(/[_()]/g, " ").split(",")[0]}</span>
          </p>

          <div>
            <p>
              <Cpu size={14} />
              <span>{output.CPU}</span>
            </p>
            <p className="flex gap-2 items-center text-sm">
              <Fan size={14} />
              <span className="text-sm font-bold">
                {output.Performance.replace(/[_()]/g, " ").split(",")[1]}
              </span>
            </p>
          </div>
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
