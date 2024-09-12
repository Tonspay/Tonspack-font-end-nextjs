/**
 * Network request util
 *
 * Using fetch async/await .
 *
 * Making fetch request router .
 */

import { Web3 } from "web3";
import { Connection, PublicKey } from "@solana/web3.js";

import config from "../config";
import { storage_get_authkey } from "../storage/index";

const siteBaseUrl = config.siteBaseUrl;

const request_baseurl = `${siteBaseUrl}api/`;
const tonapi_baseurl = "https://tonapi.io/";
const tonsbrige_baseurl = `${siteBaseUrl}/bridge/`;
const dapp_indexer_baseurl = `https://tonspay.github.io/Tonspack-dapp-indexer/`;
const request_router = {
  ping: request_baseurl + "ping",
  debug: request_baseurl + "debug",
  auth: request_baseurl + "auth",
  action: request_baseurl + "action",
  mpc_action: request_baseurl + "mpc/action",
  preconnection: request_baseurl + "preconnect",
  preconnect: {
    phantom: request_baseurl + "preconnect/phantom",
    metamask: request_baseurl + "preconnect/metamask",
  },
  connect: request_baseurl + "connect",
  scan: {
    tonapi: {
      balance: tonapi_baseurl + "v2/blockchain/accounts/",
    },
    solscan: {
      balance: "",
    },
    arbscan: {
      balance: "",
    },
    blockchainInfo: {
      balance: "https://blockchain.info/q/addressbalance/",
    },
  },
  bridge: {
    quote: tonsbrige_baseurl + "quote",
    swap: tonsbrige_baseurl + "swap",
  },
  app_indexer: {
    index: dapp_indexer_baseurl + "index.json",
    chians: dapp_indexer_baseurl + "chains.json",
    dapp: dapp_indexer_baseurl + "dapp.json",
  },
};

async function requester(url: string, requestOptions: any) {
  try {
    return (await fetch(url, requestOptions)).json();
  } catch (e) {
    console.log("🐞 req error", e);
  }

  return false;
}

function request_method_get(headers: any) {
  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  return requestOptions;
}

function request_method_post(bodys: any, headers: any) {
  var requestOptions = {
    method: "POST",
    headers: headers,
    body: bodys,
    redirect: "follow",
  };

  return requestOptions;
}

function auth_header() {
  var myHeaders = new Headers();

  myHeaders.append("token", storage_get_authkey());

  return myHeaders;
}

function request_get_unauth() {
  return request_method_get({});
}

function request_get_auth() {
  return request_method_get(auth_header());
}

function request_post_unauth(data: any) {
  var h = new Headers();

  h.append("Content-Type", "application/json");

  return request_method_post(JSON.stringify(data), h);
}

function request_post_auth(data: any) {
  var h = auth_header();

  h.append("Content-Type", "application/json");

  return request_method_post(JSON.stringify(data), h);
}

async function api_ping() {
  return await requester(request_router.ping, request_get_auth());
}

//Get auth token
async function api_auth(data: any) {
  return await requester(request_router.auth, request_post_unauth(data));
}

async function api_connect(data: any) {
  return await requester(request_router.connect, request_post_unauth(data));
}

//Post connection method
async function api_action(data: any) {
  return await requester(request_router.action, request_post_auth(data));
}

async function api_mpc_action(data: any) {
  return await requester(request_router.mpc_action, request_post_auth(data));
}

async function api_preconnect(actionId: string) {
  return await requester(
    request_router.preconnection + "/" + actionId,
    request_get_unauth(),
  );
}

//Price fetch
async function api_balance_ton(data: string) {
  try {
    const ret = await requester(
      request_router.scan.tonapi.balance + data,
      request_get_unauth(),
    );

    if (!Number(ret?.balance)) {
      return 0;
    }

    return Number(ret.balance);
  } catch (e) {
    return 0;
  }
}

async function api_balance_sol(data: string) {
  try {
    const connection = new Connection(config.solanaConnection);

    return await connection.getBalance(new PublicKey(data));
  } catch (e) {
    return 0;
  }
}

async function api_balance_btc(data: string) {
  try {
    const ret = await requester(
      request_router.scan.blockchainInfo.balance + data,
      request_get_unauth(),
    );

    if (!Number(ret)) {
      return 0;
    }

    return ret;
  } catch (e) {
    return 0;
  }
}

async function api_balance(data: string, chain: any, decimail: number) {
  try {
    var web3;

    switch (chain) {
      case "SOL":
        return Number(
          ((await api_balance_sol(data)) / Math.pow(10, decimail)).toFixed(3),
        );
      case "TON":
        return Number(
          ((await api_balance_ton(data)) / Math.pow(10, decimail)).toFixed(3),
        );
      case "BTC":
        return Number(
          ((await api_balance_btc(data)) / Math.pow(10, decimail)).toFixed(3),
        );
      default:
        web3 = new Web3(new Web3.providers.HttpProvider(chain.rpc[0]));

        return Number(
          (
            Number(await web3.eth.getBalance(data).toString()) /
            Math.pow(10, decimail)
          ).toFixed(3),
        );
    }
  } catch (e) {
    return 0;
  }
}

/**
 * Dapp indexer request router
 */

async function api_dapp_indexer_chains() {
  try {
    return await requester(
      request_router.app_indexer.chians,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);

    return 0;
  }
}

async function api_dapp_indexer_dapp() {
  try {
    return await requester(
      request_router.app_indexer.dapp,
      request_get_unauth(),
    );
  } catch (e) {
    console.error(e);

    return 0;
  }
}

export {
  api_auth,
  api_connect,
  api_preconnect,
  api_action,
  api_mpc_action,
  api_balance,
  api_dapp_indexer_chains,
  api_dapp_indexer_dapp,
  dapp_indexer_baseurl as api_dapp_indexer_baseurl,
};
