// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.AUTH_GOOGLE_ID,
//             clientSecret: process.env.AUTH_GOOGLE_SECRET,
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
// };
// const handlers=NextAuth(authOptions);
// export {handlers as GET,handlers as POST};
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function getSession() {
//   return await getServerSession(authOptions);
// }
// import { auth, signIn, signOut } from "@/app/api/auth/[...nextauth]/route";

// export { auth, signIn, signOut };
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({ email: user.email, fullname: user.name });
        }
        return true; // must return true to allow sign-in
      } catch (err) {
        console.error("SignIn callback error:", err);
        return false; // returning false triggers AccessDenied
      }
    },
    async session({session,user}){
      const guest=await getGuest(session.user.email);
      session.user.guestid=guest.id;
      return session;
    }
  },
  pages: {
    signIn: "/login", // optional custom login page
  },
});
