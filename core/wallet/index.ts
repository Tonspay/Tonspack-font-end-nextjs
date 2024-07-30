import {api_connect,api_balance,api_preconnect} from "../request/index"

import {miniapp_init} from "../utils/tg"

import {storage_set_authkey,storage_get_raw_init_data,storage_set_raw_init_data} from "../storage/index"

import {address_readable} from "../utils/utils"

import config from "../config"

import bs58 from "bs58";

function wallet_init_data_set() {
    // console.log("🚧 This is  wallet_init_data_set")
    let init;
    // console.log("🚧 This is  storage_get_raw_init_data",storage_get_raw_init_data())
    if(!(storage_get_raw_init_data()) || !(storage_get_raw_init_data())?.isTelegram)
    {
        init = miniapp_init();
        storage_set_raw_init_data(init)
    }

    return init;
}

async function wallet_connect() {
    const init = storage_get_raw_init_data();
    // console.log("🚧 miniapp",init)
    if(init && init?.isTelegram)
    {
      const auth = await api_connect(init.initData)
    //   console.log("🚧 auth",auth)
      if(auth.code == 200)
      {
        if(auth?.token)
        {
            storage_set_authkey(auth.token)
        }

        if(auth?.data)
        {
            return auth.data;
        }
       
      }
    }
    return false;
}

async function wallet_list_generate(ws:any) {
    const ret = [];
    for(let i = 0 ; i<config.defaultChains.length;i++)
    {
        let item = config.defaultChains[i]
        ret.push( await wallet_list_peer_generate(item.t,item.c ,ws))
    }

    return ret;
}

async function wallet_list_generate_action(ws:any,action:any) {
    if(action&&action.c)
    {
        return wallet_list_peer_generate(parseInt(action.c.t),action.c.i,ws)
    }
    return await wallet_list_peer_generate(0,1,ws)
}

function wallet_get_chain_details(type:number,chains:any,w:any)
{
    switch(type)
    {
        case 0:
            //EVM
            let chain  = config.evmsChains.default;
            for(const e in config.evmsChains){
                const c =  parseInt(chains, 10).toFixed(0)
                const hex = parseInt(chains, 16).toFixed(0)
                if(e == c || e ==hex)
                {
                    chain = config.evmsChains[e]
                }
            }; 
            return {
                chain : chain,
                address : w.evm
            }
        break;
        case 1:
            //Solana
            return {
                chain : config.chains.solana,
                address : w.sol
            }
        break;
        case 2:
            //Ton
            return {
                chain : config.chains.ton,
                address : w.ton
            }
        break;
        case 3:
            //Bitcoin
            return {
                chain : config.chains.btc,
                address : w.btc
            }
        break;
        default:
            //SOL
            return {
                chain : config.chains.solana,
                address : w.sol
            }
            break;
    }
}

async function wallet_list_peer_generate(type:number,chains:any,w:any) {
    const data = wallet_get_chain_details(type,chains,w);
    console.log("🚧 Predraw data: ",data)
    return{
        title: data.chain.name,
        address:address_readable(4,4,data.address),
        full_address:data.address,
        scan:data.chain.scan.address+data.address,
        img: data.chain.icon,
        name:data.chain.name,
        bal:`${await api_balance(w,data.chain.symbol,data.chain.decimal)} ${data.chain.symbol}`
      }
}

function wallet_action_decode(data:string)
{
    try{
        const action = JSON.parse(
            Buffer.from(
                bs58.decode(data)
            ).toString()
        )
        return action;
    }catch(e)
    {
        console.error(e)
    }
    return false
}

async function wallet_action_details(data:any)
{
    try{
        if(data.t == 0)
        {
            return data
        }else{
            //Require to do api requset 
            const details = await api_preconnect(data.i);
            // console.log("🚧 Preconnect ",details)
            return details?.data;
        }
    }catch(e)
    {
        console.error(e)
    }
    return false
}

export {
    wallet_connect,
    wallet_list_generate,
    wallet_list_generate_action,
    wallet_init_data_set,
    wallet_action_decode,
    wallet_action_details
}