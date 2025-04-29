"use client";

import command from "@/lib/electron";
import { Slider } from "@heroui/react";
import { SunDim, SunMedium } from "lucide-react";

type BrightnessProps = {
  defaultValue?: number;
};

const Brightness: React.FC<BrightnessProps> = ({ defaultValue }) => {
  async function handleBrightnessChange(value: number) {
    const mappedValue = Math.round((value / 100) * 255);
    await command(["kbd-backlight", mappedValue.toString()]);
  }

  return (
    <div>
      <Slider
        className="max-w-md"
        defaultValue={defaultValue}
        maxValue={100}
        aria-label="Keyboard Brightness"
        minValue={0}
        step={1}
        startContent={<SunDim />}
        endContent={<SunMedium />}
        showTooltip
        onChangeEnd={value => handleBrightnessChange(value as number)}
      />
    </div>
  );
};

export default Brightness;
