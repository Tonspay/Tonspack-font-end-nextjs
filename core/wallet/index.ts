import {api_connect,api_balance,api_preconnect} from "../request/index"

import {miniapp_init} from "../utils/tg"

import {storage_set_authkey,storage_get_raw_init_data,storage_set_raw_init_data} from "../storage/index"

import {address_readable} from "../utils/utils"

import bs58 from "bs58";

function wallet_init_data_set() {
    // console.log("🚧 This is  wallet_init_data_set")
    const init = miniapp_init();
    storage_set_raw_init_data(init)
    return init;
}

async function wallet_connect() {
    const init = storage_get_raw_init_data();
    console.log("🚧 miniapp",init)
    if(init && init?.isTelegram)
    {
      const auth = await api_connect(init.initData)
      console.log("🚧 auth",auth)
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
    const evm = ws?.evm;
    const sol = ws?.sol;
    const ton = ws?.ton;

    const ret = [];
    ret.push(
        await wallet_list_peer_generate(0,evm)
    )

    ret.push(
        await wallet_list_peer_generate(1,sol)
    )

    ret.push(
        await wallet_list_peer_generate(2,ton)
    )

    return ret;
}

async function wallet_list_generate_action(ws:any,action:any) {
    const evm = ws?.evm;
    const sol = ws?.sol;
    const ton = ws?.ton;
    let ret ;
    if(action&&action.c)
    {
        return wallet_list_peer_generate(action.c.t,evm)
    }
    return await wallet_list_peer_generate(0,evm)
}

async function wallet_list_peer_generate(type:number,w:any) {
    if(type==0)
    {
            return {
            title: "Binance Smart Chain",
            address:address_readable(4,4,w),
            full_address:w,
            scan:"https://bscscan.com/address/"+w,
            img: "/images/chains/bnb.svg",
            name:"Binance Smart Chain",
            bal:`${await api_balance(w,'bsc')} BNB`
          }
    }

    if(type==1)
    {
            return {
            title: "Solana",
            address:address_readable(4,4,w),
            full_address:w,
            scan:"https://solscan.io/address/"+w,
            img: "/images/chains/sol.svg",
            name:"Solana",
            bal:`${await api_balance(w,"sol")} SOL`
          }
    }


    // if(type==2)
    // {
            return {
            title: "TON",
            address:address_readable(4,4,w),
            full_address:w,
            scan:"https://tonviewer.com/"+w,
            img: "/images/chains/ton.svg",
            name:"TON",
            bal:`${await api_balance(w,"ton")} TON`
          }
    // }
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
            console.log("🚧 Preconnect ",details)
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