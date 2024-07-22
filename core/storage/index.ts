/**
 * Storage util
 * 
 * Control cookies * local storage
 */

const router_storage = {
    authkey: "user_authkey",
    uid: "user_uid",
    user_data_tg: "user_data_telegram"
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

export {
    storage_get_authkey,
    storage_set_authkey,
    storage_get_uid,
    storage_set_uid,
    storage_get_user_tg_data
};