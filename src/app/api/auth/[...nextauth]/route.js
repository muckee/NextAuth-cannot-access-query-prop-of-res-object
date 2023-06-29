import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

const discordProvider = DiscordProvider({
  clientId: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET
});

const auth = async (
  req,
  res,
) => {

  const authOptions = {
    providers: [
      discordProvider,
    ],
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }) {
        // @ts-ignore
        session.publicKey = token.sub;

        if (session.user) {
          session.user.name = token.sub;
          session.user.image = `https://ui-avatars.com/api/?name=${token.sub}&background=random`;
        }

        return session;
      },
    }
  };

  // ERROR: `req does not have a property named 'query'`
  // Comment out lines 39 - 43 and there will not be an error
  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin");
  if (isDefaultSigninPage) {
    console.log('Page is default sign-in page.');
  }

  return await NextAuth(req, res, authOptions);
}

export {
  auth as GET,
  auth as POST,
};