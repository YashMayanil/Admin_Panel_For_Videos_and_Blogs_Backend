
import type { DecodedIdToken } from "firebase-admin/auth";

declare module "@adonisjs/core/http" {
  interface HttpContext {
    authenticatedUser: DecodedIdToken;
  }
}

export {};
