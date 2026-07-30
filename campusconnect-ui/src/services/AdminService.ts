const API_URL =
    "http://localhost:5000/api/Admin";

export async function getPendingStudents() {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/pending-students`,
        {
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );

    return await response.json();
}

export async function approveStudent(
    userId: number
) {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/approve-student/${userId}`,
        {
            method: "PUT",
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );

    return await response.json();
}

export async function rejectStudent(
    userId: number
) {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/reject-student/${userId}`,
        {
            method: "PUT",
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );

    return await response.json();
}

export async function getPendingBlogs() {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/pending-blogs`,
        {
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );

    return await response.json();
}

export async function approveBlog(
    blogId: number
) {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/approve-blog/${blogId}`,
        {
            method: "PUT",
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );

    return await response.json();
}

export async function rejectBlog(
    blogId: number
) {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/reject-blog/${blogId}`,
        {
            method: "PUT",
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );

    return await response.json();
}

export async function getPendingVideos() {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/pending-videos`,
        {
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );

    return await response.json();
}

export async function approveVideo(
    videoId: number
) {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/approve-video/${videoId}`,
        {
            method: "PUT",
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );

    return await response.json();
}

export async function rejectVideo(
    videoId: number
) {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/reject-video/${videoId}`,
        {
            method: "PUT",
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );

    return await response.json();
}

export async function getAllAdminBlogs() {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/blogs`,
        {
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );

    return await response.json();
}

export async function deleteAdminBlog(
    blogId: number
) {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/blog/${blogId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );

    return await response.json();
}

export async function getAllAdminVideos() {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/videos`,
        {
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );

    return await response.json();
}

export async function getPendingCommunities() {

    const token =
        localStorage.getItem("token");

    const response =
        await fetch(
            `${API_URL}/pending-communities`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return await response.json();
}

export async function approveCommunity(
    communityId: number
) {

    const token =
        localStorage.getItem("token");

    const response =
        await fetch(
            `${API_URL}/approve-community/${communityId}`,
            {
                method: "PUT",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return await response.json();
}

export async function rejectCommunity(
    communityId: number
) {

    const token =
        localStorage.getItem("token");

    const response =
        await fetch(
            `${API_URL}/reject-community/${communityId}`,
            {
                method: "PUT",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return await response.json();
}

export async function deleteAdminVideo(
    videoId: number
) {

    const token =
        localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/video/${videoId}`,
        {
            method: "DELETE",
            headers: {
                "Authorization":
                    `Bearer ${token}`
            }
        }
    );

    return await response.json();
}