export type DeviceInfo = {
  Device: {
    model_number_prefix: string;
    name: string;
    pid: number;
    features: string[];
  };
  "battery-care": "Enable" | "Disable";
  "lights-always-on": "Enable" | "Disable";
  "kbd-backlight": number;
  Fan: "Auto" | "Manual";
  Performance: "(Balanced, Auto)" | "(Silent, Auto)" | string;
  CPU: string;
};
