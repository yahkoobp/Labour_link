import { doc, getDoc, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"
import { db } from "../../../../firebaseConfig"
import webPush, { WebPushError } from "web-push"

export async function POST(req){
    try {
        const body = await req.json()
        console.log(body)
        const reciever_id = body.reciever
        console.log(reciever_id)

        try {
            let reciever_user = {}
            const docRef = doc(db,"users",reciever_id)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                reciever_user = docSnap.data()
                console.log(reciever_user)
            } else {
              console.log("No such document!");
            }
            const reciever_subscriptions = reciever_user?.push_subscriptions || []
            reciever_subscriptions.map((subscription)=>{
               webPush.sendNotification(
                subscription,
                JSON.stringify({
                    title:body.title,
                    body:"something about the body of the message",
                }),
                {
                    vapidDetails:{
                        subject:"mailto:yahkoobp007@gmail.com",
                        publicKey:"BPlfqf7hhePDh7zXoBhNhza01lGpcBxUpbpuDrWQtHDo6TiMrHPe7Rwv2I4060Bg4_iPf7kSIaDZg7BPxwR2UIs",
                        privateKey:"BS7dW69zs4Jq6ORqADzWxdPDqGKxXQ3flfXhGZ9MiLs"
                    }
                }
               )
            })
            
           
        //    console.log(updatedData)
          } catch (error) {
            console.log(error)
            // if(error instanceof WebPushError && error.statusCode ===410){
            //     //filter out invalid subscriptions fromm reciever subscriptions
            //     await updateDoc(docRef,{

            //     })
            // }
          }


        return NextResponse.json(
            {success:true},
            {status:200}
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {error:"Inernal server error"},
            {status:500}
        )
    }
}