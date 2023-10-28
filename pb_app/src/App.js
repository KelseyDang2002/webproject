import Login from "Login";
import CreateAccount from "CreateAccount";
import Home from "Home";
import SearchCate from "SearchCate";
import CreateCate from "CreateCate";
import ViewCate from "ViewCate";
import CreatePost from "CreatePost";
import CreateComment from "CreateComment";

export default function App() {
  if (localStorage.getItem("currentPage") === null) {
    localStorage.setItem("currentPage", "Login");
  }

  if (localStorage.getItem("currentPage") === "Login") {
    return (
      <>
        <Login/>
      </>
    );
  }

  else if (localStorage.getItem("currentPage") === "CreateAccount") {
    return (
      <>
        <CreateAccount />
      </>
    )
  }

  else if (localStorage.getItem("currentPage") === "SearchCate") {
    return (
      <>
        <SearchCate />
      </>
    )
  }

  else if (localStorage.getItem("currentPage") === "CreateCate") {
    return (
      <>
        <CreateCate />
      </>
    )
  }

  else if (localStorage.getItem("currentPage") === "ViewCate") {
    return (
      <>
        <ViewCate />
      </>
    )
  }

  else if (localStorage.getItem("currentPage") === "CreatePost") {
    return (
      <>
        <CreatePost />
      </>
    )
  }

  else if (localStorage.getItem("currentPage") === "CreateComment") {
    return (
      <>
        <CreateComment />
      </>
    )
  }
}
