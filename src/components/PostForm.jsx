import React, { useState } from "react";
import MyButton from "./UI/Button/MyButton";
import MyInput from "./UI/Input/MyInput";

export default function PostForm({ create }) {
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  function addNewPost(e) {
    e.preventDefault();
    const addPost = {
      ...newPost,
      id: Date.now(),
    };
    create(addPost);
    setNewPost({ title: "", body: "" });
  }

  return (
    <form>
      {/* управляемый компонент */}
      <MyInput
        type="text"
        placeholder="название"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      <MyInput
        type="text"
        placeholder="описание"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
      />
      <MyButton onClick={addNewPost}>Add</MyButton>
    </form>
  );
}
