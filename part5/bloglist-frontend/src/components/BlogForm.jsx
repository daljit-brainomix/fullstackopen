const BlogForm = ({ formData, handleFormChange, handleFormSubmit }) => (
    <div>
        <form onSubmit={handleFormSubmit}>
            <div>
            Author
            <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleFormChange}
            />
            </div>

            <div>
            Title
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
            />
            </div>

            <div>
            URL
            <input
                type="text"
                name="url"
                value={formData.url}
                onChange={handleFormChange}
            />
            </div>

            <button type="submit">create</button>
        </form>
    </div>
)

export default BlogForm