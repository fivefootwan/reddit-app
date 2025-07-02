import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import './PostDetail.css';

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
      
      <h2 className='Post-Title'>{post.title}</h2>

      <div className="OP-Content">
        {post.selftext ? (
          <p>{post.selftext}</p>  // ✅ Show text if present
        ) : (
          // ✅ If no text, check for media
          <>
            {post.url && (post.url.endsWith('.jpg') || post.url.endsWith('.png') || post.url.endsWith('.gif')) && (
              <img src={post.url} alt="Post media" className="Post-Media" />
            )}

            {post.url && post.url.includes('v.redd.it') && (
              <video controls className="Post-Media">
                <source src={post.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </>
        )}
      </div>

      <p className='Post-Detail'>
        {post.subreddit_name_prefixed} | {post.ups} 👍🏻 | {post.num_comments} 💬 comments | <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer"> {/* 👉 Link to Reddit page */}
        View on Reddit
      </a></p>

      <div className="Comments">
        {comments
        .filter(comment => comment.body)
        .map((comment, i) => (
          <div key={i}>
            <p className='Comment'><strong>{comment.author}</strong>: {comment.body}</p>
            <hr className='Comment-Divider'></hr>
          </div>
        ))}
      </div>


    </div>
  );
};

export default PostDetail;
