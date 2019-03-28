import * as functions from 'firebase-functions';
import {environment} from "../../src/environments/environment";

// Firebase Setup
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(environment.firebase_admin),
  databaseURL: environment.firebase.databaseURL
});


exports.deleteUser = functions.database.ref('/users/{userId}')
  .onDelete((snapshot, context) => {
    admin.auth().deleteUser(context.params.userId)
      .then(() => console.log("Successfully deleted user", context.params.userId))
      .catch((error: any) => console.log("Error deleting user:", error));
  });
