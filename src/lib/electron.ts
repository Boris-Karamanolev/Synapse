export default async function command(args: string[]) {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called in the browser.");
  }

  try {
    // @ts-expect-error type
    const result = await window.electronAPI.runCommand(args);

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getCPUInfo() {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called in the browser.");
  }

  try {
    // @ts-expect-error type
    const result = await window.electronAPI.getCPUInfo();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
