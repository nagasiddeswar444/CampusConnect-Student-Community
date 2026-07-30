import {
    useEffect,
    useState
}
    from "react";

import "../styles/MyCommunities.css";

import {
    getMyCommunities
}
    from "../services/CommunityService";

import { useNavigate }
    from "react-router-dom";

function MyCommunities() {

    const [communities,
        setCommunities] =
        useState<any[]>([]);

    const navigate =
        useNavigate();

    useEffect(() => {

        const load =
            async () => {

                const userId =
                    Number(
                        localStorage.getItem(
                            "userId"
                        )
                    );

                const data =
                    await getMyCommunities(
                        userId
                    );

                setCommunities(
                    data
                );
            };

        load();

    }, []);

    return (

        <div className="dashboard-container">

            <button
                className="back-btn"
                onClick={() => navigate("/student")}
            >
                ← Back
            </button>

            <h1 className="community-page-title">
                My Communities
            </h1>

            <p className="community-page-subtitle">
                Communities you've joined. Open a community to view posts, videos and discussions.
            </p>

            {
                communities.length === 0
                    ? (

                        <div className="empty-card">
                            You have not joined any community
                        </div>

                    )

                    :

                    communities.map(
                        (
                            community: any
                        ) => (

                            <div
                                key={community.communityId}
                                className="community-card"
                            >

                                <div className="community-card-header">

                                    <div>

                                        <h3>{community.communityName}</h3>

                                        <span className="community-badge">
                                            Joined Community
                                        </span>

                                    </div>

                                    <button
                                        className="join-community-btn"
                                        onClick={() =>
                                            navigate(`/community/${community.communityId}`)
                                        }
                                    >
                                        Open Community →
                                    </button>

                                </div>

                                <p className="community-description">
                                    {community.description}
                                </p>

                            </div>

                        )
                    )
            }

        </div>

    );
}

export default MyCommunities;