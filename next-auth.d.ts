// import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface User {
//     id: string;
//     email: string;
//     name: {
//       firstName?: string;
//       lastName?: string;
//     };
//     cognitoGroups: string[];
//     accessToken: string;
//     refreshToken: string;
//     idToken: string;
//     exp: number;
//     role: string;
//   }

//   interface Session {
//     user: User & DefaultSession["user"];
//     expires: string;
//     error: string;
//   }
// }

import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}