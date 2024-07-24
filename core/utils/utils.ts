import { QRCode } from "qrcode-generator-ts"

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

export {
    address_readable,
    generateQr
}