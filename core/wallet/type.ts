interface objKP {
    naclKp : {
        publicKey : Uint8Array,
        secretKey : Uint8Array,
    },
    evmKp : {
        address : string,
        privateKey : string,
    },
    solKp : {
        address : string,
        privateKey : string,
    },
    tonKp : any,
    btcKp : {
        address : string,
        testnet:string,
        publicKey:string,
        privateKey : string,
    }
  }
interface objAddress {
    evm : string,
    sol : string,
    ton : string,
    btc : string,
  }

  interface objActionRawData {
    t:number,
    i:string, 
    d:string, 
    c:string, 
    r:string | null
}

/**
 * Transaction Type
 */
interface objTonTxn {
    v: BigInt|number,
    t: string,
    d: string,
}

  export type {
    objKP,
    objAddress,
    objActionRawData,

    objTonTxn
  };