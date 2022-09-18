import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials;
        // validating the the database Entry 
      //   (username == 'admin' && password == '3131') ? {role : 'Admin'} : 
      //  ( username == 'editor' && password == '2525') ? {role : 'Standard'} : null 
        if (username == "admin") {
          if (password === "3131")
            return {
              role: "Admin",
            };
        } else if (username == "editor") {
          if (password == "2525")
            return {
              role: "Standard",
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
});
