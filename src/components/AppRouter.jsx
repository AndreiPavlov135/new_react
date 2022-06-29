import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../hooks/context";
import { pablicRoutes, privateRoutes } from "./Routers/router";
import Loader from "./UI/Loader/Loader";

export default function AppRouter() {
  const { isAuth, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <Loader></Loader>;
  }
  return isAuth ? (
    <Routes>
      {privateRoutes.map((r, i) => {
        return <Route path={r.path} element={r.element} key={i} />;
      })}
      {/* <Route path="/about" element={<About />} />
      <Route path="/error" element={<Error />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/" element={<Posts />} />
      <Route path="/posts/:id" element={<PostIdPage />} /> */}
      <Route path="*" element={<Navigate to="/posts" />} />
    </Routes>
  ) : (
    <Routes>
      {pablicRoutes.map((r, i) => {
        return <Route path={r.path} element={r.element} key={i} />;
      })}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
