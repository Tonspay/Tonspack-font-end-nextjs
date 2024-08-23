/**
 * Storage util
 * 
 * Control cookies * local storage
 */

// type telegram_init_data_type = {
//     isTelegram :boolean,
//     initData:any,
//     hasStarData:boolean,
//     starData:string
// }

const router_storage = {
    authkey: "user_authkey",
    uid: "user_uid",
    user_data_tg: "user_data_telegram",
    raw_init_data:{
        isTelegram :false,
        initData:{},
        hasStarData:false,
        starData:""
    },
    kp:""
}

function storage_get_authkey() {
    var key = router_storage.authkey;
    if (key) {
        return key
    }
    return "false";
}

function storage_set_authkey(key:string) {
    router_storage.authkey = key
}

function storage_get_raw_init_data() {
    var key = router_storage.raw_init_data
    if (key) {
        return key
    }
    return key;
}

function storage_set_raw_init_data(raw_init_data:any) {
    router_storage.raw_init_data=raw_init_data
}



function storage_get_uid() {
    var key = router_storage.uid
    if (key) {
        return key
    }
    return false;
}

function storage_set_uid(uid:string) {
    router_storage.uid=uid
}

function storage_get_user_tg_data() {
    var key = router_storage.user_data_tg
    if (key) {
        return key
    }
    return false;
}

function storage_set_user_tg_data(uid:string) {
    router_storage.user_data_tg = uid
}

function storage_set_kp(sk:string)
{
    router_storage.kp = sk
}

function storage_get_kp()
{
    return router_storage.kp
}

export {
    storage_get_authkey,
    storage_set_authkey,
    storage_get_uid,
    storage_set_uid,
    storage_get_user_tg_data,
    storage_get_raw_init_data,
    storage_set_raw_init_data,
    storage_set_kp,
    storage_get_kp
};