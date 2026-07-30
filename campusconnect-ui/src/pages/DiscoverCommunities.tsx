import {
    useEffect,
    useState
}
    from "react";

import { useNavigate } from "react-router-dom";

import {
    getApprovedCommunities,
    joinCommunity
}
    from "../services/CommunityService";

import "../styles/DiscoverCommunities.css";

function DiscoverCommunities() {

    const navigate = useNavigate();

    const [communities,
        setCommunities] =
        useState<any[]>([]);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] =
        useState<"success" | "info">("success");

    const loadCommunities =
        async () => {

            const data =
                await getApprovedCommunities();

            setCommunities(
                data
            );
        };

    useEffect(() => {

        loadCommunities();

    }, []);

    const handleJoin = async (
        communityId: number
    ) => {

        const userId =
            Number(localStorage.getItem("userId"));

        try {

            const response =
                await joinCommunity(
                    communityId,
                    userId
                );

            setMessage(response.message);

            if (response.success)
                setMessageType("success");
            else
                setMessageType("info");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            setTimeout(() => {
                setMessage("");
            }, 3000);

        }
        catch {

            setMessage("Something went wrong.");

            setMessageType("info");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };

    return (

        <div className="dashboard-container discover-page">

            <button
                className="back-btn"
                onClick={() => navigate("/student")}
            >
                ← Back
            </button>

            <h1 className="community-page-title">
                Discover Communities
            </h1>

            <p className="community-page-subtitle">
                Explore communities created by students and collaborate with people who share your interests.
            </p>

            {
                message && (

                    <div
                        className={
                            messageType === "success"
                                ? "success-message"
                                : "info-message"
                        }
                    >
                        {message}
                    </div>

                )
            }

            {
                communities.length === 0
                    ? (

                        <div className="empty-card">

                            <h2>👥 No Communities Found</h2>

                            <p>
                                There are currently no approved communities available.
                            </p>

                            <p>
                                Check back later or create your own community.
                            </p>

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

                                        <span className="community-author">
                                            👤 {community.fullName}
                                        </span>

                                    </div>

                                    <div className="community-badge">
                                        👥 Community
                                    </div>

                                </div>

                                <p className="community-description">
                                    {community.description}
                                </p>

                                <div className="community-footer">

                                    <button
                                        className="join-community-btn"
                                        onClick={() =>
                                            handleJoin(
                                                community.communityId
                                            )
                                        }
                                    >
                                        Join Community
                                    </button>

                                </div>

                            </div>

                        )
                    )
            }

        </div>

    );
}

export default DiscoverCommunities;