import { GraphQLClient, gql } from "graphql-request";
import styles from "../Slug.module.css";
import moment from "moment";


// export async function generateMetadata({post}){
//   const pTitle = post;
//   return {title:pTitle }
  
// }

const graphcms = new GraphQLClient(process.env.HYGRAPH_INFO);


const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      thumbnail {
        id
        url
      }
    }
  }
`;
const URLLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function generateStaticParams() {
  const { posts } = await graphcms.request(URLLIST);
  return posts.map((post) => ({ 
      slug: post.slug
    }))

}

export async function fetchBlogs(slug) {
  const data = await graphcms.request(QUERY, { slug });
  // generateMetadata(data)
  const post = data.post;
  
  return post;
}

export default async function BlogPost({ params }) {
  const {slug} = params;
 
  const post = await fetchBlogs(slug);
  return (
    <>
      <main className={styles.blog}>
        <img
          className={styles.cover}
          src={post.thumbnail.url}
          alt={post.title}
        />
        <div className={styles.title}>
          <div className={styles.authdetails}>
            <img src={post.author.avatar.url} alt={post.author.name} />
            <div className={styles.authtext}>
              <h6>By {post.author.name} </h6>
              <h6 className={styles.date}>
                {moment(post.datePublished).format("MMMM Do, YYYY")}
              </h6>
            </div>
          </div>
          <h2>{post.title}</h2>
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        ></div>
      </main>
      <footer className={styles.footer}>
        <div>Blog Name {new Date().getFullYear()} by Michias Shiferaw</div>
      </footer>
    </>
  );
}
