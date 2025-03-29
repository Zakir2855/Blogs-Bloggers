import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Cookies from "js-cookie";

interface BlogData {
  article_title: string;
  article_description: string;
  user: string;
  article_image: string | null; 
  tags: string;
}

export default function BlogCreator() {
  const userId = Cookies.get("userId") || "";

  const [blog, setBlog] = useState<BlogData>({
    article_title: "",
    article_description: "",
    user: userId,
    article_image: null,
    tags: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setBlog((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlog((prevState) => ({
          ...prevState,
          article_image: reader.result as string, // Convert to Base64 from ai
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  async function createBlog(e: FormEvent) {
    e.preventDefault();

    if (!blog.article_title || !blog.article_description || !userId) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/article/v1/createArticle", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        throw new Error(errorData.message || "Failed to create blog");
      }

      alert("Blog created successfully!");
      setBlog({
        article_title: "",
        article_description: "",
        user: userId,
        article_image: null,
        tags: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating blog");
    }
  }

  return (
    <div className="blog_creator_div">
      <h1>Create your blog here</h1>
      <form onSubmit={createBlog}>
        <input
        className="article_title"
          type="text"
          name="article_title"
          value={blog.article_title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
        className="blog_description"
          name="article_description"
          value={blog.article_description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
        className="article_image" type="file" name="article_image" accept="image/*" onChange={handleFileChange} />
        <input
        className="article_tags"
          type="text"
          name="tags"
          value={blog.tags}
          onChange={handleChange}
          placeholder="Tags (comma-separated)"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
