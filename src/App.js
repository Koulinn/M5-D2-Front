import React from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import SignupForm from "./views/signUp"
import SignIn from "./views/signIn/SignIn";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import {useState} from 'react'

function App() {
  const [isLogged, setIsLogged] = useState(false)
  return (
    <BrowserRouter>
      <NavBar isLogged={isLogged} />
      <Route exact path="/">
         <Redirect to="/signIn" />
      </Route>
      
      <Route path="/signIn" exact render={()=><SignIn setIsLogged={setIsLogged}/>} />
      <Route path="/home" exact component={Home} />
      <Route path="/blog/:id" exact component={Blog} />
      <Route path="/new" exact component={NewBlogPost} />
      <Route path="/update/:id" exact component={NewBlogPost} />
      <Route path="/register" exact component={SignupForm} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
