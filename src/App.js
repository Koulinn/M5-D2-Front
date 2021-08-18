import React from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import SignupForm from "./views/signUp"
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/blog/:id" exact component={Blog} />
      <Route path="/new" exact component={NewBlogPost} />
      <Route path="/update/:id" exact component={NewBlogPost} />
      <Route path="/register" exact component={SignupForm} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
