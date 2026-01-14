/* eslint-disable @typescript-eslint/no-unused-vars */
// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      email: string ;
      name: string ;
      profilePhoto: string;
      role: string;
      status: string;
      gender: string;
      needPasswordChange: boolean;
      createdAt: string;
      updatedAt: string;
    };
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    userData?: Session["user"];
  }
}