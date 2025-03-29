import { ChangeEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Comment {
  _id: string;
  comment: string;
  user: any;
  article: string | null;
}

interface CommentsProps {
  id: string;
}

export default function Comments({ id }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");

  // Handling input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  // Creating a new comment
  const createComment = async () => {
    if (!comment.trim()) return;

    const commentDetails = {
      comment: comment,
      user: Cookies.get("userId") || "Anonymous",
      article: id,
    };

    try {
      await fetch(`http://localhost:3001/api/comment/v1/createComment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentDetails),
      })
        .then((res) => {
          console.log(res);
         
          setComment(""); // Clearing input field after successful comment
      fetchComments(); //this is to Refreh comments after posting
        })
        .catch((err) => console.log(err));

      
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // Fetching comments from server
  const fetchComments = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/comment/v1/getComments/${id}`
      );
      const data = await res.json();
      console.log(data, "<<<<<<<<<<<<<<<<<<<<<<");
      if (!res.ok) throw new Error(data.message || "Failed to fetch comments");

      setComments(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]); 
    }
  };

  
  useEffect(() => {
    fetchComments();
  }, [id]);

  return (
    <div className="comment_section">
      <input
        type="text"
        placeholder="Write a comment..."
        value={comment}
        onChange={handleChange}
      />
      <button onClick={createComment}>post&gt;</button>

      <div className="comments">
        {comments.length > 0 ? (
          comments.map((item) => <div className="comments_div" key={item._id}><h6>by {item.user.first_name}</h6><p>{item.comment}</p></div>)
        ) : (
          <div className="comments_div"><h1 style={{color:"black"}}>No Comments yet.</h1></div>
        )}
      </div>
    </div>
  );
}
