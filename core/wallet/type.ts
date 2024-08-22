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
    tonKp : {
        address : string,
        privateKey : string,
    },
    btcKp : {
        address : string,
        privateKey : string,
    }
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
    objActionRawData,

    objTonTxn
  };