import { useState, useEffect } from "react";
import { Image } from "@nextui-org/image";
import { IoIosArrowForward } from "react-icons/io";
import { TbTransferVertical } from "react-icons/tb";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Button } from "@nextui-org/button";

import {
  wallet_list_generate,
  wallet_mpc_try_get_kp,
  mpc,
} from "../../core/wallet/index";

import { Loading } from "@/components/loading";
import DefaultLayout from "@/layouts/default";

type walletCard = {
  title: string;
  full_address: string;
  address: string;
  scan: string;
  img: string;
  name: string;
  bal: string;
};

export default function DocsPage() {
  // let list : walletCard[];
  let list: walletCard[];

  list = [];
  const [data, setData] = useState([
    {
      title: "pending",
      address: "",
      full_address: "",
      scan: "",
      img: "",
      name: "",
      bal: "",
    },
  ]);

  const [isMainPageLoading, setIsMainPageLoading] = useState(true);

  const [isNav, setIsNav] = useState("");

  useEffect(() => {
    const onload = async () => {
      const mpc_kp = await wallet_mpc_try_get_kp();

      if (mpc_kp) {
        // console.log("🚧 mpc_kp :: ",mpc_kp)
        const kps = mpc.getKp(mpc_kp);
        // console.log("🚧 kps :: ",kps)
        const wallets = mpc.getAddress(mpc_kp, false);
        // console.log("🚧 wallets :: ",wallets)
        const ws = await wallet_list_generate(wallets);

        console.log("🚧 Wallets :: ", ws);
        setData(ws);
        // setData([])
        setIsMainPageLoading(false);
        setIsNav("wallet");
      }
      // console.log("🚧 hook test")
    };

    onload().catch(console.error);
  }, []);

  // return returnFont()
  return (
    <DefaultLayout name={isNav}>
      {isMainPageLoading ? <Loading /> : null}
      <section className="bg-white flex flex-col rounded-lg shadow-md p-4 w-full space-y-4">
        <div className="flex justify-between items-center text-gray-500">
          <p className="text-sm">I have USDT</p>
          <p>Send</p>
        </div>
        <div className="flex justify-between items-center text-black">
          <div className="flex items-center space-x-2">
            <Image
              alt="chain logo"
              height={40}
              src="/images/chains/btc.svg"
              width={40}
            />
            <div className="font-semibold">
              <p>Tether</p>
              <p>0</p>
            </div>
          </div>

          <IoIosArrowForward className="text-gray-500" />
          <p>7.130127</p>
        </div>

        <div className="flex justify-center items-center text-gray-500">
          <TbTransferVertical />
          <div className="mx-2 border rounded-md px-2 py-1 text-sm">
            1 USDT = 0.0000167 BTC
          </div>
        </div>

        <div className="flex justify-between items-center text-gray-500">
          <p className="text-sm">I want BTC</p>
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
            <div className="font-semibold text-black">
              <p>Bitcoin</p>
              <p>0</p>
            </div>
          </div>

          <IoIosArrowForward className="text-gray-500" />
          <p className="text-gray-500">0.0001191</p>
        </div>

        <Tabs fullWidth radius="md">
          <Tab key="25" title="25%" />
          <Tab key="50" title="50%" />
          <Tab key="100" title="100%" />
        </Tabs>

        <div className="text-center text-gray-500 text-xs">
          Network fee: 0.00015 ETH (excluded)
        </div>
      </section>

      <div className="absolute bottom-0 right-0 w-full p-4">
        <Button className="w-full" color="primary">
          Confirm
        </Button>
      </div>
    </DefaultLayout>
  );
}
