/**
 * Network request util
 * 
 * Using fetch async/await . 
 * 
 * Making fetch request router . 
 */

import config from "../config"

import {storage_get_authkey} from "../storage/index"

import {Web3} from "web3"

import{Connection , PublicKey} from "@solana/web3.js"

const siteBaseUrl = config.siteBaseUrl

const request_baseurl = `${siteBaseUrl}api/`
const tonapi_baseurl = "https://tonapi.io/"
const tonsbrige_baseurl = `${siteBaseUrl}/bridge/`
const request_router = {
    ping: request_baseurl + "ping",
    debug: request_baseurl + "debug",
    auth: request_baseurl + "auth",
    action: request_baseurl + "action",
    preconnection: request_baseurl + "preconnect",
    preconnect: {
        phantom: request_baseurl + "preconnect/phantom",
        metamask: request_baseurl + "preconnect/metamask",
    },
    connect: request_baseurl + "connect",
    info: {
        connection: request_baseurl + "info/connection",
        invoices: request_baseurl + "info/invoices",
        invoice: request_baseurl + "info/invoice",
    },
    scan  :{
        tonapi :{
            balance  : tonapi_baseurl+"v2/blockchain/accounts/",
        },
        solscan : {
            balance  : "",
        },
        arbscan : {
            balance  : ""
        }
    },
    bridge : {
        quote: tonsbrige_baseurl+"quote",
        swap: tonsbrige_baseurl+"swap"
    }
}

async function requester(url:string, requestOptions:any) {
    try {
        return (await fetch(url, requestOptions)).json()
    } catch (e) {
        console.log("🐞 req error", e)
    }
    return false;
}

function request_method_get(headers:any) {
    var requestOptions = {
        method: "GET",
        headers: headers,
        redirect: 'follow'
    };
    return requestOptions
}

function request_method_post(bodys:any, headers:any) {
    var requestOptions = {
        method: "POST",
        headers: headers,
        body: bodys,
        redirect: 'follow'
    };
    return requestOptions
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

function request_post_unauth(data:any) {
    var h = new Headers();
    h.append("Content-Type", "application/json");

    return request_method_post(
        JSON.stringify(data), h
    );
}

function request_post_auth(data:any) {
    var h = auth_header();
    h.append("Content-Type", "application/json");

    return request_method_post(
        JSON.stringify(data), h
    );
}


async function api_ping() {
    return await requester(request_router.ping, request_get_auth())
}


//Get auth token
async function api_auth(data:any) {
    return await requester(
        request_router.auth,
        request_post_unauth(data)
    )
}

async function api_connect(data:any) {
    return await requester(
        request_router.connect,
        request_post_unauth(data)
    )
}

//Post connection method
async function api_action(data:any) {
    return await requester(
        request_router.action,
        request_post_auth(data)
    )
}

async function api_preconnect(actionId:string) {
    return await requester(
        request_router.preconnection+"/"+actionId,
        request_get_unauth()
    )
}

//Price fetch
async function api_balance_ton(data:string) {
    try{
        const ret = await requester(
            request_router.scan.tonapi.balance+data,
            request_get_unauth()
        )
        if(!Number(ret))
        {
            return 0 ;
        }
        return ret;
    }catch(e)
    {
        return 0;
    }
}

async function api_balance_sol(data:string) {
    try{
        const connection = new Connection(config.solanaConnection);
        return await connection.getBalance(new PublicKey(data));
    }catch(e)
    {
        return 0;
    }
    
}

async function api_balance_arb(data:string) {
    const web3 = new Web3(new Web3.providers.HttpProvider(config.evmProviders.arb));
    return web3.eth.getBalance(data);
}

async function api_balance_evm(data:string,chain:any) {
    try{
        var web3;
        switch (chain){
            case "bsc":case 56:
            web3 = new Web3(new Web3.providers.HttpProvider(config.evmProviders.bsc))
                break
            default : 
            web3 = new Web3(new Web3.providers.HttpProvider(config.evmProviders.arb));
            break;
        }
        return await web3.eth.getBalance(data);

    }catch(e)
    {
        return 0;
    }
}

async function api_balance(data:string,chain:any,decimail:number) {
    try{
        var web3;
        switch (chain){
            case "sol":
                return (await api_balance_sol(data)/Math.pow(10,decimail)).toFixed(3)
            case "sol":
                return (await api_balance_ton(data)/Math.pow(10,decimail)).toFixed(3)
            case "bsc":case 56:
            web3 = new Web3(new Web3.providers.HttpProvider(config.evmProviders.bsc))
                return await web3.eth.getBalance(data);
            default : 
            web3 = new Web3(new Web3.providers.HttpProvider(config.evmProviders.arb));
                return await web3.eth.getBalance(data);
        }
        

    }catch(e)
    {
        return 0;
    }
}


export {
    api_auth,
    api_connect,
    api_preconnect,
    api_action,
    // api_balance_ton,
    // api_balance_sol,
    // api_balance_arb,
    // api_balance_evm,
    api_balance
}
