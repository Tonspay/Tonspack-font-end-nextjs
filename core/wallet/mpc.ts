import bs58 from "bs58";

import nacl from "tweetnacl"

import * as hd from "ethereumjs-wallet"

const derivePath = 1

import {objKP} from "./type"

async function getKp(sk:string)
{
    sk = "0x"+sk
    const master = hd.hdkey.fromMasterSeed(Buffer.from(sk,'hex'));
    const derive = master.deriveChild(derivePath)
    const evmWallet = derive.getWallet()
    const naclKp = nacl.sign.keyPair.fromSeed(evmWallet.getPrivateKey())
    
    return {
        naclKp : naclKp,
        evmKp :  {
            address : evmWallet.getAddressString(),
            privateKey : evmWallet.getPrivateKeyString()
        },
        solKp : {
            address : bs58.encode(naclKp.publicKey),
            privateKey :bs58.encode(naclKp.secretKey),
        },
    } as objKP
}


export {
    getKp
}