const webPush = require("web-push");

const vapidKeys = {
    publicKey : "BLuQBZ0AjTmpBr_67EEbNj2qnQGuuoxBQ2DdbiSvHhhSwilEGQPPgeQPtz8nZYK9dQJK8vQmbaXYCs57A0FAE6U",
    privateKey : "ekPr4hngJUcFoCy4w7Y1ebCQq2juKAK-PSrTyPnzK2M"
}
const subscription = {
    endpoint : " https://fcm.googleapis.com/fcm/send/eqGfdrPYqXE:APA91bHoANl45DB2mzPsIk2_iyES51Zu9rwH-CGLL01X3S0dmyvr0WGwMRoTc5e1yczVi3H5XWQZD2hmAF7QEXIa_lzp6ki8lewgtaGzl1tif_iXyn4Ub6RF5X8Jqm82WjmOg87-Mp79",
    keys : {
        p256dh : "BOX2IbcAFccsmPVSMZSZgcV7d99cJCzp++ypWt4Wuu9Ikvp+v9szGD/XGJ0JvG4o+PI/5GdqTpsiv32IYBdWPc8=",
        auth : "veCu0j+MQUsCJTYdGh0QIQ=="
    }
}
const options = {
    gcmAPIKey : "926562438760",
    TTL : 60
}
webPush.setVapidDetails('mailto:aliviyakr@gmail.com',vapidKeys.publicKey,vapidKeys.privateKey)

let payloads = "selamat,push notification + subscription berhasil di gunakan"

webPush.sendNotification(
    subscription,
    payloads,
    options
)