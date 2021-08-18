import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
// import posts from "../../../data/posts.json";

// in post title, cover, author, _id


export default class BlogList extends Component {
  state = {
    posts: []
  }

  componentDidMount = async () =>{
    let res = await fetch(process.env.REACT_APP_PROD_API_URL + '/blogPost')
    let blogPosts = await res.json()
    console.log(blogPosts)
    this.setState({
        posts: [...blogPosts]
    })
}
  render() {
    return (
      <Row>
        {this.state.posts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post._id} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
