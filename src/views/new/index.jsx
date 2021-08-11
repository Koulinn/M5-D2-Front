import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      cover: "linkurl hardcoded",
      readTime: {
        value: 2,
        unit: "minute"
      },
      author: {
        name: "hardCoded",
        avatar: "hardCoded"
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value, bodyContent) {
    this.setState({
      ...this.state,
      [bodyContent]: value
    });
    console.log(value)
  }

  sendForm = async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:3001/blogPost", {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const result = await res.json()
    console.log(result)

    
  }



  render() {
    return (
      <Container className="new-blog-container">
        <Form onSubmit={this.sendForm} className="mt-5">
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control size="lg" placeholder="Title" onChange={(event) => this.handleChange(event.target.value, 'title')} />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control size="lg" as="select" onChange={(event) => this.handleChange(event.target.value, 'category')}>
              <option value="cat1">Category1</option>
              <option value="cat2">Category2</option>
              <option value="cat3">Category3</option>
              <option value="cat4">Category4</option>
              <option value="cat5">Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              value={this.state.content}
              // onChange={this.handleChange}
              onChange={(value) => this.handleChange(value, 'content')}
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
