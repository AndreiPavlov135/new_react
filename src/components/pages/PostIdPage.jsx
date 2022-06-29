import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../UI/Loader/Loader";

export default function PostIdPage() {
  const params = useParams();
  //   console.log(params);
  const [post, setPost] = useState({});
  const [comment, setComment] = useState([]);
  const [fetchPostsById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchCommentsById, isComLoading, comError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsById(id);
      setComment(response.data);
    }
  );
  useEffect(() => {
    fetchPostsById(params.id);
    fetchCommentsById(params.id);
  }, []);

  return (
    <div>
      {error && <h1>Ошибка: ${error}</h1>}
      {isLoading ? (
        <Loader />
      ) : (
        <h1>
          {post.id}. {post.body}
        </h1>
      )}
      <h2>Комментарии: </h2>
      {comError && <h1>Ошибка: ${comError}</h1>}
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comment.map((comm) => {
            return (
              <div key={comm.id} style={{ marginTop: "15px" }}>
                <h5>{comm.email}</h5>
                <div>{comm.body}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
