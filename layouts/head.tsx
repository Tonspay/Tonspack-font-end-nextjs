import React from "react";
import NextHead from "next/head";

import { siteConfig } from "@/config/site";
import {wallet_connect,wallet_list_generate,wallet_init_data_set} from "../core/wallet/index";

export const Head = () => {
    //init
    try{
      wallet_init_data_set()
    }catch(e){
      console.log("🚧 init error",e)
    }

    
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
