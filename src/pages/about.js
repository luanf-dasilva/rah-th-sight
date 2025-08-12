import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <Head>
        <title>youre in the know, right?</title>
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

          <a href="https://github.com/craftzdog/craftzdog-homepage" className={styles.card}>
            <h3>Thanks to these for making content I blatantly steal from</h3>
            <p>Long live the information age! A huge part of this project is stolen from devaslife&apross crafrdog&apross homepage</p>
          </a>

          <a
            className={styles.card}
          >
            <h3>Capture the flags &rarr;</h3>
            <p>(Don't hack me please, lol)</p> 
            <p>I really enjoy the idea of finding some exploit or idea to get a specific string to get a string from some server idea... </p>
          </a>

          <a
            className={styles.card}
          >
            <h3>All of art  &rarr;</h3>
            <p>
              Music, literature, painting, photography, cinema, video games, architecture, and so on and on and on. Isn't life's imitation beautiful?
            </p>
          </a>
        </div>
      </main>

    </div>
  )
}
