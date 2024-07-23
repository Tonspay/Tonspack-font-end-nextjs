

import {useRouter} from 'next/router';
import { useInitData, useLaunchParams, type User } from '@telegram-apps/sdk-react';
async function miniapp_init() {
    let decodeData = {
        isTelegram :false,
        initData:{},
        hasStarData:false,
        starData:""
    }
    try{

        const r = useRouter();

        console.log("🚧 r",r)
        console.log("🚧 useRouter()",r.asPath)
        const path = r.asPath;

        const tmp0 = path.split("#");

        if(tmp0.length>1)
        {
            const temp1 = tmp0[1]// decodeURIComponent(decodeURIComponent(tmp0[1]))
            
            const temp2 = temp1.split("tgWebAppData=");

            if(temp2.length>1)
            {
                decodeData.initData ={initData:temp2[1]}
                decodeData.isTelegram=true;

            }
            const initData = useLaunchParams().initDataRaw;
            decodeData.initData ={initData:initData}
        }
        if(tmp0.length>0)
        {
            const temp3 = tmp0[0].split("tgWebAppStartParam=")
            decodeData.starData = temp3[1];
            decodeData.hasStarData=true;
        }
        

    }catch(e)
    {
        console.log(e)
       
    }
    return decodeData

    
}


export {
    miniapp_init,
}