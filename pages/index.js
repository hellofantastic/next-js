import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home({ posts}) {
  
  const jsxPosts = posts.map((post) => {
    return <div key={post.id} className={styles.card}><h4>{post.title.rendered}</h4></div>;
  });
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Wordpress headless/graphql next.js UI test
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
           <h2 className="pb-3">Galactic Pages</h2>
            {jsxPosts}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

const BASE_URL = 'https://thegalacticdesignbureau.com/wp-json/wp/v2';

export async function getStaticProps({ params }) {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
    revalidate: 10, // In seconds
  };
}

export async function getPosts() {
  const postsRes = await fetch(BASE_URL + '/pages?_embed');
  const posts = await postsRes.json();
  return posts;
}
