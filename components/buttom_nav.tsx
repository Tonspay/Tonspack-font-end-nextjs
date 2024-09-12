import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  RiSettings5Line,
  RiSettings5Fill,
  RiWallet3Fill,
  RiWallet3Line,
  RiMenu2Fill,
  RiMenu3Line,
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
    <div className={`${Styles.bottomNav}`}>
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
    </div>
  );
};
