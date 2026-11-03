
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import env from "#start/env";

const firebaseApp =
  getApps().length > 0
    ? getApps()[0]!
    : initializeApp({
        credential: cert({
          projectId: env.get("FIREBASE_PROJECT_ID"),
          clientEmail: env.get("FIREBASE_CLIENT_EMAIL"),
          privateKey: env.get("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
        }),
      });

export const firebaseAuth = getAuth(firebaseApp);
