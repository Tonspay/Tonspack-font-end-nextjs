import React from "react";
import NextHead from "next/head";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * MPC web3auth
 */

import { wallet_mpc_set_kp } from "../core/wallet/index";

import { siteConfig } from "@/config/site";

export const Head = () => {
  //themes init
  const { theme, setTheme } = useTheme();

  if (theme != "dark") {
    setTheme("dark");
  }

  const [kp, setKp] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    loginWithWeb3Auth();
  }, []);

  const loginWithWeb3Auth = async () => {
    try {
      const privateKey =
        "0x7c327d3498f1fe8de08b136784f6e8bec54d1dc0ce534ff84a22b71c060c1032";

      // console.log("🐞 Web3auth privateKey : ",privateKey)
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
