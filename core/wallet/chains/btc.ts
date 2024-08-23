import * as btc from "bitcoinjs-lib"

const TESTNET = btc.networks.testnet;

const MAINNET = btc.networks.bitcoin;

import * as bip32 from "bip32"

import * as ecpair from "ecpair"

import * as ecc from "tiny-secp256k1"

import * as bitcoinMessage from "bitcoinjs-message"

import bs58 from "bs58";

import nacl from "tweetnacl"

import {objKP} from "../type"


function getKeyPair(sec:Buffer)
{
    const ECPair=ecpair.ECPairFactory(ecc);
    const kp = ECPair.fromPrivateKey(sec,{})

    if(!kp || !kp.privateKey)
    {
        return {
            address:"",
            publicKey:"",
            privateKey:""
        };
    }
    var private_key=kp.privateKey.toString('hex');
    var public_key=kp.publicKey.toString('hex');
    const { address }=btc.payments.p2pkh({pubkey:kp.publicKey,network:MAINNET});
    const testnet = btc.payments.p2pkh({pubkey:kp.publicKey,network:TESTNET});
    return {
        address:address,
        testnet:testnet.address,
        publicKey:public_key,
        privateKey:private_key
    }
}

function connect(kp:objKP)
{
    return kp.tonKp.address
}

function sign(kp:objKP,data:string)
{
    const message = Buffer.from(data);
    const ECPair=ecpair.ECPairFactory(ecc);
    const kps = ECPair.fromPrivateKey(Buffer.from(kp.btcKp.privateKey,'hex'),{})
    var privateKey = kps.privateKey
    if(privateKey)
    {
        var signature = bitcoinMessage.sign(message, privateKey, kps.compressed)
        return signature.toString('base64')
    }
    return false
}

async function signAndSendTxn(kp:objKP ,tx:string)
{
    
}

export {
    getKeyPair,
    connect,
    sign,
    signAndSendTxn
}
