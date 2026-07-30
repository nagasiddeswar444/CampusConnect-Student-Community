const API_URL =
    "http://localhost:5000/api/Community";

export async function createCommunity(
    community: any
) {

    const response =
        await fetch(
            `${API_URL}/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify(
                    community
                )
            }
        );

    return await response.json();
}

export async function getApprovedCommunities() {

    const response =
        await fetch(
            `${API_URL}/approved`
        );

    return await response.json();
}


export async function joinCommunity(
    communityId: number,
    userId: number
) {

    const response =
        await fetch(
            `${API_URL}/join`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    communityId,
                    userId
                })
            }
        );

    return await response.json();
}

export async function getMyCommunities(
    userId: number
) {

    const response =
        await fetch(
            `${API_URL}/my/${userId}`
        );

    return await response.json();
}


export async function getCommunity(
    communityId: number
) {

    const response =
        await fetch(
            `${API_URL}/${communityId}`
        );

    return await response.json();
}


export async function isCommunityMember(
    communityId: number,
    userId: number
) {

    const response =
        await fetch(
            `${API_URL}/member?communityId=${communityId}&userId=${userId}`
        );

    return await response.json();
}


export async function getCommunityBlogs(
    communityId: number
) {

    const response =
        await fetch(
            `${API_URL}/${communityId}/blogs`
        );

    return await response.json();
}

export async function getCommunityVideos(
    communityId: number
) {

    const response =
        await fetch(
            `${API_URL}/${communityId}/videos`
        );

    return await response.json();
}

export async function
    getCommunityMemberCount(
        communityId: number
    ) {

    const response =
        await fetch(
            `${API_URL}/${communityId}/members/count`
        );

    return await response.json();
}



export async function
    leaveCommunity(
        communityId: number,
        userId: number
    ) {

    const response =
        await fetch(
            `${API_URL}/leave?communityId=${communityId}&userId=${userId}`,
            {
                method: "DELETE"
            }
        );

    return await response.json();
}

