import { useUserAuthContext } from '@/app/context/userAuthContext'
import { getCurrentPushSubscription, registerPushNotifications, unregisterPushNotifications } from '@/notifications/PushService'
import React, { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

const NotificationIcon = () => {
    const [hasActivePushSubscription , setHasActivePushSubscription] = useState()
    const {user} = useUserAuthContext()
    useEffect(()=>{
        async function getActivePushSubscription (){
        const subscription = await getCurrentPushSubscription()
        if(subscription){
            setHasActivePushSubscription(true)
        }else{
            setHasActivePushSubscription(false)
        }
        }  
        getActivePushSubscription()
    },[])

    async function getPushNotificationEnabled (enabled){
         try {
            if(enabled){
                await registerPushNotifications(user?.uid)
            }else{
                unregisterPushNotifications(user?.uid)
            }
            setHasActivePushSubscription(enabled)
         } catch (error) {
            console.log(error)
            if(enabled && Notification.permission ==="denied"){
                alert("please enable push notifivation settings in browser")
            }else{
                alert("something went wrong.....please try again")
            }
         }
    }
 if(hasActivePushSubscription === undefined) return null
  return (
    <div>
         {hasActivePushSubscription ?(
          <span title='disable push notification on this device'>
            <NotificationsIcon sx={{color:"white"}} onClick={()=>getPushNotificationEnabled(false)} className='cursor-pointer'/>
          </span>
         ):(
            <span title='enable push notification on this device'>
            <NotificationsOffIcon sx={{color:"white"}} onClick={()=>getPushNotificationEnabled(true)} className='cursor-pointer'/>
          </span>)
        }
    </div>
  )
}

export default NotificationIcon