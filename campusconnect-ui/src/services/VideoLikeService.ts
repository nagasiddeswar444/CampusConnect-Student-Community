const API_URL =
    "http://localhost:5000/api/VideoLike";

export async function addVideoLike(
    videoId: number,
    userId: number
) {

    const response = await fetch(
        `${API_URL}/add`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                videoId,
                userId
            })
        }
    );

    return await response.json();
}

export async function getVideoLikeCount(
    videoId: number
) {

    const response = await fetch(
        `${API_URL}/count/${videoId}`
    );

    return await response.json();
}