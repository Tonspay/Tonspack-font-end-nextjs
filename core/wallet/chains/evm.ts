import * as Web3 from "web3";

import { objKP } from "../type";
import config from "../../config";

function connect(kp: objKP) {
  return kp.evmKp.address;
}

function sign(kp: objKP, data: string) {
  const account = Web3.eth.accounts.privateKeyToAccount(kp.evmKp.privateKey);

  return account.sign(data);
}

async function signAndSendTxn(kp: objKP, data: any, rpc?: string) {
  var web3 = getWeb3(data.c.i);

  if (web3) {
    try {
      const txns = data.d;
      const gas = web3.utils.toBigInt(21000);
      const gasPrice = await web3.eth.getGasPrice();
      const nonce = await web3.eth.getTransactionCount(kp.evmKp.address);

      var transaction = {
        to: txns.t,
        value: 0,
        gas,
        gasPrice,
        nonce,
        chainId: data.c.i,
        data: "",
      };

      if (txns.v && txns.v > 0) {
        transaction["value"] = txns.v;
      }

      if (txns.d) {
        transaction["data"] = txns.d;
        transaction["gas"] = await web3.eth.estimateGas({
          value: transaction.value,
          to: txns.t,
          data: txns.d,
        });
      }
      if (txns.g && txns.g > 0) {
        transaction.gas = txns.g;
      }
      // console.log(transaction)
      const signedTx = await web3.eth.accounts.signTransaction(
        transaction,
        kp.evmKp.privateKey,
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );

      return receipt;
    } catch (e) {
      console.error(e);

      return {
        status: false,
        reason: e,
      };
    }
  }

  return false;
}

function getWeb3(cid: string) {
  let chain = config.evmsChains.default;

  for (const e in config.evmsChains) {
    const c = parseInt(cid, 10).toFixed(0);
    const hex = parseInt(cid, 16).toFixed(0);

    if (e == c || e == hex) {
      chain = config.evmsChains[e];
    }
  }
  if (chain.rpc.length > 0) {
    return new Web3.Web3(new Web3.providers.http.HttpProvider(chain.rpc[0]));
  }

  return false;
}

export { connect, sign, signAndSendTxn };
