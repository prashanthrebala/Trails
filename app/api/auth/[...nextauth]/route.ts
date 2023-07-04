import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

// NOTES for NextAuth
// all authOptions are available at api/auth/signin by default
// you can redirect them to this route when session isn't available
// alternatively, you can create your own sign in page
// you can redirect your user to your custom sign in page
// each sign in button will have a callback with signIn("authProvider", {callbackURL?})

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
