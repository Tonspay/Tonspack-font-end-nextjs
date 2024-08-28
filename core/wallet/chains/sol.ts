import bs58 from "bs58";

import nacl from "tweetnacl"

import * as web3 from "@solana/web3.js"

import {objKP} from "../type"

import config from "../../config"

function connect(kp : objKP)
{
    return kp.solKp.address
}

function sign(kp : objKP, data : string)
{
    const messageBytes = Buffer.from(data);
    return {
        address:kp.solKp.address,
        message:data,
        sign:bs58.encode(nacl.sign(messageBytes, bs58.decode(kp.solKp.privateKey))) 
    }
}

async function signAndSendTxn(kp : objKP,tx:any  ,rpc ? : string)
{
    try{
        let rpc_url = config.chains.solana.rpc[0]
        if(rpc && rpc.length>0)
        {
            rpc_url = rpc
        }
        const conn = new web3.Connection(rpc_url);
        const ret = [];
        let txs ;
        if(typeof(txs) != 'object')
        {
            txs = JSON.parse(
                tx.d
            )
        }else{
            txs = tx.d 
        }
        for(var u = 0 ; u<txs.length ; u++)
        {
            const ele = txs[u]
            console.log("🚧 txn array ",ele,ele.d)
            const rawSign =  new Uint8Array(bs58.decode(ele.d))
    
            

            const signer = web3.Keypair.fromSecretKey(bs58.decode(kp.solKp.privateKey))    

            if(ele.t && ele.t == 1)
            {
                //Version transaction
                const realTx =web3.VersionedTransaction.deserialize(rawSign);
                console.log("🚧 Transactions to sign :",realTx)
                const simulate = await conn.simulateTransaction(realTx,{
                    sigVerify:false
                })
                console.log(
                    "🚧 Do conn.simulateTransaction",
                    simulate,
                    simulate.value.accounts
                )
                // if(!simulate.value.logs)
    
                if(simulate && simulate.value && simulate.value.logs && simulate.value.logs)
                {
                    var addFee = true;
                    simulate.value.logs.forEach(ele => {
                        if(ele == 'Program ComputeBudget111111111111111111111111111111 success')
                        {
                            addFee = false
                        }
                    });
                    if(addFee)
                    {
                        // const unitsConsumed = simulate.value.unitsConsumed+300;
                        // const unitsPrice = 20000
                        // realTx.add(
                        //     web3.ComputeBudgetProgram.setComputeUnitLimit({ 
                        //         units: unitsConsumed 
                        //     })
                        // )
                        // realTx.add(
                        //     web3.ComputeBudgetProgram.setComputeUnitPrice({ 
                        //         microLamports: unitsPrice
                        //     })
                        // )
                    }
                }

                realTx.sign([signer])
                console.log("🚧 Transactions signed :",realTx)
                const finalSign = realTx.serialize()
                ret.push(
                    {
                        t:1,
                        d:Buffer.from(finalSign).toString("base64")
                    }
                )
            }else{
                const realTx =web3.Transaction.populate(web3.Message.from(rawSign))
                //Transaction
                if(!realTx.recentBlockhash)
                {
                    let blockhashObj = await conn.getRecentBlockhash();
                    realTx.recentBlockhash = blockhashObj.blockhash;
                }
    
                const simulate = await conn.simulateTransaction(realTx,[signer],[signer.publicKey])
                console.log(
                    "🚧 Do conn.simulateTransaction",
                    simulate,
                    simulate.value.accounts
                )
                // if(!simulate.value.logs)
    
                var addFee = true;
                if(simulate && simulate.value && simulate.value.logs && simulate.value.logs)
                {
                    simulate.value.logs.forEach(ele => {
                        if(ele == 'Program ComputeBudget111111111111111111111111111111 success')
                        {
                            addFee = false
                        }
                    });
                    if(addFee)
                    {
                        // const unitsConsumed = simulate.value.unitsConsumed+300;
                        // const unitsPrice = 20000
                        // realTx.add(
                        //     web3.ComputeBudgetProgram.setComputeUnitLimit({ 
                        //         units: unitsConsumed 
                        //     })
                        // )
                        // realTx.add(
                        //     web3.ComputeBudgetProgram.setComputeUnitPrice({ 
                        //         microLamports: unitsPrice
                        //     })
                        // )
                    }
        
                }

    
                realTx.sign(signer);
                realTx.partialSign(signer);
                const finalSign = realTx.serialize()
                console.log("final Sign",finalSign)
    
                ret.push(
                    {
                        t:0,
                        d:Buffer.from(finalSign).toString("base64")
                    }
                )
            }
        }
        return ret;

    }catch(e)
    {
        console.error(e)
        return {
            status:false,
            reason:e
        }
    }

}

export {
    connect,
    sign,
    signAndSendTxn
}