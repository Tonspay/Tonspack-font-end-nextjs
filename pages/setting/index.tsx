import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Image } from "@nextui-org/image";
import { IoIosArrowForward } from "react-icons/io";

import { Loading } from "@/components/loading";
import DefaultLayout from "@/layouts/default";
import Footer from "@/components/footer";
import Router,{ useRouter } from "next/router";

import { deving } from "../../core/utils/utils";

import { RiWallet3Fill ,RiSeedlingFill , RiSailboatFill ,RiFeedbackFill ,RiChat1Fill ,RiGithubFill} from "react-icons/ri";

type walletCard = {
  title: string;
  address: string;
  scan: string;
  img: string;
  name: string;
  bal: string;
};

export default function SettingPage() {
  const r = useRouter();
  
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
      <section className="flex flex-col  justify-centerpy-8 md:py-10 bg-black">
        <Toaster />
        {/* Header */}
        <div className="flex justify-start items-center gap-4">
          <RiWallet3Fill 
          color="white"
          size="55"
          // onClick={() => goBack()}
          ></RiWallet3Fill>
          <div>
            <p className="text-white font-semibold">Tonspack Wallet</p>
            <p className="text-white text-xs">Web3auth MPC Version</p>
          </div>
        </div>
        {/* Setting Card1 */}
        <div className="flex bg-gray-900 rounded-md p-3 mt-4"
          onClick={deving}>
          <div className="min-w-10">
          <RiSeedlingFill 
          color="white"
          size="30"
          
          ></RiSeedlingFill>
          </div>
          <div className="ml-2">
            <p className="text-white">Backup</p>
            <p className="text-white text-xs mt-1">
              Keep a copy of your wallet in a safe place and never give it to
              others. Anyone who gets hold of your Backup file will be able to
              access your coins
            </p>
          </div>
        </div>
        {/* Setting Card2 */}
        {/* <div className="flex bg-gray-900 rounded-md p-3 mt-2">
          <div className="min-w-10">
            <Image
              alt="chain logo"
              height={45}
              src="/images/chains/btc.svg"
              width={45}
            />
          </div>
          <div className="ml-2">
            <p className="text-white">Import</p>
            <p className="text-white text-xs mt-1">
              Import your wallet using Private Key, Mnemonic, WIF or XPRV
            </p>
          </div>
        </div> */}

        {/* Setting Column2 */}
        <h2 className="text-white text-sm mt-8">SERVICE</h2>
        <div className="flex bg-gray-900 rounded-md p-3 mt-2" onClick={deving}>
          <div className="min-w-10">
          <RiSailboatFill 
          color="white"
          size="30"
          
          ></RiSailboatFill>
          </div>
          <div className="ml-2 grow flex justify-between items-center">
            <p className="text-white text-sm">Bridge Master</p>
            <p className="text-xxs text-white">Will be live soon</p>
          </div>
        </div>
        {/* Setting Column3 */}

        <h2 className="text-white text-sm mt-8">Support</h2>
        {/* {[1, 2, 3].map((item, index) => (
          <div key={index} className="flex bg-gray-900 rounded-md p-3 mt-2">
            <div className="min-w-10">
              <Image
                alt="chain logo"
                height={45}
                src="/images/chains/btc.svg"
                width={45}
              />
            </div>
            <div className="ml-2 grow flex justify-between items-center">
              <p className="text-white text-sm">WalletConnect</p>
              <IoIosArrowForward className="text-white" />
            </div>
          </div>
        ))} */}


          <div className="flex bg-gray-900 rounded-md p-3 mt-2" onClick={() => Router.push({pathname: 'https://t.me/wikig16'})}>
            <div className="min-w-10">
            <RiFeedbackFill 
          color="white"
          size="30"
          
          ></RiFeedbackFill>
            </div>
            <div className="ml-2 grow flex justify-between items-center">
              <p className="text-white text-sm">Feedback & Contact</p>
              <IoIosArrowForward className="text-white" />
            </div>
          </div>


          <div className="flex bg-gray-900 rounded-md p-3 mt-2" onClick={() => Router.push({pathname: 'https://t.me/Tonspackdev'})}>
            <div className="min-w-10">
            <RiChat1Fill 
          color="white"
          size="30"
          
          ></RiChat1Fill>
            </div>
            <div className="ml-2 grow flex justify-between items-center">
              <p className="text-white text-sm">Join our channel</p>
              <IoIosArrowForward className="text-white" />
            </div>
          </div>


          <div className="flex bg-gray-900 rounded-md p-3 mt-2" onClick={() => Router.push({pathname: 'http://github.com/tonspay'})}>
            <div className="min-w-10">
            <RiGithubFill 
          color="white"
          size="30"
          
          ></RiGithubFill>
            </div>
            <div className="ml-2 grow flex justify-between items-center">
              <p className="text-white text-sm">Source Code</p>
              <IoIosArrowForward className="text-white" />
            </div>
          </div>
      </section>
      <Footer />
    </DefaultLayout>
  );
}
