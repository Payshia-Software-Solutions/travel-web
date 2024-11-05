// pages/protected.js

import { useSession, getSession } from "next-auth/client";

export default function Protected() {
  const [session, loading] = useSession();

  if (loading) return <div> Loading... </div>;
  if (!session) return <div> You are not authenticated </div>;

  return <div> Welcome {session.user.email} </div>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
