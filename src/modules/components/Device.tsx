import Image from "next/image";

type DeviceProps = {
  name: string | undefined;
};

const Device: React.FC<DeviceProps> = ({ name }) => {
  if (!name) {
    return <div className="w-full flex p-4 border-b">Loading...</div>;
  }

  return (
    <section className="w-full flex p-4 border-b flex-col gap-6 items-center">
      <Image
        src="/devices/blade_14_merc.png"
        alt="Blade 14 Mercury"
        width={320}
        height={273}
        className="rounded-lg object-cover"
      />

      <h1>{name}</h1>
    </section>
  );
};

export default Device;
