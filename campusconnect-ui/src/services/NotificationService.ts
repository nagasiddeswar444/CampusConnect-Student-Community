const API_URL =
    "http://localhost:5000/api/Notification";

export async function getNotifications(
    userId: number
) {

    const response =
        await fetch(
            `${API_URL}/user/${userId}`
        );

    return await response.json();
}

export async function markAsRead(
    notificationId: number
) {

    await fetch(
        `${API_URL}/read/${notificationId}`,
        {
            method: "PUT"
        }
    );
}