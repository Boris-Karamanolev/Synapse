"use client";

import command from "@/lib/electron";
import { Button } from "@heroui/react";

const Modes: React.FC = () => {
  const modes = [
    {
      name: "Custom",
      description: "",
    },
    {
      name: "Balanced",
      description: "",
    },
    {
      name: "Silent",
      description: "",
    },
  ];

  async function handleModeChange(mode: string) {
    await command(["perf", "mode", mode.toLowerCase()]);
    window.location.reload();
  }

  return (
    <div className="flex flex-wrap gap-6">
      {modes.map((mode, index) => (
        <Button
          size="lg"
          color="success"
          radius="none"
          key={index}
          className="w-32 h-32 aspect-square"
          onPress={() => handleModeChange(mode.name)}
        >
          {mode.name}
        </Button>
      ))}
    </div>
  );
};

export default Modes;
