const API_URL = "http://localhost:5000/api/Comment";

export async function addComment(
    blogId: number,
    userId: number,
    commentText: string,
    parentCommentId: number | null = null
) {

    const response = await fetch(
        `${API_URL}/add`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                blogId,
                userId,
                commentText,
                parentCommentId
            })
        }
    );

    return await response.json();
}

export async function getCommentsByBlog(
    blogId: number
) {

    const response = await fetch(
        `${API_URL}/blog/${blogId}`
    );

    return await response.json();
}