import nacl from "tweetnacl"

function encrypt(pubKey:Uint8Array, msg:string) {
    console.log(
        "🚧 encrypt : ",
        pubKey,
        msg
    )
    try{
      let ephemKeys = nacl.box.keyPair()
      let msgArr = Buffer.from(msg)
      let nonce = nacl.randomBytes(nacl.box.nonceLength)
      let encrypted = nacl.box(
          msgArr,
          nonce,
          pubKey,
          ephemKeys.secretKey
      )
      let nonce64 = Buffer.from(nonce).toString("base64")
      let pubKey64 = Buffer.from(ephemKeys.publicKey).toString("base64")
      let encrypted64 = Buffer.from(encrypted).toString("base64")
      return {nonce: nonce64, ephemPubKey: pubKey64, encrypted: encrypted64}
    }catch(e)
    {
        console.log("🐞 Encryption error",e)
      return false;
    }
  }

function decrypt(secretKey:Uint8Array , encryption:any)
  {
    try{
      const decode =  nacl.box.open( 
        new Uint8Array(Buffer.from(encryption.encrypted,"base64")),
        new Uint8Array(Buffer.from(encryption.nonce,"base64")),
        new Uint8Array(Buffer.from(encryption.ephemPubKey,"base64")),
        secretKey
      )
      if(decode)
      {
        return  Buffer.from(decode).toString("utf8")
      }
      
    }catch(e)
    {
     
    }
    return false;
  }

function test()
{
    console.log("🚧 Nacl Test",nacl)
}

export {
    test,
    encrypt,
    decrypt
 };