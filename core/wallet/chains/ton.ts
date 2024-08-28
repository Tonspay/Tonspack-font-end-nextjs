import bs58 from "bs58";

import nacl from "tweetnacl"

import * as tonCrypto from "@ton/crypto"

const keyPairFromSecretKey = tonCrypto.keyPairFromSecretKey

import * as ton from "@ton/ton"

import {objKP,objActionRawData,objTonTxn} from "../type"

import config from "../../config"




function getTonWalletV4KeyPair(sec:Buffer,workchain:any)
{
    const kp = keyPairFromSecretKey(sec);
    return ton.WalletContractV4.create({ publicKey: kp.publicKey, workchain: workchain });
}

function connect(kp:objKP)
{
    return kp.tonKp.address
}

function sign(kp:objKP,data:string)
{
    const messageBytes = Buffer.from(data);
    return {
        address:kp.naclKp.publicKey,
        message:data,
        sign:bs58.encode(nacl.sign(messageBytes, kp.naclKp.secretKey)) 
    }
}

async function signAndSendTxn(kp:objKP,tx:objActionRawData,rpc ? : string)
{
    
    try{
        const client = new ton.TonClient({
            endpoint: `https://toncenter.com/api/v2/jsonRPC?api_key=${process.env.TONCENTERAPIKEY}`,
          });
          
          let keyPair = keyPairFromSecretKey(Buffer.from(kp.naclKp.secretKey));
          let workchain = 0;
          let wallet = ton.WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
          let contract = client.open(wallet);
          let seqno = await contract.getSeqno();

          const txn = JSON.parse(tx.d) as objTonTxn[]
          console.log("🚧tx",txn)
          
          let msg : any[];
          msg = []

          txn.forEach(e => {
            msg.push(
                ton.internal({
                    value: (Number(e.v)/Math.pow(10,9)).toString(),
                    to: e.t,
                    bounce:false,
                    body: e.d,
                  })
            )

          });
          if(msg.length>0)
          {
            const ret = await contract.sendTransfer({
                seqno,
                secretKey: keyPair.secretKey,
                messages: msg
              });
    
              console.log("🚧 Ret , ",ret)
              return 1 ;
          }

          return 0 ;
    }catch(e)
    {
        console.error(e)
        return 1 ;
    }

}
export {
    getTonWalletV4KeyPair,
    connect,
    sign,
    signAndSendTxn
}