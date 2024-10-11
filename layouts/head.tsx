import React from "react";
import NextHead from "next/head";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { initCloudStorage  } from "@telegram-apps/sdk-react";
/**
 * MPC web3auth
 */

import { wallet_init_data_set, wallet_mpc_set_kp ,randomKey} from "../core/wallet/index";

import { siteConfig } from "@/config/site";

export const Head = () => {
  //themes init
  const { theme, setTheme } = useTheme();

  if (theme != "dark") {
    setTheme("dark");
  }

  //init
  try {
    wallet_init_data_set();
  } catch (e) {
    console.log("🚧 init error", e);
  }

  const [kp, setKp] = useState("");

  useEffect(() => {
    loginWithWeb3Auth()
  }, []);

  const loginWithWeb3Auth = async () => {
    try {
      let privateKey =
        "";

        //PrivateKey check
        const cloudStorage = initCloudStorage();
        console.log("🔥 cloudStorage init",cloudStorage)
      
        
        let value = await cloudStorage.get('rawPrivateKey')
        console.log("get storage",value);

        if(!value || value?.length <10)
        {
          //Not been init
          let kp = randomKey()
          console.log("new keypair",kp.privateKey)
          await cloudStorage.set('rawPrivateKey',kp.privateKey)
          privateKey = kp.privateKey;
        }else{
          privateKey = value
        }

      console.log("🐞 Cloud Storage privateKey : ",privateKey)
      setKp(privateKey as string);
      wallet_mpc_set_kp(privateKey as string);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <NextHead>
      <title>{siteConfig.name}</title>
      <meta key="title" content={siteConfig.name} property="og:title" />
      <meta content={siteConfig.description} property="og:description" />
      <meta content={siteConfig.description} name="description" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <link href="/favicon.ico" rel="icon" />
    </NextHead>
  );
};