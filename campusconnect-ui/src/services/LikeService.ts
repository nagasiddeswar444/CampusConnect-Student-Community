const API_URL = "http://localhost:5000/api/Like";

export async function addLike(
    blogId: number,
    userId: number
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
                userId
            })
        }
    );

    return await response.json();
}

export async function getLikeCount(
    blogId: number
) {
    const response = await fetch(
        `${API_URL}/count/${blogId}`
    );

    return await response.json();
}