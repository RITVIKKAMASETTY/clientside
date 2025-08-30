// export {GET,POST} from '@/app/_lib/auth';
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};
const handlers=NextAuth(authOptions);
export {handlers as GET,handlers as POST};