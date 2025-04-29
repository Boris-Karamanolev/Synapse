"use client";

import { Navbar, NavbarContent } from "@heroui/react";
import Image from "next/image";

const Nav: React.FC = () => {
  return (
    <Navbar
      isBlurred={false}
      classNames={{
        base: "bg-black text-white border-b border-green-500",
      }}
    >
      <NavbarContent>
        <h1 className="text-2xl font-bold flex gap-2 items-center">
          <Image src="/icon.ico" alt="Razer" width={28} height={28} /> <span>Razer Shnapps</span>
        </h1>
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
