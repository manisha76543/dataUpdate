// The Cloud Functions for Firebase SDK to create Cloud
// Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();
exports.checkflag = functions.database.ref("/user/name")
    .onUpdate((snapshot, context) => {
      const temptoken = "d216elr2Q4eSLXSWn8QvWy:APA91bGGXLs_OWSDK5rwUmDohinYq8VFpUs78yn1_EbKgAWCULauRXv8TggTkFUfjApWRCSAAe3ac3Kh89QV62OLgbkvVcDsrrXiaO9PZ3NNMXhf_fcDoMkHqFv8ki3zz12Sfkrn6PoL";

      const flag = snapshot.after.val();
      const statusMessage = `Message from the clouds as ${flag}`;
      const message = {
        notification: {
          title: "cfunction",
          body: statusMessage,
        },
        token: temptoken,
      };
      admin.messaging().send(message).then((response) => {
        console.log("Message sent successfully:", response);
        return response;
      })
          .catch((error) => {
            console.log("Error sending message: ", error);
          });
    });
