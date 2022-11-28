import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import { useSession, signOut, getSession } from "next-auth/react";

import styles from "../styles/Home.module.css";
import React from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  console.log({router})
  const handleSignOut = () => {
    signOut();
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>

      {session ? User({ session, handleSignOut }) : Guest()}
    </div>
  );
}

// Guest
function Guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>

      <div className="flex justify-center">
        <Link
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          href={"/login"}
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}

function User({ session, handleSignOut }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Authorize User Homepage</h3>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button
          className="mt-5 px-10 py-1 rounded-sm bg-gray-50"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link
          className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          href={"/profile"}
        >
          Profile Page
        </Link>
      </div>
    </main>
  );
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};
