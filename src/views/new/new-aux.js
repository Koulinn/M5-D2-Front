export const deletePost = async (event, postId) =>{
    try {
        event.preventDefault()
       const res =  await fetch(`http://localhost:3003/blogPost/${postId}`,{
           method: 'DELETE'
       })
       console.log(res, 'from delete')
    } catch (error) {
        console.log(error)
    }
}