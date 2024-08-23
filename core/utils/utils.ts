import { QRCode } from "qrcode-generator-ts"
import toast, { Toaster } from 'react-hot-toast';
import config from "../config"
import Router,{useRouter} from 'next/router';
function generateQr(data:string)
{
    const qr =  new QRCode()
    qr.addData(data);
    return qr.toDataURL(100,100)

}
function address_readable(font:number,back:number,raw:string)
{
    if(!raw || raw.length<font || raw.length < back)
    {
        return ''
    }
    let f = ""
    for(let i = 0 ; i < font ; i++)
    {
        f+=raw[i];
    }

    let b = "";
    for(let i = (raw.length-back)-1 ; i<raw.length ; i++ )
    {
        b+=raw[i]
    }

    return f+"..."+b
}


function deving()
{
  toast('🚧 This function still deving 🚧')
}

function exportPrivateKey()
{
    Router.push(`${config.botUrl}?start=0export`)
}

async function sleep (ms:number) {
    return new Promise((resolve) => {
    setTimeout(resolve, ms);
    });
}
export {
    address_readable,
    generateQr,
    exportPrivateKey,
    deving,
    sleep
}