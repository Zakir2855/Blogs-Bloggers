import axios from "axios";
import { useEffect, useState } from "react";
import { ArticlesResponse } from "../type/interface";
import defaultImage from "../assets/default_blog_img.png";
import { useNavigate } from "react-router-dom";
import Comments from "./comment";
import Cookies from "js-cookie";
import blogImage from "../assets/Blog_loggo.webp"

export default function DashBoard() {
  let imgArr=["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbn2FJsQwjfYeStH7qpNPxabcJRNHsmRcQ4w&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNurxr-BdGwZ47SPJOL92RyxYkD41rFoO0JQ&s","https://www.codecademy.com/resources/blog/wp-content/uploads/2022/12/programming-languages.png","https://cdn.prod.website-files.com/5f2b1efb0f881760ffdc5c96/63c12849a1c7e9df64c819fc_programming-languages-shutterstock-1680857539.webp","https://blogs.bmc.com/wp-content/uploads/2021/05/Top-Programming-Languages.png"];
  const [articles, setArticles] = useState<ArticlesResponse>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(()=>{
    console.log(error)
  },[error]);

  // User ID from cookies 
  const UserId = Cookies.get("userId") || "";

  // State for re-rendering after like
  const [render, setRender] = useState(false);

  // State to track which comment section is open
  const [commentSec, setCommentSec] = useState<string | null>(null);

  const navigate = useNavigate();

  // Fetch articles
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/article/v1/getPosts")
      .then((res) => {
        setArticles(res.data.response);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again later.");
      });
  }, [render]);

  // Handle like button color
  function handleLikeColor(likes:any, id: string) {
    return (
      <button
        style={{ color: likes.includes(UserId) ? "red" : "greenyellow" }}
        onClick={() => handleLike(id)}
      >
        Like
      </button>
    );
  }

  // Handle comment section toggle
  function handleCommentSection(id: string) {
    setCommentSec((prev) => (prev === id ? null : id));
  }

  // Like function
  function handleLike(id: string) {
    fetch(`http://localhost:3001/api/like/v1/hitLike/${id}`, {
      method: "POST",
      credentials: "include", // This is to include cookies in our request
    })
      .then((res) => res.json())
      .then(() => setRender((prev) => !prev)) //to re-render for changes
      .catch((err) => console.error("Error liking post:", err));
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!articles || articles.length === 0) {
    return <h1>No articles found. Please try again later.</h1>;
  }

  return (
    <>
      <header>
        <div className="logo_flex">
          <img src={blogImage} alt="" />
        </div>
        <h1>Blogs & Bloggers</h1>
        <div className="Profile">
          <button onClick={() => navigate("/profile")}>Profile</button>
        </div>
        <div className="blog_creator">
          <h2>Create Blog</h2>
          <button onClick={() => navigate("/createBlog")}>Create</button>
        </div>
      </header>
      <main>
        
        {articles.map((article,index) => (
          <div className="single_article" key={article._id}>
            <div className="article_image">
            <img
        src={imgArr[index] || imgArr[imgArr.length - 1]} 
        alt="Blog Image"
      />
            </div>
            <h2 className="article_title">{article.article_title}</h2>
            <p className="article_description">{article.article_description}</p>
            <h3>
              By {article.user.first_name} {article.user.last_name}
            </h3>

            {/* Like Button handling */}
            {handleLikeColor(article.likes, article._id)}

            {/* Comments Button */}
            <button onClick={() => handleCommentSection(article._id)} className="comment">
              Comments
            </button>

            {/* comment sec condition */}
            {commentSec === article._id && (
              <div className="comments_div">
                <Comments id={article._id} />
              </div>
            )}
          </div>
        ))}
      </main>
    </>
  );
}
