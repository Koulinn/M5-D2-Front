import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
import { Alert } from 'react-bootstrap';
import { withRouter } from "react-router";

class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      hideAlert: false,
      blogPostImg: null,
      bodyPost: {
        content: "",
        cover: "",
        category: "Art",
        readTime: {
          value: 2,
          unit: "minute"
        },
        author: {
          name: localStorage.getItem("name"),
          avatar: localStorage.getItem("avatar")
        }

      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlogCover = this.handleBlogCover.bind(this)
  }

  handleChange(value, bodyContent) {
    this.setState({
      ...this.state,
      bodyPost: {
        ...this.state.bodyPost,
        [bodyContent]: value
      }
    });
  }

  handleError(errorValue) {
    this.setState({
      ...this.state,
      error: errorValue
    });
  }


  handleBlogCover(file) {
    let form = new FormData()
    form.append('blogPostImg', file)
    this.setState({
      blogPostImg: form,
      error: false,
      bodyPost: {
        ...this.state.bodyPost
      }

    });
  }

  resetState() {
    this.setState({
      error: null,
      hideAlert: true,
      blogPostImg: null,
      bodyPost: {
        content: "",
        cover: "",
        title: "",
        category: "Art",
        readTime: {
          value: 2,
          unit: "minute"
        },
        author: {
          name: localStorage.getItem("name"),
          avatar: localStorage.getItem("avatar")
        }

      }
    });
  }




  sendForm = async (e) => {
    e.preventDefault()
    try {

      if (this.state.blogPostImg) {

        const res = await fetch(process.env.REACT_APP_API_URL + "/blogPost", {
          method: 'POST',
          body: JSON.stringify(this.state.bodyPost),
          headers: {
            "Content-Type": "application/json"
          }
        })

        const result = await res.json()
        await this.sendBlogCover(result.id)
      } else {
        this.handleError(true)
      }
    } catch (error) {
      console.log(error)
    }

  }
  sendBlogCover = async (postId) => {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/blogPost/" + postId + '/uploadCover', {
        method: 'POST',
        body: this.state.blogPostImg,
      })
      const result = await res.json()
      if (result.uploaded) {
        this.resetState()
        setTimeout(() => {
          this.props.history.push("/")
      }, 2000)
      }

    } catch (error) {
      console.log(error)
    }
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
              <option value="art">Art</option>
              <option value="games">Games</option>
              <option value="cakes">Cakes</option>
              <option value="code">Code</option>
              <option value="others">Other stuff</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              value={this.state.bodyPost.content}
              // onChange={this.handleChange}
              onChange={(value) => this.handleChange(value, 'content')}
              className="new-blog-content"
            />
          </Form.Group>
          <Form.Group controlId="blog-cover" className="mt-3">

            <Form.File
              id="cover"
              label="Blog Cover"
              onChange={(e) => this.handleBlogCover(e.target.files[0])}

            />

          </Form.Group>
          {this.state.hideAlert && <Alert variant="success"> <Alert.Heading>Blog posted successfully</Alert.Heading></Alert>}
          {this.state.error && <Alert variant="danger"> <Alert.Heading>You must add an image to your post</Alert.Heading></Alert>}

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


export default withRouter(NewBlogPost)