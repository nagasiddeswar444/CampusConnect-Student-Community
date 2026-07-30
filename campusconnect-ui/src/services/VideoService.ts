const API_URL =
    "http://localhost:5000/api/Video";

export async function uploadVideo(
    userId: number,
    title: string,
    description: string,
    videoFile: File,
    communityId?: number
) {

    const formData = new FormData();

    formData.append(
        "userId",
        userId.toString()
    );

    if (
        communityId
    ) {
        formData.append(
            "communityId",
            communityId.toString()
        );
    }

    formData.append(
        "title",
        title
    );

    formData.append(
        "description",
        description
    );

    formData.append(
        "videoFile",
        videoFile
    );

    const response = await fetch(
        `${API_URL}/upload`,
        {
            method: "POST",
            body: formData
        }
    );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message
        );

    }

    return data;
}

export async function getAllVideos() {

    const response = await fetch(
        `${API_URL}/all`
    );

    return await response.json();
} 

export async function getVideosByUser(
    userId: number
) {

    const response = await fetch(
        `${API_URL}/user/${userId}`
    );

    return await response.json();
}

export async function updateVideo(
    videoId: number,
    userId: number,
    title: string,
    description: string
) {

    const response = await fetch(
        `${API_URL}/update`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                videoId,
                userId,
                title,
                description
            })
        }
    );

    return await response.json();
}

export async function deleteVideo(
    videoId: number,
    userId: number
) {

    const response = await fetch(
        `${API_URL}/delete`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                videoId,
                userId
            })
        }
    );

    return await response.json();
}