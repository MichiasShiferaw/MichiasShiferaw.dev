import Link from "next/link";
import styles from './BlogCard.module.css';
import moment from "moment";
import Image from "next/image";

function BlogPost({ title, author, thumbnail, datePublished, slug }) {
  return (
    <div className={styles.card}>
      <Link href={`/blog/${slug}`}>
        <div className={styles.imgContainer}>
          <img layout="fill" src={thumbnail.url} alt="" />
        </div>
      </Link>
      <div className={styles.text}>
        <h2>{title}</h2>
        <div className={styles.details}>
          <div className={styles.author}>
            <img src={author.avatar.url} alt={author.name} />
            <h3 className={styles.authorName}>{author.name}</h3>
          </div>
          <div className={styles.date}>
            <h3>{moment(datePublished).format("MMMM Do, YYYY")}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogPost;