import Image from "next/image";
import styles from "./Page.module.css";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "./components/BlogCard";

const graphcms = new GraphQLClient(process.env.HYGRAPH_INFO);

const QUERY = gql`
  {
    posts(orderBy: datePublished_DESC) {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      thumbnail {
        url
      }
    }
  }
`;

export async function fetchBlogs() {
  const { posts } = await graphcms.request(QUERY);

  return posts;
}

export default async function Page() {

    const posts = await fetchBlogs();
  return (
    <div className={styles.container}>
      <section className={styles.textSection}>
        <h1>Blog</h1>
        <p>Topics about anything</p>
        <p>
          Written <strong>X+</strong> articles
        </p>
      </section>

      <main className={styles.main}>
        {posts.map((p) => (
          <BlogCard
            title={p.title}
            author={p.author}
            thumbnail={p.thumbnail}
            key={p.id}
            datePublished={p.datePublished}
            slug={p.slug}
          />
        ))}
      </main>

      <footer className={styles.footer}>
        <div>Copyright © {new Date().getFullYear()} by Michias</div>
      </footer>
    </div>
  );
}
