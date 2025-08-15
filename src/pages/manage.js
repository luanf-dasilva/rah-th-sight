import Head from 'next/head';
import styles from '../styles/Home.module.css';
import useAuthStore from '../components/sessions/auth-store'; // Adjust the import path as needed

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Manage = () => {
    const { isLoggedIn } = useAuthStore(); // Replace with your auth state check
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn) {
            // Redirect to login page or homepage if not logged in
            router.push('/login'); // Adjust the URL as needed
        }
    }, [isLoggedIn, router]);

    // Page content goes here
  return (
    <div className={styles.container}>
      <Head>
        <title>you're in the know, right?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Where does this even come from?
        </h1>
        <p className={styles.description}>
          There are a lot of inspirations:
        </p>

        <div className={styles.grid}>
        <a className={styles.card}>   
            <h3>Boredom  &rarr;</h3>
            <p>What else am I gonna do with my time?</p>
        </a>
        </div>
      </main>

    </div>
  )
};

export default Manage;