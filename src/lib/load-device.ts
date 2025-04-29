import { DeviceInfo } from "@/types/gobal";
import command, { getCPUInfo } from "./electron";
function toJsonFromRustStruct(input: string): string | null {
  try {
    const match = input.match(/^[A-Z][a-zA-Z0-9_]*\s*(\{[\s\S]*\})$/);
    const cleaned = match ? match[1] : input;

    const quotedKeys = cleaned.replace(/([a-zA-Z0-9_-]+)\s*:/g, '"$1":');

    const jsonLike = quotedKeys.replace(/'/g, '"');

    const parsed = JSON.parse(jsonLike);

    return parsed;
  } catch {
    return null;
  }
}

function tryDeepParse(input: string) {
  let value = input.trim();

  const wrapperMatch = value.match(/^(Ok|Some)\(([\s\S]*)\)$/);
  if (wrapperMatch) value = wrapperMatch[2];

  const rustParsed = toJsonFromRustStruct(value);
  if (rustParsed) return rustParsed;

  while (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      value = parsed;
    } catch {
      break;
    }
  }

  return value;
}

export default async function loadDevice() {
  const result = await command(["info"]);

  const deviceInfo = result.split("\n").reduce((acc: Record<string, string>, line: string) => {
    const parts = line.trim().match(/^([^:]+):\s*(.+)$/);

    if (parts && parts.length === 3) {
      const key = parts[1].trim();
      const value = parts[2].trim();

      acc[key] = tryDeepParse(value);
    }

    return acc;
  }, {});

  const json = JSON.parse(JSON.stringify(deviceInfo, null, 2)) as DeviceInfo;

  if (json["kbd-backlight"] !== undefined) {
    json["kbd-backlight"] = Math.round((json["kbd-backlight"] / 255) * 100);
  }

  json.CPU = await getCPUInfo();

  return json;
}
