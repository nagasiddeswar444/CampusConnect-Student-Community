import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import Linkify from "react-linkify";

import {
    useNavigate,
    useLocation
}
    from "react-router-dom";

import { addLike, getLikeCount } from "../services/LikeService";
import { getAllVideos } from "../services/VideoService";
import { getProfile }
    from "../services/AuthService";


import { getAllBlogs } from "../services/BlogService";
import {
    addComment,
    getCommentsByBlog
}
    from "../services/CommentService";

import {
    addVideoLike,
    getVideoLikeCount
}
    from "../services/VideoLikeService";

import {
    addVideoComment,
    getVideoComments
}
    from "../services/VideoCommentService";

import CommentItem from "../components/CommentItem";

import {
    getNotifications,
    markAsRead
}
    from "../services/NotificationService";

function StudentDashboard() {

    const navigate = useNavigate();
    const location = useLocation();


    const [blogs, setBlogs] = useState<any[]>([]);
    const [likeCounts, setLikeCounts] = useState<any>({});
    const [comments, setComments] = useState<any>({});
    const [commentInputs, setCommentInputs] = useState<any>({});
   

    
   
    const [videos, setVideos] = useState<any[]>([]);
    const [expandedComments,
        setExpandedComments] =
        useState<any>({});
    const [searchTerm,
        setSearchTerm] =
        useState("");
    const [videoLikeCounts,
        setVideoLikeCounts] =
        useState<any>({});

    const [videoComments,
        setVideoComments] =
        useState<any>({});

    const [videoCommentInputs,
        setVideoCommentInputs] =
        useState<any>({});

    const [pinnedBlogs,
        setPinnedBlogs] =
        useState<number[]>(
            []
        );

    const [pinnedVideos,
        setPinnedVideos] =
        useState<number[]>(
            []
        );
    const [profile,
        setProfile] =
        useState<any>(null);

    const fullName =
        localStorage.getItem("fullName");

    const userId =
        localStorage.getItem(
            "userId"
        );

    const [notifications,
        setNotifications] =
        useState<any[]>([]);

    const [showNotifications,
        setShowNotifications] =
        useState(false);

    const [successMessage,
        setSuccessMessage] =
        useState("");

    const loadLikeCounts = async (blogsData: any[]) => {

        const counts: any = {};

        for (const blog of blogsData) {

            const result =
                await getLikeCount(blog.blogId);

            counts[blog.blogId] =
                result.likeCount;
        }

        setLikeCounts(counts);
    };

    const loadNotifications = async () => {

        const userId = Number(localStorage.getItem("userId"));

        console.log("UserId:", userId);

        const data = await getNotifications(userId);

        console.log("Notifications:", data);

        setNotifications(data);
    };

    useEffect(() => {

        loadBlogs();
        loadVideos();
        loadProfile();
        loadNotifications();
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

        

        const storedPinnedBlogs =
            JSON.parse(
                localStorage.getItem(
                    `pinnedBlogs_${userId}`
                ) || "[]"
            );

        setPinnedBlogs(
            storedPinnedBlogs
        );

        const storedPinnedVideos =
            JSON.parse(
                localStorage.getItem(
                    `pinnedVideos_${userId}`
                ) || "[]"
            );

        setPinnedVideos(
            storedPinnedVideos
        );
       

    }, [location.state]);

    useEffect(() => {

        const params =
            new URLSearchParams(
                location.search
            );

        const blogId =
            params.get("blogId");

        const videoId =
            params.get("videoId");

        if (blogId) {

            setTimeout(() => {

                document
                    .getElementById(
                        `blog-${blogId}`
                    )
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }, 500);

        }

        if (videoId) {

            setTimeout(() => {

                document
                    .getElementById(
                        `video-${videoId}`
                    )
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }, 500);

        }

    }, [location.search]);

   

    const loadBlogs = async () => {

        try {

            const data = await getAllBlogs();

            setBlogs(data);

            await loadLikeCounts(data);

            await loadComments(data);

        }
        catch {

            alert("Failed to load blogs");

        }
    };

    const handleLike = async (
        blogId: number
    ) => {

        try {

            const userId =
                Number(
                    localStorage.getItem("userId")
                );

            await addLike(
                blogId,
                userId
            );

            const result =
                await getLikeCount(blogId);

            setLikeCounts((prev: any) => ({
                ...prev,
                [blogId]: result.likeCount
            }));

        }
        catch {

            alert("Already liked");

        }
    };

    const loadProfile =
        async () => {

            const userId =
                Number(
                    localStorage.getItem(
                        "userId"
                    )
                );

            const data =
                await getProfile(userId);

            setProfile(data);
        };

    const loadComments = async (
        blogsData: any[]
    ) => {

        const allComments: any = {};

        for (const blog of blogsData) {

            const data =
                await getCommentsByBlog(
                    blog.blogId
                );

            allComments[blog.blogId] =
                data;
        }

        setComments(allComments);
    };
    const handleComment = async (
        blogId: number
    ) => {

        try {

            const userId =
                Number(
                    localStorage.getItem(
                        "userId"
                    )
                );

            const text =
                commentInputs[blogId];

            if (!text) {

                alert(
                    "Enter comment"
                );

                return;
            }

            await addComment(
                blogId,
                userId,
                text
            );

            const updatedComments =
                await getCommentsByBlog(
                    blogId
                );

            setComments(
                (prev: any) => ({
                    ...prev,
                    [blogId]:
                        updatedComments
                })
            );

            setCommentInputs(
                (prev: any) => ({
                    ...prev,
                    [blogId]: ""
                })
            );

        }
        catch {

            alert(
                "Failed to add comment"
            );

        }
    };


    

    const handlePinBlog =
        (
            blogId: number
        ) => {

            let updated =
                [...pinnedBlogs];

            if (
                !updated.includes(
                    blogId
                )
            ) {

                updated.push(
                    blogId
                );

                setPinnedBlogs(
                    updated
                );

                localStorage.setItem(
                    `pinnedBlogs_${userId}`,
                    JSON.stringify(updated)
                );
            }
        };

    const handleUnpinBlog =
        (
            blogId: number
        ) => {

            const updated =
                pinnedBlogs.filter(
                    id =>
                        id !== blogId
                );

            setPinnedBlogs(
                updated
            );

            localStorage.setItem(
                `pinnedBlogs_${userId}`,
                JSON.stringify(updated)
            );
        };

    const handlePinVideo =
        (
            videoId: number
        ) => {

            let updated =
                [...pinnedVideos];

            if (
                !updated.includes(
                    videoId
                )
            ) {

                updated.push(
                    videoId
                );

                setPinnedVideos(
                    updated
                );

                localStorage.setItem(
                    `pinnedVideos_${userId}`,
                    JSON.stringify(updated)
                );
            }
        };

    const handleUnpinVideo =
        (
            videoId: number
        ) => {

            const updated =
                pinnedVideos.filter(
                    id =>
                        id !== videoId
                );

            setPinnedVideos(
                updated
            );

            localStorage.setItem(
                `pinnedVideos_${userId}`,
                JSON.stringify(updated)
            );
        };

    const loadVideos = async () => {

        try {

            const data =
                await getAllVideos();

            setVideos(data);

            await loadVideoLikeCounts(
                data
            );

            await loadVideoComments(
                data
            );

        }
        catch {

            alert(
                "Failed to load videos"
            );

        }
    };
    const loadVideoLikeCounts =
        async (videosData: any[]) => {

            const counts: any = {};

            for (const video of videosData) {
                const result =
                    await getVideoLikeCount(
                        video.videoId
                    );

                counts[video.videoId] =
                    result.likeCount;
            }

            setVideoLikeCounts(counts);
        };

    const loadVideoComments =
        async (videosData: any[]) => {

            const allComments: any = {};

            for (const video of videosData) {
                const data =
                    await getVideoComments(
                        video.videoId
                    );

                allComments[
                    video.videoId
                ] = data;
            }

            setVideoComments(
                allComments
            );
        };

    const handleVideoLike =
        async (
            videoId: number
        ) => {

            const userId =
                Number(
                    localStorage.getItem(
                        "userId"
                    )
                );

            await addVideoLike(
                videoId,
                userId
            );

            const result =
                await getVideoLikeCount(
                    videoId
                );

            setVideoLikeCounts(
                (prev: any) => ({
                    ...prev,
                    [videoId]:
                        result.likeCount
                })
            );
        }; 

    const handleVideoComment =
        async (
            videoId: number
        ) => {

            const userId =
                Number(
                    localStorage.getItem(
                        "userId"
                    )
                );

            const text =
                videoCommentInputs[
                videoId
                ];

            if (!text) {
                return;
            }

            await addVideoComment(
                videoId,
                userId,
                text
            );

            const updated =
                await getVideoComments(
                    videoId
                );

            setVideoComments(
                (prev: any) => ({
                    ...prev,
                    [videoId]:
                        updated
                })
            );

            setVideoCommentInputs(
                (prev: any) => ({
                    ...prev,
                    [videoId]: ""
                })
            );
        };


    const filteredBlogs =
        blogs.filter(
            (blog) =>
                blog.title
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    )
                ||
                blog.fullName
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    )
        );

    const filteredVideos =
        videos.filter(
            (video) =>
                video.title
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    )
                ||
                video.fullName
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    )
        );

    

    const pinnedBlogList =
        filteredBlogs.filter(
            (blog: any) =>
                pinnedBlogs.includes(
                    blog.blogId
                )
        );

    const pinnedVideoList =
        filteredVideos.filter(
            (video: any) =>
                pinnedVideos.includes(
                    video.videoId
                )
        );

    return (

        <div className="dashboard-container">

            <div className="background-particles">

                {[...Array(280)].map((_, i) => (
                    <span
                        key={i}
                        className="particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 20}s`,
                            animationDuration: `${12 + Math.random() * 12}s`
                        }}
                    />
                ))}

            </div>

            <div className="watermark">
                EMRRANK
            </div>

            <div className="dashboard-header">

                <div className="header-left">

                    <h1>CampusConnect</h1>

                </div>

                <div className="header-center">

                    <input
                        type="text"
                        placeholder="🔍 Search Blogs or Videos..."
                        className="search-box"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>

                

                <div className="profile-menu">

                    <button
                        className="nav-btn"
                        onClick={() => navigate("/student")}
                    >
                        🏠 Home
                    </button>

                    <button
                        className="nav-btn"
                        onClick={() => navigate("/my-blogs")}
                    >
                        📝 My Blogs
                    </button>

                    <button
                        className="nav-btn"
                        onClick={() => navigate("/my-videos")}
                    >
                        🎥 My Videos
                    </button>

                    <button
                        className="nav-btn"
                        onClick={() => navigate("/my-communities")}
                    >
                        👥 Communities
                    </button>

                    <button
                        className="notification-btn"
                        onClick={() =>
                            setShowNotifications(
                                true
                            )
                        }
                    >
                        🔔
                        {
                            notifications.filter(
                                n => !n.isRead
                            ).length > 0 && (

                                <span
                                    className=
                                    "notification-badge"
                                >
                                    {
                                        notifications.filter(
                                            n => !n.isRead
                                        ).length
                                    }
                                </span>

                            )
                        }
                    </button>

                    <button
                        className="profile-btn"
                        onClick={() =>
                            navigate("/profile")
                        }
                    >

                        {
                            profile?.profileImagePath ?

                                (
                                    <img
                                        src={
                                            `http://localhost:5000/${profile.profileImagePath}`
                                        }
                                        alt="Profile"
                                        className="header-profile-photo"
                                    />
                                )

                                :

                                "👤"
                        }

                        <span>
                            {fullName}
                        </span>

                    </button>

                    <button
                        className="logout-btn"
                        onClick={() => {

                            localStorage.clear();

                            navigate("/");
                        }}
                    >
                        Logout
                    </button>

                </div>

            </div>

            {
                successMessage && (

                    <div
                        className="success-banner"
                    >
                        {successMessage}
                    </div>

                )
            }

            <div className="welcome-section">

                

                <h2>
                    Welcome, {fullName} 👋
                </h2>

                <p>
                    Connect, Learn and Grow with CampusConnect
                </p>

            </div>

            <div className="dashboard-stats-grid">

                <div className="stat-card">
                    <div className="stat-icon">📄</div>
                    <h3>Blogs</h3>
                    <p>{blogs.length}</p>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🎥</div>
                    <h3>Videos</h3>
                    <p>{videos.length}</p>
                </div>

                

            </div>
           


            <div className="action-grid">

                <button
                    className="action-btn"
                    onClick={() => navigate("/create-blog")}
                >
                    📝 Create Blog
                </button>

                <button
                    className="action-btn"
                    onClick={() => navigate("/upload-video")}
                >
                    🎥 Upload Video
                </button>

                <button
                    className="action-btn"
                    onClick={() => navigate("/create-community")}
                >
                    👥 Create Community
                </button>

                <button
                    className="action-btn"
                    onClick={() => navigate("/discover-communities")}
                >
                    🌐 Discover Communities
                </button>

            </div>
            <div className="content-section">

                {
                    pinnedBlogList.length > 0 && (

                        <>

                            <h2>
                                📌 Pinned Blogs
                            </h2>

                            {
                                pinnedBlogList.map(
                                    (blog: any) => (

                                        <div
                                            key={blog.blogId}
                                            className="pinned-blog-card"
                                        >

                                            <div className="blog-header">

                                                <h3>{blog.title}</h3>

                                                <button
                                                    className="unpin-btn"
                                                    onClick={() => handleUnpinBlog(blog.blogId)}
                                                >
                                                    📌 Unpin
                                                </button>

                                            </div>

                                            <span className="blog-author">
                                                👤 {blog.fullName}
                                            </span>

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
                                                        style={{
                                                            marginTop: "10px"
                                                        }}
                                                    >

                                                        <a
                                                            href={
                                                                `http://localhost:5000/${blog.attachmentPath}`
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="attachment-link"
                                                        >
                                                            📎 {blog.attachmentName}
                                                        </a>

                                                    </div>

                                                )
                                            }   

                                           

                                        </div>

                                    ))
                            }

                        </>

                    )
                }

                <h2>
                    Recent Blogs
                </h2>

                {
                    blogs.length === 0 ?

                        (
                            <div className="empty-card">
                                No blogs available
                            </div>
                        )

                        :

                        filteredBlogs
                            .filter(
                                (blog: any) =>
                                    !pinnedBlogs.includes(
                                        blog.blogId
                                    )
                            )
                            .map((blog) => (
                                <div
                                    id={`blog-${blog.blogId}`}
                                    key={blog.blogId}
                                    className="blog-card"
                                >

                                    <div className="blog-header">

                                        <h3>{blog.title}</h3>

                                        <button
                                            className="pin-btn"
                                            onClick={() => handlePinBlog(blog.blogId)}
                                        >
                                            📌 Pin
                                        </button>

                                    </div>

                                <div>
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
                                </div>

                                <div
                                    style={{
                                        marginTop: "15px"
                                       
                                    }}
                                    >


                                        {
                                            blog.attachmentPath && (

                                                <div className="post-footer">

                                                    <a
                                                        href={
                                                            `http://localhost:5000/${blog.attachmentPath}`
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="attachment-link"
                                                    >
                                                        📎 {blog.attachmentName}
                                                    </a>

                                                </div>

                                            )
                                        }

                                        <div className="post-footer">

                                            

                                            <button
                                                className="action-btn"
                                                onClick={() =>
                                                    handleLike(blog.blogId)
                                                }
                                            >
                                                👍 Like ({likeCounts[blog.blogId] || 0})
                                            </button>

                                        </div>
                                    <div
                                        style={{
                                            marginTop: "20px"
                                        }}
                                    >

                                        <h4>
                                            Comments
                                        </h4>

                                            {
                                                (
                                                    expandedComments[blog.blogId]

                                                        ? comments[blog.blogId]
                                                            ?.filter(
                                                                (comment: any) =>
                                                                    comment.parentCommentId === null
                                                            )

                                                        : comments[blog.blogId]
                                                            ?.filter(
                                                                (comment: any) =>
                                                                    comment.parentCommentId === null
                                                            )
                                                            .slice(0, 2)

                                                )?.map(
                                                    (comment: any) => (

                                                        <CommentItem
                                                            key={comment.commentId}
                                                            comment={comment}
                                                            allComments={
                                                                comments[blog.blogId]
                                                            }
                                                            blogId={blog.blogId}
                                                            handleReply={
                                                                async (
                                                                    blogId,
                                                                    parentCommentId,
                                                                    text
                                                                ) => {

                                                                    const userId =
                                                                        Number(
                                                                            localStorage.getItem(
                                                                                "userId"
                                                                            )
                                                                        );

                                                                    await addComment(
                                                                        blogId,
                                                                        userId,
                                                                        text,
                                                                        parentCommentId
                                                                    );

                                                                    const updated =
                                                                        await getCommentsByBlog(
                                                                            blogId
                                                                        );

                                                                    setComments(
                                                                        (prev: any) => ({
                                                                            ...prev,
                                                                            [blogId]: updated
                                                                        })
                                                                    );
                                                                }
                                                            }
                                                        />

                                                    )
                                                )
                                            }


                                            {
                                                comments[blog.blogId]
                                                    ?.filter(
                                                        (comment: any) =>
                                                            comment.parentCommentId === null
                                                    ).length > 2 && (

                                                    <button
                                                        className="show-more-btn"
                                                        onClick={() =>
                                                            setExpandedComments(
                                                                (prev: any) => ({
                                                                    ...prev,
                                                                    [blog.blogId]:
                                                                        !prev[blog.blogId]
                                                                })
                                                            )
                                                        }
                                                    >
                                                        {
                                                            expandedComments[blog.blogId]

                                                                ? "Show Less ▲"

                                                                : `Show More Comments (${comments[blog.blogId]
                                                                    .filter(
                                                                        (c: any) =>
                                                                            c.parentCommentId === null
                                                                    ).length - 2
                                                                }) ▼`
                                                        }
                                                    </button>
                                                )
                                            }

                                        <input
                                            type="text"
                                            placeholder="Write comment..."
                                            value={
                                                commentInputs[
                                                blog.blogId
                                                ] || ""
                                            }
                                            onChange={(e) =>
                                                setCommentInputs(
                                                    (prev: any) => ({
                                                        ...prev,
                                                        [blog.blogId]:
                                                            e.target.value
                                                    })
                                                )
                                            }
                                        />

                                        <button
                                            className="action-btn"
                                            onClick={() =>
                                                handleComment(
                                                    blog.blogId
                                                )
                                            }
                                        >
                                            Post Comment
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))
                }

            </div>

            <div className="content-section">

                {
                    pinnedVideoList.length > 0 && (

                        <>

                            <h2>
                                📌 Pinned Videos
                            </h2>

                            {
                                pinnedVideoList.map(
                                    (video: any) => (

                                        <div
                                            key={video.videoId}
                                            className="pinned-video-card"
                                        >

                                            <div className="blog-header">

                                                <h3>🎥 {video.title}</h3>

                                                <button
                                                    className="unpin-btn"
                                                    onClick={() => handleUnpinVideo(video.videoId)}
                                                >
                                                    📌 Unpin
                                                </button>

                                            </div>

                                            <span className="blog-author">
                                                👤 {video.fullName}
                                            </span>

                                            

                                            <p>
                                                {video.description}
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

                                    ))
                            }

                        </>

                    )
                }

                <h2>
                    Recent Videos
                </h2>

                {
                    videos.length === 0 ?

                        (
                            <div className="empty-card">
                                No videos available
                            </div>
                        )

                        :

                        filteredVideos
                            .filter(
                                (video: any) =>
                                    !pinnedVideos.includes(
                                        video.videoId
                                    )
                            )
                            .map((video) => (

                                <div
                                    id={`video-${video.videoId}`}
                                    key={video.videoId}
                                    className="video-card"
                                >

                                    <div className="blog-header">

                                        <h3>🎥 {video.title}</h3>

                                        <button
                                            className="pin-btn"
                                            onClick={() => handlePinVideo(video.videoId)}
                                        >
                                            📌 Pin
                                        </button>

                                    </div>

                                    <span className="blog-author">
                                        👤 {video.fullName}
                                    </span>


                                <p>
                                    {video.description}
                                </p>

                                <video
                                    controls
                                    className="video-player"
                                >
                                    <source
                                        src={`http://localhost:5000/${video.videoPath}`}
                                        type="video/mp4"
                                    />

                                    Your browser does not support videos.
                                </video>

                                

                                <div
                                    style={{
                                        marginTop: "15px"
                                    }}
                                >

                                    <button
                                        className="action-btn"
                                        onClick={() =>
                                            handleVideoLike(
                                                video.videoId
                                            )
                                        }
                                    >
                                        👍 Like (
                                        {
                                            videoLikeCounts[
                                            video.videoId
                                            ] || 0
                                        }
                                        )
                                    </button>

                                </div>

                                    <div className="comment-section">

                                    <h4>
                                        Comments
                                    </h4>

                                        {
                                            videoComments[
                                                video.videoId
                                            ]?.map(
                                                (
                                                    comment: any
                                                ) => (

                                                    <div
                                                        key={
                                                            comment.commentId
                                                        }
                                                        className="comment-card"
                                                    >

                                                        <strong>
                                                            {comment.fullName}
                                                        </strong>

                                                        <span
                                                            style={{
                                                                marginLeft: "10px",
                                                                color: "#94a3b8",
                                                                fontSize: "12px"
                                                            }}
                                                        >
                                                            {
                                                                new Date(
                                                                    comment.createdAt
                                                                ).toLocaleString()
                                                            }
                                                        </span>

                                                        <br />

                                                        {comment.commentText}

                                                    </div>

                                                )
                                            )
                                        }

                                    <input
                                        type="text"
                                        placeholder="Write comment..."
                                        value={
                                            videoCommentInputs[
                                            video.videoId
                                            ] || ""
                                        }
                                        onChange={(e) =>
                                            setVideoCommentInputs(
                                                (prev: any) => ({
                                                    ...prev,
                                                    [video.videoId]:
                                                        e.target.value
                                                })
                                            )
                                        }
                                    />

                                    <button
                                        className="action-btn"
                                        onClick={() =>
                                            handleVideoComment(
                                                video.videoId
                                            )
                                        }
                                    >
                                        Post Comment
                                    </button>

                                </div>

                            </div>

                        ))
                }

            </div>

            {
                showNotifications && (

                    <div className="modal-overlay">

                        <div className="leaderboard-modal notification-modal">

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <h2 className="notification-title">
                                    Notifications
                                </h2>

                                <button
                                    className="close-btn"
                                    onClick={async () => {

                                        for (const notification of notifications) {
                                            if (!notification.isRead) {
                                                await markAsRead(notification.notificationId);
                                            }
                                        }

                                        setNotifications((prev: any[]) =>
                                            prev.map(n => ({
                                                ...n,
                                                isRead: true
                                            }))
                                        );

                                        setShowNotifications(false);

                                    }}
                                >
                                    ✖
                                </button>

                            </div>

                            {
                                notifications.length === 0 ?

                                    (
                                        <p>No Notifications</p>
                                    )

                                    :

                                    <div className="notification-list">

                                        {
                                            notifications.map((notification) => (

                                                <div
                                                    key={notification.notificationId}
                                                    className="notification-item"
                                                    onClick={async () => {

                                                        await markAsRead(notification.notificationId);

                                                        setShowNotifications(false);

                                                        if (notification.notificationType === "Blog") {

                                                            navigate(
                                                                `/student?blogId=${notification.referenceId}`
                                                            );

                                                        }
                                                        else if (notification.notificationType === "Video") {

                                                            navigate(
                                                                `/student?videoId=${notification.referenceId}`
                                                            );

                                                        }

                                                    }}
                                                >

                                                    <div className="notification-icon">
                                                        🔔
                                                    </div>

                                                    <div className="notification-content">

                                                        <p>{notification.message}</p>

                                                        <span>
                                                            {new Date(notification.createdAt).toLocaleString()}
                                                        </span>

                                                    </div>

                                                </div>

                                            ))
                                        }

                                    </div>

                            }

                        </div>

                    </div>

                )
            }
            

        </div>

    );
}

export default StudentDashboard;