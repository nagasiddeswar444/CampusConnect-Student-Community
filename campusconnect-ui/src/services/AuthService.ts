const API_URL = "http://localhost:5000/api/Auth";

export async function registerUser(userData: any) {

    const response = await fetch(
        `${API_URL}/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Registration Failed");
    }

    return data;
}

export async function loginUser(loginData: any) {

    const response = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login Failed");
    }

    return data;
}

export async function uploadProfilePhoto(
    userId: number,
    profileImage: File
) {

    const formData = new FormData();

    formData.append(
        "userId",
        userId.toString()
    );

    formData.append(
        "profileImage",
        profileImage
    );

    const response = await fetch(
        `${API_URL}/upload-profile-photo`,
        {
            method: "POST",
            body: formData
        }
    );

    return await response.json();
}

export async function getProfile(
    userId: number
) {

    const response = await fetch(
        `${API_URL}/profile/${userId}`
    );

    return await response.json();
}

export async function updateProfile(
    userId: number,
    fullName: string,
    department: string,
    yearOfStudy: number
) {

    const response = await fetch(
        `${API_URL}/update-profile`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId,
                fullName,
                department,
                yearOfStudy
            })
        }
    );

    const data =
        await response.json();

    if (!response.ok) {

        throw new Error(
            data.message ||
            "Failed to update profile"
        );
    }

    return data;
}


export async function createPassword(data: any) {

    const response = await fetch(
        `${API_URL}/create-password`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}



export async function forgotPassword(data: any) {

    const response = await fetch(
        `${API_URL}/forgot-password`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result =
        await response.json();

    if (!response.ok) {

        throw new Error(
            result.message
        );

    }

    return result;
}


export async function resetPassword(data: any) {

    const response = await fetch(
        `${API_URL}/reset-password`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message);
    }

    return result;
}