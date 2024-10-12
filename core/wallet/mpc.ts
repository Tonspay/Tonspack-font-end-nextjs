import bs58 from "bs58";
import nacl from "tweetnacl";
import * as hd from "ethereumjs-wallet";

const derivePath = 1;

import * as evm from "./chains/evm";
import * as sol from "./chains/sol";
import * as ton from "./chains/ton";
import * as btc from "./chains/btc";
import { objKP, objAddress } from "./type";

function randomHDKey()
{
  return bs58.encode(
    Uint8Array.from(
      (hd.default.generate()).getPrivateKey()
    )
  )
}

function getKp(sk: string) {
  // const master = hd.hdkey.fromMasterSeed(Buffer.from(sk, "hex"));
  // const derive = master.deriveChild(derivePath);
  // const evmWallet = derive.getWallet();
  // const naclKp = nacl.sign.keyPair.fromSeed(evmWallet.getPrivateKey());

  // return {
  //   naclKp: naclKp,
  //   evmKp: {
  //     address: evmWallet.getAddressString(),
  //     privateKey: evmWallet.getPrivateKeyString(),
  //   },
  //   solKp: {
  //     address: bs58.encode(naclKp.publicKey),
  //     privateKey: bs58.encode(naclKp.secretKey),
  //   },
  //   tonKp: ton.getTonWalletV4KeyPair(Buffer.from(naclKp.secretKey), 0),
  //   btcKp: btc.getKeyPair(Buffer.from(evmWallet.getPrivateKey())),
  // } as objKP;


  // const evmWallet = evm.getKeyPairFromSec(sk)
  // console.log("MASTERKP ",evmWallet)
  // console.log(
  //   Uint8Array.from(
  //     Buffer.from(
  //       evmWallet.privateKey.split('0x')[1]
  //     )
  //   )
  // )
  // const naclKp = nacl.sign.keyPair.fromSeed(
  //   Uint8Array.from(
  //     Buffer.from(
  //       evmWallet.privateKey.split('0x')[1]
  //     )
  //   )
  // );


    const master = hd.hdkey.fromMasterSeed(Buffer.from(bs58.decode(sk)));
    const derive = master.deriveChild(derivePath);
    const evmWallet = derive.getWallet();
    const naclKp = nacl.sign.keyPair.fromSeed(
      Uint8Array.from(evmWallet.getPrivateKey())
    );


  return {
    naclKp: naclKp,
    evmKp: {
      address: evmWallet.getAddressString(),
      privateKey: evmWallet.getPrivateKeyString(),
    },
    solKp: {
      address: bs58.encode(naclKp.publicKey),
      privateKey: bs58.encode(naclKp.secretKey),
    },
    tonKp: ton.getTonWalletV4KeyPair(Buffer.from(naclKp.secretKey), 0),
    btcKp: btc.getKeyPair(Buffer.from(evmWallet.getPrivateKey())),
  } as objKP;
  
}

function getAddress(sk: string, isTestnet: boolean) {
  const kp = getKp(sk);
  let btcAddress: string;

  if (isTestnet) {
    btcAddress = kp.btcKp.testnet;
  } else {
    btcAddress = kp.btcKp.address;
  }

  return {
    evm: kp.evmKp.address,
    sol: kp.solKp.address,
    ton: kp.tonKp.address.toString({
      urlSafe: true,
      bounceable: false,
      testOnly: isTestnet,
    }),
    btc: btcAddress,
  } as objAddress;
}

export { getKp, getAddress, randomHDKey, evm, sol, ton, btc };
