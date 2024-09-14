import { useState, useEffect } from "react";
import { Image } from "@nextui-org/image";
import { IoIosArrowForward } from "react-icons/io";
import { TbTransferVertical } from "react-icons/tb";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";

import { Loading } from "@/components/loading";
import DefaultLayout from "@/layouts/default";

import { deving } from "../../core/utils/utils";
import { Toaster } from "react-hot-toast";

type walletCard = {
  title: string;
  full_address: string;
  address: string;
  scan: string;
  img: string;
  name: string;
  bal: string;
};

export default function ExchangePage() {
  const [isMainPageLoading, setIsMainPageLoading] = useState(true);

  const [isNav, setIsNav] = useState("");

  useEffect(() => {
    const onload = async () => {
      setIsMainPageLoading(false);
      setIsNav("exchange");
    };

    onload().catch(console.error);
  }, []);

  return (
    <DefaultLayout name={isNav}>
      {isMainPageLoading ? <Loading /> : null}
      <Toaster />
      <section className="bg-black flex flex-col rounded-lg shadow-md p-4 w-full space-y-4" onClick={deving}>
        <div className="flex justify-between items-center text-gray-500">
          <p className="text-sm">USDT</p>
          <p>Send</p>
        </div>
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center space-x-2">
            <Image
              alt="chain logo"
              height={40}
              src="/images/chains/usdt.svg"
              width={40}
            />
            <div className="font-semibold">
              <p>Tether</p>
              <p>0</p>
            </div>
          </div>

          <IoIosArrowForward className="text-gray-500" />
          <p>0</p>
        </div>

        <div className="flex justify-center items-center text-gray-500">
          <TbTransferVertical />
          <div className="mx-2 border rounded-md px-2 py-1 text-sm">
            1 USDT = 0.0000167 BTC
          </div>
        </div>

        <div className="flex justify-between items-center text-gray-500">
          <p className="text-sm">BTC</p>
          <p>Receive</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image
              alt="chain logo"
              height={40}
              src="/images/chains/btc.svg"
              width={40}
            />
            <div className="font-semibold text-white">
              <p>Bitcoin</p>
              <p>0</p>
            </div>
          </div>

          <IoIosArrowForward className="text-gray-500" />
          <p className="text-gray-500">0</p>
        </div>

        <Tabs fullWidth radius="md">
          <Tab key="25" title="25%" />
          <Tab key="50" title="50%" />
          <Tab key="100" title="100%" />
        </Tabs>

        <div className="text-center text-gray-500 text-xs">
          Network fee: 0.00015 BTC (excluded)
        </div>
      </section>

      <div className="absolute bottom-14 right-0 w-full p-4">
        <Button className="w-full" color="primary">
          Confirm
        </Button>
      </div>
    </DefaultLayout>
  );
}
