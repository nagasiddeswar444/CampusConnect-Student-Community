const API_URL = "http://localhost:5000/api/Blog";

export async function createBlog(
    blogData: any
) {

    const token =
        localStorage.getItem(
            "token"
        );

    const formData =
        new FormData();

    formData.append(
        "userId",
        blogData.userId
    );

    formData.append(
        "title",
        blogData.title
    );

    formData.append(
        "content",
        blogData.content
    );

    if (
        blogData.communityId
    ) {
        formData.append(
            "communityId",
            blogData.communityId
        );
    }

    if (
        blogData.attachmentFile
    ) {
        formData.append(
            "attachmentFile",
            blogData.attachmentFile
        );
    }

    const response =
        await fetch(
            `${API_URL}/create`,
            {
                method: "POST",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                },
                body: formData
            }
        );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to create blog"
        );
    }

    return data;
}

export async function getAllBlogs() {

    const response = await fetch(
        `${API_URL}/all`
    );

    const data = await response.json();

    return data;
}

export async function getBlogsByUser(
    userId: number
) {

    const response = await fetch(
        `${API_URL}/user/${userId}`
    );

    return await response.json();
}
export async function updateBlog(
    blogId: number,
    userId: number,
    title: string,
    content: string,
    attachmentFile?: File | null
) {

    const formData =
        new FormData();

    formData.append(
        "blogId",
        blogId.toString()
    );

    formData.append(
        "userId",
        userId.toString()
    );

    formData.append(
        "title",
        title
    );

    formData.append(
        "content",
        content
    );

    if (attachmentFile) {

        formData.append(
            "attachmentFile",
            attachmentFile
        );

    }

    const response =
        await fetch(
            `${API_URL}/update`,
            {
                method: "PUT",
                body: formData
            }
        );

    return await response.json();
}

export async function deleteBlog(
    blogId: number,
    userId: number
) {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/delete`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                blogId,
                userId
            })
        }
    );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Delete failed"
        );
    }

    return data;
}