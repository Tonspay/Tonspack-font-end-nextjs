function address_readable(font:number,back:number,raw:string)
{
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
}