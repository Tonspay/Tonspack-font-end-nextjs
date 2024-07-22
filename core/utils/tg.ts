

import {useRouter} from 'next/router';

async function miniapp_init() {
    
    try{
        // const WebApp = useWebApp();
        // await WebApp.ready();
        // if (WebApp.initData) {
        //     return WebApp
        // }
        const r = useRouter();
        const path = r.asPath;

        const tmp0 = path.split("#");
        console.log("🚧 Decode path",tmp0)
        if(tmp0.length>1)
        {
            console.log(
                decodeURIComponent(tmp0[0]),decodeURIComponent(tmp0[1])
            )
        }

    }catch(e)
    {
        console.log(e)
        return false
    }

    
}


export {
    miniapp_init,
}