// @ts-check

/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

const sw = /** @type {ServiceWorkerGlobalScope & typeof globalThis} */ (
    globalThis
  );

sw.addEventListener("push" , (event)=>{
    const message = event.data?.json()
    console.log(message)
    const {title} = message
    console.log("push message is recieved.........")

    async function handlePushEvent(){
       sw.registration.showNotification(title)
    }
    event.waitUntil(handlePushEvent())
})
