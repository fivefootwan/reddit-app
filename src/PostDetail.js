import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { subreddit, postId } = useParams(); // ✅ get from URL
  const [post, setPost] = useState(null); // ✅ store post info
  const [comments, setComments] = useState([]); // ✅ store comments
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const res = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`);
        if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);
        const data = await res.json();

        setPost(data[0].data.children[0].data); // ✅ main post
        setComments(data[1].data.children.map(c => c.data)); // ✅ list of comments
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [subreddit, postId]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="Error">{error}</p>;

  return (
    <div className="PostDetail">
      <p>{post.subreddit_name_prefixed}</p>
      <h2>{post.title}</h2>
      <p>{post.ups} 👍🏻 | {post.num_comments} 💬 comments</p>
      <div className="Comments">
        {comments.map((comment, i) => (
          <div key={i}>
            <p><strong>{comment.author}</strong>: {comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;
