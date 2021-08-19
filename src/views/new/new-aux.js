export const deletePost = async (event, postId) =>{
    try {
        event.preventDefault()
       const res =  await fetch(`http://localhost:3003/blogPost/${postId}`,{
           method: 'DELETE'
       })
       if(res.status === 204){
           return true
       } else {
           return false
       }
           } catch (error) {
        console.log(error)
    }
}