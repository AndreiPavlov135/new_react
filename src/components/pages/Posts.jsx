import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import { usePosts } from "../../hooks/usePosts";
import { getPageArry, getPageCount } from "../../utils/pages";
import PostService from "../API/PostService";
import PostFilter from "../PostFilter";
import PostForm from "../PostForm";
import PostList from "../PostList";
import MyButton from "../UI/Button/MyButton";
import Loader from "../UI/Loader/Loader";
import MyModal from "../UI/Modal/MyModal";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  let pagesArry = getPageArry(totalPages);

  const [fetchPosts, isPostsLoading, error] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPageCount(totalCount, limit));
    }
  );
  useEffect(() => {
    fetchPosts(limit, page);
  }, []);

  function changePage(page) {
    setPage(page);
    fetchPosts(limit, page);
  }

  function createPost(addPost) {
    setPosts([...posts, addPost]);
    setModal(false);
  }

  function removePost(post) {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {error && <h1>Ошибка: ${error}</h1>}
      {isPostsLoading ? (
        <Loader />
      ) : (
        <PostList
          remove={removePost}
          props={sortAndSearchPosts}
          title="Список постов"
        />
      )}
      <div className="page__wrapper">
        {pagesArry.map((p) => {
          return (
            <span
              onClick={() => changePage(p)}
              className={page === p ? "page page__current" : "page"}
              key={p}
            >
              {p}
            </span>
          );
        })}
      </div>
    </div>
  );
}
export default Posts;
