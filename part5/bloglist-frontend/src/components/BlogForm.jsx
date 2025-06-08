import { useState } from 'react'

const BlogForm = ({ blogFormSubmitHandler }) => {
    /** blogFormSubmitHandler is function defined in App.jsx and passed to be called from the local handler */
    const initialFormData = {
        title: '',
        author: '',
        url: ''
    }
    const [blogFormData, setBlogFormData] = useState(initialFormData)  
    
    const handleBlogFormChange = (event) => {
        const { name, value } = event.target;
        setBlogFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const addBlog = async (event) => {
        event.preventDefault()
        await blogFormSubmitHandler(blogFormData)
        setBlogFormData(initialFormData)
    }

    return (
    <div>
        <form onSubmit={addBlog}>
            <div>
            Author
            <input
                type="text"
                name="author"
                value={blogFormData.author}
                onChange={handleBlogFormChange}
            />
            </div>

            <div>
            Title
            <input
                type="text"
                name="title"
                value={blogFormData.title}
                onChange={handleBlogFormChange}
            />
            </div>

            <div>
            URL
            <input
                type="text"
                name="url"
                value={blogFormData.url}
                onChange={handleBlogFormChange}
            />
            </div>

            <button type="submit">create</button>
        </form>
    </div>
    )
}
export default BlogForm