import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  RiSettings5Line,
  RiSettings5Fill,
  RiWallet3Fill,
  RiWallet3Line,
  RiMenu2Fill,
  RiMenu3Line,
  RiCoinsFill,
  RiCoinsLine,
} from "react-icons/ri";

import Styles from "@/styles/ButtomNav.module.css";

export const ButtomNav = (props: any) => {
  const router = useRouter();
  // console.log(props)
  const name = props.name;

  const [activeTabs, setActiveTabs] = useState(props.name);
  const [switchRouter, setSwitchRouter] = useState(props.name);

  useEffect(() => {
    switch (switchRouter) {
      case "exchange":
        router.push("/exchange");
        break;
      case "wallet":
        router.push("/wallet");
        break;
      case "setting":
        router.push("/setting");
        break;
      case "dapp":
        router.push("/dapp");
        break;
      default:
        // router.push('/')
        break;
    }
  }, [switchRouter, router]);
  if (name === "" || name == "index" || name == "action") {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full h-14 bg-primary-color flex justify-around items-center z-50 backdrop-blur-sm">
        <div className={`${Styles.bnTab}`}>
          {name == "dapp" ? (
            <RiMenu2Fill
              color="white"
              size="35"
              onClick={() => setSwitchRouter("dapp")}
            />
          ) : (
            <RiMenu3Line
              color="white"
              size="35"
              onClick={() => setSwitchRouter("dapp")}
            />
          )}
        </div>
        <div className={`${Styles.bnTab}`}>
          {name == "wallet" ? (
            <RiWallet3Fill
              color="white"
              size="35"
              onClick={() => setSwitchRouter("wallet")}
            />
          ) : (
            <RiWallet3Line
              color="white"
              size="35"
              onClick={() => setSwitchRouter("wallet")}
            />
          )}
        </div>

        <div className={`${Styles.bnTab}`}>
          {name == "setting" ? (
            <RiSettings5Fill
              color="white"
              size="35"
              onClick={() => setSwitchRouter("setting")}
            />
          ) : (
            <RiSettings5Line
              color="white"
              size="35"
              onClick={() => setSwitchRouter("setting")}
            />
          )}
        </div>

        <div className={`${Styles.bnTab}`}>
          {name == "exchange" ? (
            <RiCoinsFill
              color="white"
              size="35"
              onClick={() => setSwitchRouter("exchange")}
            />
          ) : (
            <RiCoinsLine
              color="white"
              size="35"
              onClick={() => setSwitchRouter("exchange")}
            />
          )}
        </div>
      </div>
    </>
  );
};
