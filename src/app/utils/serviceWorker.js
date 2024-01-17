export async function registerServiceWorker(){
    if(!("serviceWorker") in navigator){
        throw Error("service worker is not supported by this browser")
    }
    navigator.serviceWorker.register("/serviceWorker.js")
}

export async function getReadyServiceWorker () {
    if(!("serviceWorker") in navigator){
        throw Error("service worker is not supported by this browser")
    }
    return navigator.serviceWorker.ready;
}