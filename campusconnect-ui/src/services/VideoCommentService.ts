const API_URL =
    "http://localhost:5000/api/VideoComment";

export async function addVideoComment(
    videoId: number,
    userId: number,
    commentText: string
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
                userId,
                commentText
            })
        }
    );

    return await response.json();
}

export async function getVideoComments(
    videoId: number
) {

    const response = await fetch(
        `${API_URL}/video/${videoId}`
    );

    return await response.json();
}