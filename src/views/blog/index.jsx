import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import {MdEdit, MdCloudDownload} from 'react-icons/md/'


import "./styles.css";
class Blog extends Component {
  state = {
    blog: {},
    loading: true,
  };
  componentDidMount = async () => {
    const { id } = this.props.match.params;
    let res = await fetch(process.env.REACT_APP_API_URL + '/blogPost/' + id)
    let blog = await res.json()
    if (blog) {
      this.setState({ blog, loading: false });
    } else {
      this.props.history.push("/404");
    }
  }

  downloadPost = (e) => {
    try {
      // const request= fetch(process.env.REACT_APP_API_URL + 'blogPost/' + this.props.match.params.id)
      // console.log(request)
      window.location.replace(process.env.REACT_APP_API_URL + '/blogPost/download/' + this.props.match.params.id)
    } catch (error) {
      console.log(error)
    }
  }
  

  render() {
    const { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <div className="d-flex justify-content-between">
              <h1 className="blog-details-title">{blog.title}</h1>
              {blog.author.name === localStorage.getItem('name') ? <MdEdit style={{width: '32px', height: '32px', alignSelf: 'center'}}
                 onClick={()=> this.props.history.push(({
                  pathname: `/update/${blog._id}`,
                  state: { detail: this.state.blog }
                }))} /> : ''}
            </div>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
                <div onClick={(e)=> this.downloadPost(e)}>
                  <MdCloudDownload 
                  style={{width: '32px', height: '32px', alignSelf: 'center', cursor:'pointer'}}
                  />
                </div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
