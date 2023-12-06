import SignupModal from '../components/sessions/signup-modal'
import useAuthStore from '../components/sessions/auth-store'
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import axios from "axios";

import { useState  } from 'react'

export default function Home() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { isLoggedIn, login } = useAuthStore();
  const handleSignup = async (username, password, email) => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_REG_AUTH_API_URL, { username, password, email });
      const jwtToken = response.data.token;
      localStorage.setItem('token', jwtToken);
      login(); // Update state using Zustand store's login action
      setIsSignupModalOpen(false)
      // Close the modal, etc.
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle login failure
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>you're in the know, right?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to rah-th-site! 
        </h1>

        <p className={styles.description}>
          A portfolio website hoping to be just a little more than your average portfolio website, because there is no searching without expression, and no expression without the search 
        </p>

        <div className={styles.grid}>
           
           <div className={styles.card} onClick={() => setIsSignupModalOpen(true)}>
              <h3>Make an account and  &rarr;</h3>
              <p>Create your "solar system" with pictures and pop-ups when clicking on "planets", "suns", or "moons." Hide information behind passwords for those curious and determined. Present these ideas statically or in a carousel.</p>
            </div>
           <SignupModal
                        isOpen={isSignupModalOpen}
                        onClose={() => setIsSignupModalOpen(false)}
                        onLogin={handleSignup}>
           </SignupModal>
           <a href="https://github.com/luanf-dasilva/rah-th-sight/issues" className={styles.card}>
            <h3>Future plans &rarr;</h3>
            <p>- Instead of using set cubes and spheres as objects, import your own blender models.</p>
            <p>- Link to multiple systems. Ex. a system expounding on the Impressionism art movement can link to to a Post-Impressionism system </p>
          </a>

          <a
            href="https://github.com/luanf-dasilva/rah-th-server"
            className={styles.card}
          >
            <h3>Full-stack &rarr;</h3>
            <p>Everything from backend, frontend, CI-CD, as well Terraform will be done entirely by the maintainers.</p>
          </a>

          <a
            className={styles.card}
          >
            <h3>Warning!  &rarr;</h3>
            <p>
              This is not intended to be user-friendly, unless you want to simply look at content... at least not for a long time
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          target="_blank"
          rel="noopener noreferrer"
        >
          What's behind your eyes? {' '}
          <img src="/jmwt_vesuviuus.jpg" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
