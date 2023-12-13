import React, { useState } from "react";
import PostCards from "./components/PostCards";
import { useGetPostQuery, useNewPostMutation } from "./redux/api";

const App = () => {
  const newPost = useNewPostMutation()[0]
  const { isLoading, data } = useGetPostQuery("");

  // const [formData, setFormData] = useState<Post>({
  //   title: "",
  //   body: "",
  // });

  
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");



  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
    // setFormData((prev) => ({
    //   // ...prev,
    //   [e.target.name]: e.target.value,
    // }));
  // };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const post:Post = {
      // title: formData.title,
      // body: formData.body,
      title,
      body,
      id: Math.random() * 1000,
      userId: Math.random() * 1000
    }

    newPost(post)
    setTitle('')
    setBody('')
  };


  console.log(isLoading, data);

  return (
    <div>
      <h1>My APP</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Body"
          // value={formData.body}
          // onChange={handleChange}
          value={body}
          onChange={(e)=>setBody(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data?.map((item) => <PostCards key={item.id} post={item} />)
      )}
    </div>
  );
};

export default App;
