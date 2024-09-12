import { Link } from "@nextui-org/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";
import { ButtomNav } from "@/components/buttom_nav";

export default function DefaultLayout({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  const [activeTabs, setActiveTabs] = useState(name);
  const { theme, setTheme } = useTheme();
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    setActiveTabs(name);
    if (!isInit) {
      setTheme("dark");
    } else {
      setIsInit(true);
    }
  });

  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar name={name} />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://tonspack.com/"
          title="Tonspack wallet"
        >
          <span className="text-default-600">Powered by</span>
          <p className="text-primary">Tonpack team</p>
        </Link>
      </footer>
      {
        <ButtomNav name={activeTabs} />
        // activeTabs?<ButtomNav name={activeTabs} />:null
      }
    </div>
  );
}
