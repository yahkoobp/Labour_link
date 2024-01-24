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
    const {title , icon ,body} = message
    console.log("push message is recieved.........")

    async function handlePushEvent(){
       sw.registration.showNotification(title ,
        {
          icon,
          body,
          badge:"/success.webp",
          actions:[{title:"open app" , action:"open_app"}]

        })
    }
    event.waitUntil(handlePushEvent())
})

sw.addEventListener("notificationclick",(event)=>{
  const notification = event.notification
  notification.close()

  async function handleNotificationClick(){
    const windowClients = await sw.clients.matchAll({
      type:"window",
      includeUncontrolled:true
    })

    if(windowClients.length > 0){
      await windowClients[0].focus()
    }else{
    sw.clients.openWindow("/home")
    }
  }
  event.waitUntil(handleNotificationClick())
})
