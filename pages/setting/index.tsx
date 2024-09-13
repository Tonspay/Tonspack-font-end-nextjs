import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Image } from "@nextui-org/image";
import { IoIosArrowForward } from "react-icons/io";

import { Loading } from "@/components/loading";
import DefaultLayout from "@/layouts/default";

type walletCard = {
  title: string;
  address: string;
  scan: string;
  img: string;
  name: string;
  bal: string;
};

export default function SettingPage() {
  const [isMainPageLoading, setIsMainPageLoading] = useState(true);

  const [isNav, setIsNav] = useState("");

  useEffect(() => {
    const onload = async () => {
      setIsMainPageLoading(false);
      setIsNav("setting");
    };

    onload().catch(console.error);
  }, []);

  return (
    <DefaultLayout name={isNav}>
      {isMainPageLoading ? <Loading /> : null}
      <section className="flex flex-col  justify-centerpy-8 md:py-10 bg-gray-200">
        <Toaster />
        {/* Header */}
        <div className="flex justify-start items-center gap-4">
          <Image
            alt="chain logo"
            height={50}
            src="/images/chains/btc.svg"
            width={50}
          />
          <div>
            <p className="text-black font-semibold">Guarda Wallet</p>
            <p className="text-gray-500 text-xs">Version 3.0.73-build:4</p>
          </div>
        </div>
        {/* Setting Card1 */}
        <div className="flex bg-white rounded-md p-3 mt-4">
          <div className="min-w-10">
            <Image
              alt="chain logo"
              height={45}
              src="/images/chains/btc.svg"
              width={45}
            />
          </div>
          <div className="ml-2">
            <p className="text-black">Backup</p>
            <p className="text-gray-500 text-xs mt-1">
              Keep a copy of your wallet in a safe place and never give it to
              others. Anyone who gets hold of your Backup file will be able to
              access your coins
            </p>
          </div>
        </div>
        {/* Setting Card2 */}
        <div className="flex bg-white rounded-md p-3 mt-2">
          <div className="min-w-10">
            <Image
              alt="chain logo"
              height={45}
              src="/images/chains/btc.svg"
              width={45}
            />
          </div>
          <div className="ml-2">
            <p className="text-black">Import</p>
            <p className="text-gray-500 text-xs mt-1">
              Import your wallet using Private Key, Mnemonic, WIF or XPRV
            </p>
          </div>
        </div>

        {/* Setting Column2 */}
        <h2 className="text-gray-500 text-sm mt-8">SERVICE</h2>
        <div className="flex bg-white rounded-md p-3 mt-2">
          <div className="min-w-10">
            <Image
              alt="chain logo"
              height={45}
              src="/images/chains/btc.svg"
              width={45}
            />
          </div>
          <div className="ml-2 grow flex justify-between items-center">
            <p className="text-black text-sm">WalletConnect</p>
            <p className="text-xxs text-gray-500">Will be live soon</p>
          </div>
        </div>
        {/* Setting Column3 */}

        <h2 className="text-gray-500 text-sm mt-8">Settings</h2>
        {[1, 2, 3].map((item, index) => (
          <div key={index} className="flex bg-white rounded-md p-3 mt-2">
            <div className="min-w-10">
              <Image
                alt="chain logo"
                height={45}
                src="/images/chains/btc.svg"
                width={45}
              />
            </div>
            <div className="ml-2 grow flex justify-between items-center">
              <p className="text-black text-sm">WalletConnect</p>
              <IoIosArrowForward className="text-gray-500" />
            </div>
          </div>
        ))}
      </section>
    </DefaultLayout>
  );
}
