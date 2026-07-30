import {
    useEffect,
    useState
}



    from "react";

import "../styles/CommunityHome.css";

import Linkify from "react-linkify";

import {
    useNavigate,
    useParams,
    useLocation
}
    from "react-router-dom";
import {
    getCommunity,
    isCommunityMember,
    getCommunityBlogs,
    getCommunityVideos,
    getCommunityMemberCount,
    leaveCommunity
}
    from "../services/CommunityService";

function CommunityHome() {

    const { communityId } =
        useParams();

    const navigate =
        useNavigate();

    const location =
        useLocation();

    const [successMessage,
        setSuccessMessage] =
        useState("");

    const [showLeaveModal, setShowLeaveModal] =
        useState(false);

    const [community,
        setCommunity] =
        useState<any>(null);

    const [blogs,
        setBlogs] =
        useState<any[]>([]);

    const [videos,
        setVideos] =
        useState<any[]>([]);

    const [loading,
        setLoading] =
        useState(true);

    const [memberCount,
        setMemberCount] =
        useState(0);

    useEffect(() => {

        loadCommunity();

    }, [communityId]);

    useEffect(() => {

        if (
            location.state?.message
        ) {

            setSuccessMessage(
                location.state.message
            );

            setTimeout(
                () =>
                    setSuccessMessage(""),
                5000
            );
        }

    }, [location.state]);

    const loadCommunity =
        async () => {

            const userId =
                Number(
                    localStorage.getItem(
                        "userId"
                    )
                );

            const member =
                await isCommunityMember(
                    Number(communityId),
                    userId
                );

            if (!member) {

                alert(
                    "You are not a member of this community"
                );

                navigate(
                    "/my-communities"
                );

                return;
            }

            const communityData =
                await getCommunity(
                    Number(
                        communityId
                    )
                );

            const count =
                await getCommunityMemberCount(
                    Number(
                        communityId
                    )
                );

            setMemberCount(
                count
            );

            const blogData =
                await getCommunityBlogs(
                    Number(
                        communityId
                    )
                );

            const videoData =
                await getCommunityVideos(
                    Number(
                        communityId
                    )
                );

            setCommunity(
                communityData
            );

            setBlogs(
                blogData
            );

            setVideos(
                videoData
            );

            setLoading(
                false
            );
        };

    if (loading) {

        return (
            <div className="dashboard-container">
                Loading...
            </div>
        );
    }


    const handleLeaveCommunity =
        async () => {

            const userId =
                Number(
                    localStorage.getItem(
                        "userId"
                    )
                );

            await leaveCommunity(
                Number(
                    communityId
                ),
                userId
            );

            navigate(
                "/my-communities"
            );
        };

    return (

        <div className="dashboard-container">

            <div className="community-home-page">

            <button
                className="back-btn"
                onClick={() => navigate("/my-communities")}
            >
                ← Back
            </button>

            <div className="community-header">

                <div className="community-left">

                    <h1 className="community-title">
                        👥 {community.communityName}
                    </h1>

                    <p className="community-description">
                        {community.description}
                    </p>

                    <div className="community-stats">

                        <div className="community-chip">

                            <small>OWNER</small>

                            <span>👑 {community.fullName}</span>

                        </div>

                        <div className="community-chip">

                            <small>MEMBERS</small>

                            <span>👥 {memberCount}</span>

                        </div>

                    </div>

                </div>

                {
                    Number(localStorage.getItem("userId")) === community.createdBy && (

                        <span className="owner-badge">
                            👑 You are Owner
                        </span>

                    )
                }

            </div>

            <div className="community-actions">

                <button
                        className="community-btn"
                    onClick={() =>
                        navigate(`/community/${communityId}/create-blog`)
                    }
                >
                    ✍ Create Blog
                </button>

                <button
                        className="community-btn"
                    onClick={() =>
                        navigate(`/community/${communityId}/upload-video`)
                    }
                >
                    🎥 Upload Video
                </button>

                <button
                    className="leave-btn"
                    onClick={() =>
                        setShowLeaveModal(true)
                    }
                >
                    🚪 Leave Community
                </button>

            </div>

                <div className="community-section">

                <h2>
                    Community Blogs
                </h2>

                {
                    blogs.length === 0
                        ? (
                            <div className="empty-card">
                                No Blogs Yet
                            </div>
                        )
                        :
                        blogs.map(
                            (
                                blog: any
                            ) => (

                                <div
                                    key={
                                        blog.blogId
                                    }
                                    className="blog-card"
                                >

                                    <h3>
                                        {blog.title}
                                    </h3>

                                    <Linkify
                                        componentDecorator={(
                                            href: string,
                                            text: string,
                                            key: number
                                        ) => (
                                            <a
                                                href={href}
                                                key={key}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: "#60a5fa"
                                                }}
                                            >
                                                {text}
                                            </a>
                                        )}
                                    >
                                        <p>
                                            {blog.content}
                                        </p>
                                    </Linkify>


                                    {
                                        blog.attachmentPath && (

                                            <div
                                                className="attachment-box"
                                            >

                                                <a
                                                    href={
                                                        `http://localhost:5000/${blog.attachmentPath}`
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    📎 {blog.attachmentName}
                                                </a>

                                            </div>

                                        )
                                    }

                                    <small>
                                        By {blog.fullName}
                                    </small>

                                </div>

                            )
                        )
                }

            </div>

                <div className="community-section">

                <h2>
                    Community Videos
                </h2>

                {
                    videos.length === 0
                        ? (
                            <div className="empty-card">
                                No Videos Yet
                            </div>
                        )
                        :
                        videos.map(
                            (
                                video: any
                            ) => (

                                <div
                                    key={
                                        video.videoId
                                    }
                                    className="video-card"
                                >

                                    <h3>
                                        {video.title}
                                    </h3>

                                    <p>
                                        {
                                            video.description
                                        }
                                    </p>

                                    <video
                                        controls
                                        className="video-player"
                                    >

                                        <source
                                            src={
                                                `http://localhost:5000/${video.videoPath}`
                                            }
                                            type="video/mp4"
                                        />

                                    </video>

                                </div>

                            )
                        )
                }

            </div>


            {
                showLeaveModal && (

                    <div className="modal-overlay">

                        <div className="delete-modal">

                            <h2>
                                🚪 Leave Community
                            </h2>

                            <p>

                                Are you sure you want to leave this community?

                            </p>

                            <h4>

                                {community.communityName}

                            </h4>

                            <div className="modal-buttons">

                                <button
                                        className="community-btn"
                                    onClick={() =>
                                        setShowLeaveModal(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="leave-btn"
                                    onClick={async () => {

                                        await handleLeaveCommunity();

                                        setShowLeaveModal(false);

                                    }}
                                >
                                    Leave
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

            </div>
        </div>

    );
}

export default CommunityHome;