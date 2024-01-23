import { useUserAuthContext } from "@/app/context/userAuthContext"
import { getReadyServiceWorker } from "@/app/utils/serviceWorker"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebaseConfig"


export async function getCurrentPushSubscription (){
    const sw = await getReadyServiceWorker()
    return sw.pushManager.getSubscription()
}

export async function registerPushNotifications (user) {
    if(!("PushManager") in window){
        throw Error("push notifications are not supported by this browser")
    }
    const existingSubscription = await getCurrentPushSubscription()
    if(existingSubscription){
        throw Error("Existing push subscription found")
    }
    const sw = await getReadyServiceWorker()
    const subscription = await sw.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:"BPlfqf7hhePDh7zXoBhNhza01lGpcBxUpbpuDrWQtHDo6TiMrHPe7Rwv2I4060Bg4_iPf7kSIaDZg7BPxwR2UIs",
    })
    await sendPushSubscriptionToServer(subscription , user)

}

export async function unregisterPushNotifications(user){
    const existingSubscription = await getCurrentPushSubscription()
   if(!existingSubscription){
    throw Error("no existing subscriptions...")
   }

   await deletePushSubscriptionFromServer(existingSubscription ,user)
   await existingSubscription.unsubscribe()
}

export async function sendPushSubscriptionToServer(subscription , user){
    
     console.log("sending push subscription to the server.....",subscription)
     console.log(typeof(subscription))
     try {
        let currentUser = {}
        const docRef = doc(db,"users",user)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            currentUser = docSnap.data()
            console.log(user)
        } else {
          console.log("No such document!");
        }
        const existingSubscriptions = currentUser?.push_subscriptions || []
        console.log(existingSubscriptions)
        const updated_subscriptions = existingSubscriptions.filter(
        (sub)=>sub.endpoint !== subscription.endpoint )

        const serializedSubscription = {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: subscription.toJSON().keys.p256dh,
            auth:  subscription.toJSON().keys.auth,
          },
          expirationTime:null
        };
        
        updated_subscriptions.push(serializedSubscription)
        console.log(updated_subscriptions)
        const updatedData = await updateDoc(docRef ,{
          push_subscriptions:updated_subscriptions
        })
    //    console.log(updatedData)
      } catch (error) {
        console.log(error)
      }
} 

export async function deletePushSubscriptionFromServer(subscription ,user){
     console.log("deleted subsciption fom server",subscription)

     try {
        let currentUser = {}
        const docRef = doc(db,"users",user)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            currentUser = docSnap.data()
            console.log(user)
        } else {
          console.log("No such document!");
        }
        const existingSubscriptions = currentUser?.push_subscriptions || []
        console.log(existingSubscriptions)
        const updated_subscriptions = existingSubscriptions.filter(
        (sub)=>sub.endpoint !== subscription.endpoint )

        const updatedData = await updateDoc(docRef ,{
          push_subscriptions:updated_subscriptions
        })
    //    console.log(updatedData)
      } catch (error) {
        console.log(error)
      }

}

// export async function sendNotificationToSubscription (subsciption){
//    console.log('sending notifiction to ',subsciption)
//    webPush.sendNotification(
//     subsciption,
//     JSON.stringify({
//         title:"this is a sample notification",
//         body:"successfully implemented notification functionality"

//     }),
//     {
//         vapidDetails:{
//             subject:"mailto:yahkoobp007@gmail.com",
//             publicKey:"BLt_x9JRWR7Ve_01XU5g0_3DiG-24NFBctgkRdtOLHxwv9tbZ4AstQM5YbI1O0vmXewHQqdXwpnG3cjNdOT3zjo",
//             privateKey:"xTK_O2sRLmbqoKecokw8tX21iSwjpxlzdVxGO69hx40"
//         }
//     }
//    )
// }