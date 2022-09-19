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

        // validating the the database Entry
        //   (username == 'admin' && password == '3131') ? {role : 'Admin'} :
        //  ( username == 'editor' && password == '2525') ? {role : 'Standard'} : null

        if (username == "admin") {
          if (password === "3131")
            return {
              name: username,
            };
        } else if (username == "editor") {
          if (password == "2525")
            return {
              name: username,
            };
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
});
