import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  //todo to remove the token once the window is out of focus
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials;
        if (username == "admin") {
          if (password === process.env.NEXT_ADMIN)
            return {
              name: username,
            };
        } else if (username == "editor") {
          if (password == process.env.NEXT_EDITOR)
            return {
              name: username,
            };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL:process.env.NEXTAUTH_URL
});
