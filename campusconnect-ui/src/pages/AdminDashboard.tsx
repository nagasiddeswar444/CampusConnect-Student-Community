import "../styles/AdminCommon.css";
import "../styles/AdminDashboard.css";
import { useRef } from "react";

import Linkify from "react-linkify";

import {
    getPendingStudents,
    approveStudent,
    rejectStudent,

    getPendingBlogs,
    approveBlog,
    rejectBlog,

    getPendingVideos,
    approveVideo,
    rejectVideo,

    getAllAdminBlogs,
    deleteAdminBlog,

    getAllAdminVideos,
    deleteAdminVideo
}
    from "../services/AdminService";


import {
    useEffect,
    useState
} from "react";

import {
    getPendingCommunities,
    approveCommunity,
    rejectCommunity
}
    from "../services/AdminService";
import {
    getProfile
}
    from "../services/AuthService";

import {
    useNavigate
}
    from "react-router-dom";

import {
    getNotifications,
    markAsRead
}
    from "../services/NotificationService";

function AdminDashboard() {

    const navigate =
        useNavigate();

    const [students,
        setStudents] =
        useState<any[]>([]);

    const [blogs,
        setBlogs] =
        useState<any[]>([]);

    const [videos,
        setVideos] =
        useState<any[]>([]);

    const [communities,
        setCommunities] =
        useState<any[]>([]);

    const [pendingBlogs,
        setPendingBlogs] =
        useState<any[]>([]);

    const [pendingVideos,
        setPendingVideos] =
        useState<any[]>([]);

    const [showLeaderboard,
        setShowLeaderboard] =
        useState(false);

    const [topContributors,
        setTopContributors] =
        useState<any[]>([]);

    const [searchTerm,
        setSearchTerm] =
        useState("");

    const [profile,
        setProfile] =
        useState<any>(null);


    const totalStudents =
        students.length;

    const totalBlogs =
        blogs.length;

    const totalVideos =
        videos.length;

    const [showDeleteModal,
        setShowDeleteModal] =
        useState(false);

    const [selectedBlogId,
        setSelectedBlogId] =
        useState<number | null>(null);

    const [activeSection, setActiveSection] =
        useState("students");

    const contentRef = useRef<HTMLDivElement>(null);

    const [notifications,
        setNotifications] =
        useState<any[]>([]);

    const [showNotifications,
        setShowNotifications] =
        useState(false);

    const [selectedVideoId,
        setSelectedVideoId] =
        useState<number | null>(null);

    const [deleteType,
        setDeleteType] =
        useState("");

    useEffect(() => {

        loadData();
        loadNotifications();

    }, []);

    useEffect(() => {

        if (contentRef.current) {

            const y =
                contentRef.current.getBoundingClientRect().top +
                window.pageYOffset -
                150;

            window.scrollTo({
                top: y,
                behavior: "smooth"
            });

        }

    }, [activeSection]);


    

    const loadNotifications =
        async () => {

            const userId =
                Number(
                    localStorage.getItem(
                        "userId"
                    )
                );

            const data =
                await getNotifications(
                    userId
                );

            setNotifications(
                data
            );
        };

    const loadData =
        async () => {

            const pending =
                await getPendingStudents();

            const pendingBlogData =
                await getPendingBlogs();

            const pendingVideoData =
                await getPendingVideos();

            const blogData =
                await getAllAdminBlogs();

            const videoData =
                await getAllAdminVideos();

            const communityData =
                await getPendingCommunities();

            

            const userId =
                Number(
                    localStorage.getItem(
                        "userId"
                    )
                );

            const profileData =
                await getProfile(
                    userId
                );

            setStudents(
                pending
            );

            setPendingBlogs(
                pendingBlogData
            );

            setPendingVideos(
                pendingVideoData
            );

            setBlogs(
                blogData
            );

            setVideos(
                videoData
            );

            setCommunities(
                communityData
            );

            setProfile(
                profileData
            );
        };

    const handleApprove =
        async (
            userId: number
        ) => {

            await approveStudent(
                userId
            );

            loadData();
        };

    const handleReject =
        async (
            userId: number
        ) => {

            await rejectStudent(
                userId
            );

            loadData();
        };

    const handleApproveCommunity =
        async (
            communityId: number
        ) => {

            await approveCommunity(
                communityId
            );

            loadData();
        };

    const handleRejectCommunity =
        async (
            communityId: number
        ) => {

            await rejectCommunity(
                communityId
            );

            loadData();
        };

    const handleDeleteBlog =
        async (
            blogId: number
        ) => {

            await deleteAdminBlog(blogId);

            loadData();
        };


    const handleApproveBlog =
        async (
            blogId: number
        ) => {

            await approveBlog(
                blogId
            );

            loadData();
        };

    const handleRejectBlog =
        async (
            blogId: number
        ) => {

            await rejectBlog(
                blogId
            );

            loadData();
        };

    const handleApproveVideo =
        async (
            videoId: number
        ) => {

            await approveVideo(
                videoId
            );

            loadData();
        };

    const handleRejectVideo =
        async (
            videoId: number
        ) => {

            await rejectVideo(
                videoId
            );

            loadData();
        };

    const handleDeleteVideo =
        async (
            videoId: number
        ) => {

            await deleteAdminVideo(videoId);

            loadData();
        };


    const calculateTopContributors =
        () => {

            const contributors:
                any = {};

            blogs.forEach((blog: any) => {

                const name =
                    blog.fullName;

                if (!contributors[name]) {

                    contributors[name] = {
                        name,
                        blogs: 0,
                        videos: 0
                        
                    };

                }

                contributors[name].blogs++;

                

            });

            videos.forEach((video: any) => {

                const name =
                    video.fullName;

                if (!contributors[name]) {

                    contributors[name] = {
                        name,
                        blogs: 0,
                        videos: 0
                    };

                }

                contributors[name].videos++;

               

            });

            const sorted =
                Object.values(
                    contributors
                )
                    .sort(
                        (a: any, b: any) =>
                            (b.blogs + b.videos)
                            -
                            (a.blogs + a.videos)
                    );

            setTopContributors(
                sorted
            );

            setShowLeaderboard(
                true
            );
        };


    const filteredBlogs = blogs.filter((blog) => {
        const search = searchTerm.toLowerCase();

        return (
            blog.title?.toLowerCase().includes(search) ||
            blog.fullName?.toLowerCase().includes(search) ||
            blog.content?.toLowerCase().includes(search)
        );
    });
    const filteredVideos = videos.filter((video) => {
        const search = searchTerm.toLowerCase();

        return (
            video.title?.toLowerCase().includes(search) ||
            video.fullName?.toLowerCase().includes(search) ||
            video.description?.toLowerCase().includes(search)
        );
    });

    const filteredPendingBlogs = pendingBlogs.filter((blog) => {
        const search = searchTerm.toLowerCase();

        return (
            blog.title?.toLowerCase().includes(search) ||
            blog.fullName?.toLowerCase().includes(search) ||
            blog.content?.toLowerCase().includes(search)
        );
    });


    const filteredPendingVideos = pendingVideos.filter((video) => {
        const search = searchTerm.toLowerCase();

        return (
            video.title?.toLowerCase().includes(search) ||
            video.fullName?.toLowerCase().includes(search) ||
            video.description?.toLowerCase().includes(search)
        );
    });

    return (
        <>
            {
                showDeleteModal && (

                    <div className="modal-overlay">

                        <div className="delete-modal">

                            <h2 className="delete-title">
                                🗑️ Delete Content
                            </h2>

                            <p className="delete-message">
                                Are you sure you want to permanently delete this
                                <strong>
                                    {deleteType === "blog"
                                        ? " Blog"
                                        : " Video"}
                                </strong>
                                ?
                            </p>
                            <div className="delete-warning">
                                ⚠ This action cannot be undone.
                            </div>

                            <div className="delete-actions">

                                <button
                                    className="delete-btn"
                                    onClick={async () => {

                                        if (
                                            deleteType === "blog"
                                            &&
                                            selectedBlogId
                                        ) {

                                            await handleDeleteBlog(
                                                selectedBlogId
                                            );

                                        }

                                        if (
                                            deleteType === "video"
                                            &&
                                            selectedVideoId
                                        ) {

                                            await handleDeleteVideo(
                                                selectedVideoId
                                            );

                                        }

                                        setShowDeleteModal(false);

                                    }}
                                >
                                    Delete
                                </button>

                                <button
                                    className="action-btn"
                                    onClick={() =>
                                        setShowDeleteModal(
                                            false
                                        )
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }


            {
                showNotifications && (

                    <div className="modal-overlay">

                        <div className="notification-modal">

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >

                                <h2>🔔 Admin Notifications</h2>

                                <button
                                    className="close-btn"
                                    onClick={async () => {

                                        for (const notification of notifications) {

                                            if (!notification.isRead) {

                                                await markAsRead(notification.notificationId);

                                            }

                                        }

                                        await loadNotifications();

                                        setShowNotifications(false);

                                    }}
                                >
                                    ✖
                                </button>

                            </div>

                            {
                                notifications.length === 0
                                    ? (

                                        <div className="empty-card">
                                            🔔 No Notifications Available
                                        </div>

                                    )
                                    :

                                    notifications.map((notification) => (

                                        <div
                                            key={notification.notificationId}
                                            className="notification-card"
                                        >

                                            <div className="notification-icon">
                                                🔔
                                            </div>

                                            <div className="notification-content">

                                                <p>{notification.message}</p>

                                                <small>
                                                    {new Date(notification.createdAt).toLocaleString()}
                                                </small>

                                            </div>

                                        </div>

                                        )
                                    )
                            }



                        </div>

                    </div>

                )
            }


            {
                showLeaderboard && (

                    <div className="modal-overlay">

                        <div className="leaderboard-modal">

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >

                                <h2>🏆 Top Contributors</h2>

                                <button
                                    className="close-btn"
                                    onClick={() => setShowLeaderboard(false)}
                                >
                                    ✖
                                </button>

                            </div>

                            {
                                topContributors.map((user, index) => (

                                    <div className="leader-card">

                                        <div className="leader-left">

                                            <h3
                                                className={
                                                    index === 0
                                                        ? "gold-rank"
                                                        : index === 1
                                                            ? "silver-rank"
                                                            : index === 2
                                                                ? "bronze-rank"
                                                                : ""
                                                }
                                            >
                                                #{index + 1} {user.name}
                                            </h3>

                                            <p>📝 Blogs : {user.blogs}</p>

                                            <p>🎥 Videos : {user.videos}</p>

                                            <p>Total : {user.blogs + user.videos}</p>

                                        </div>

                                        <div className="leader-score">
                                            {user.blogs + user.videos}
                                        </div>

                                    </div>

                                    )
                                )
                            }



                        </div>

                    </div>

                )
            }

        <section className="dashboard-container admin-dashboard">

            <div
                className=
                "dashboard-header"
            >

                <div className="header-left">

                    <h1>
                        CampusConnect Admin
                    </h1>

                    <p className="admin-page-subtitle">
                        Manage students, blogs, videos and communities
                    </p>

                </div>

                <input
                    type="text"
                    placeholder="Search blogs or videos..."
                    className="search-box"
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                />

                <div
                    className=
                    "profile-menu"
                >

                    <button
                        className="profile-btn"
                        onClick={() =>
                            navigate(
                                "/admin-profile",
                                {
                                    state: {
                                        totalStudents,
                                        totalBlogs,
                                        totalVideos
                                    }
                                }
                            )
                        }
                    >

                        <img
                            src={
                                profile?.profileImagePath
                                    ?
                                    `http://localhost:5000/${profile.profileImagePath}`
                                    :
                                    "https://via.placeholder.com/40"
                            }
                            alt="Admin"
                            className="header-profile-photo"
                        />

                        Admin

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
                        className="action-btn"
                        onClick={calculateTopContributors}
                    >
                        🏆 Top Contributors
                    </button>

                </div>

            </div>

            <section className="admin-stats-grid">

                <div
                    className=
                    "admin-stat-card glass-card"
                >
                    <div className="stat-icon">
                        👨‍🎓
                    </div>

                    <h3>Pending Students</h3>

                    <p>{students.length}</p>
                </div>

                <div
                    className=
                    "admin-stat-card glass-card"
                >
                    <div className="stat-icon">
                        📝
                    </div>

                    <h3>Blogs</h3>

                    <p>{blogs.length}</p>
                </div>

                <div
                    className=
                    "admin-stat-card glass-card"
                >
                    <div className="stat-icon">
                        🎥
                    </div>

                    <h3>Videos</h3>

                    <p>{videos.length}</p>
                </div>

            </section>

            <nav className="admin-tabs">

                <button
                    className={
                        activeSection === "students"
                            ? "tab-btn active-tab"
                            : "tab-btn"
                    }
                    onClick={() =>
                        setActiveSection("students")
                    }
                >
                    Pending Students
                </button>

                <button
                    className={
                        activeSection === "pendingBlogs"
                            ? "tab-btn active-tab"
                            : "tab-btn"
                    }
                    onClick={() =>
                        setActiveSection(
                            "pendingBlogs"
                        )
                    }
                >
                    Pending Blogs
                </button>

                <button
                    className={
                        activeSection === "pendingVideos"
                            ? "tab-btn active-tab"
                            : "tab-btn"
                    }
                    onClick={() =>
                        setActiveSection(
                            "pendingVideos"
                        )
                    }
                >
                    Pending Videos
                </button>

                <button
                    className={
                        activeSection === "communities"
                            ? "tab-btn active-tab"
                            : "tab-btn"
                    }
                    onClick={() =>
                        setActiveSection("communities")
                    }
                >
                    Pending Communities
                </button>

                <button
                    className={
                        activeSection === "blogs"
                            ? "tab-btn active-tab"
                            : "tab-btn"
                    }
                    onClick={(e) => {
                        (e.currentTarget as HTMLButtonElement).blur();
                        setActiveSection("blogs");
                    }}
                >
                    Manage Blogs
                </button>

                <button
                    className={
                        activeSection === "videos"
                            ? "tab-btn active-tab"
                            : "tab-btn"
                    }
                    onClick={() =>
                        setActiveSection("videos")
                    }
                >
                    Manage Videos
                </button>

            </nav>

            <div
                
                className="content-section"
            >

                {activeSection === "students" && (

                    <div
                       
                        className="content-section"
                    >

                        <h2 className="admin-section-title">
                            Pending Students
                        </h2>

                        {
                            students.length === 0 ? (

                                <div className="empty-card">
                                    No Pending Students Found
                                </div>

                            ) : (

                                students.map((student) => (

                                    <div
                                        key={student.userId}
                                        className="pending-card glass-card"
                                    >

                                        <h3>
                                            Name: {student.fullName}
                                        </h3>
                                        <div className="pending-badge">
                                            ⏳ Pending Approval
                                        </div>

                                        <div className="student-details">

                                            <p><strong>Department:</strong> {student.department}</p>

                                            <p><strong>Year:</strong> {student.yearOfStudy}</p>

                                        </div>

                                        <div className="pending-actions">

                                            <button
                                                className="action-btn"
                                                onClick={() =>
                                                    handleApprove(
                                                        student.userId
                                                    )
                                                }
                                            >
                                                Approve
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleReject(
                                                        student.userId
                                                    )
                                                }
                                            >
                                                Reject
                                            </button>

                                        </div>

                                    </div>

                                ))

                            )
                        }

                                    
                     

                    </div>

                )
            }


            {
                activeSection === "pendingBlogs" && (

                    <div
                       
                        className="content-section"
                    >

                        <h2 className="admin-section-title">
                            Pending Blogs
                        </h2>

                        {
                            pendingBlogs.length === 0
                                ? (

                                    <div className="empty-card">
                                        No Pending Blogs Found
                                    </div>

                                )
                                :

                                filteredPendingBlogs.map(
                                    (blog) => (

                                        <div
                                            key={blog.blogId}
                                            className="pending-card glass-card"
                                        >

                                            <h3>
                                                {blog.title}
                                            </h3>
                                            <div className="pending-badge">
                                                📝 Pending Blog
                                            </div>

                                            <div className="content-author">
                                                👤 {blog.fullName}
                                            </div>

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

                                                    <div className="attachment-box">

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

                                            <div className="pending-actions">

                                                <button
                                                    className="action-btn"
                                                    onClick={() =>
                                                        handleApproveBlog(
                                                            blog.blogId
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleRejectBlog(
                                                            blog.blogId
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>

                                            </div>

                                        </div>

                                    )
                                )
                        }

                    </div>

                )
            }

            {
                activeSection === "blogs" && (

                    <div
                        
                        className="content-section"
                    >

                        <h2 className="admin-section-title">
                            Manage Blogs
                        </h2>

                        {
                            filteredBlogs.map((blog) => (

                                <div
                                    key={blog.blogId}
                                    className="blog-card"
                                >

                                    <h3>
                                        Title: {blog.title}
                                    </h3>
                                    <div className="approved-badge">
                                        ✅ Approved Blog
                                    </div>

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

                                            <div className="attachment-box">

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

                                    <div className="content-author">
                                        👤 {blog.fullName}
                                    </div>

                                    
                                    <div className="manage-actions">

                                        <button
                                            className="delete-btn"
                                        onClick={() => {

                                            setDeleteType("blog");

                                            setSelectedBlogId(
                                                blog.blogId
                                            );

                                            setShowDeleteModal(true);

                                        }}
                                    >
                                        Delete Blog
                                        </button>
                                    </div>


                                </div>

                            ))
                        }

                    </div>

                )
            }

            {
                activeSection === "pendingVideos" && (

                    <div
                       
                        className="content-section"
                    >

                        <h2 className="admin-section-title">
                            Pending Videos
                        </h2>

                        {
                            pendingVideos.length === 0
                                ? (

                                    <div className="empty-card">
                                        No Pending Videos Found
                                    </div>

                                )
                                :

                               filteredPendingVideos.map(
                                    (video) => (

                                        <div
                                            key={video.videoId}
                                            className="pending-card glass-card"
                                        >

                                            <h3>
                                                {video.title}
                                            </h3>

                                            <div className="pending-badge">
                                                🎥 Pending Video
                                            </div>
                                            <div className="content-author">
                                                👤 {video.fullName}
                                            </div>

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
                                            </video>

                                            <div className="pending-actions">

                                                <button
                                                    className="action-btn"
                                                    onClick={() =>
                                                        handleApproveVideo(
                                                            video.videoId
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleRejectVideo(
                                                            video.videoId
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>

                                            </div>

                                        </div>

                                    )
                                )
                        }

                    </div>

                )
            }

            {
                activeSection ===
                "communities" && (

                    <div
                       
                        className="content-section"
                    >

                        <h2 className="admin-section-title">
                            Pending Communities
                        </h2>

                        {
                            communities.length === 0
                                ? (

                                    <div
                                        className=
                                        "empty-card"
                                    >
                                        No Pending Communities
                                    </div>

                                )

                                :

                                communities.map(
                                    (
                                        community: any
                                    ) => (

                                        <div
                                            key={
                                                community.communityId
                                            }
                                            className="pending-card glass-card"
                                        >

                                            <h3>
                                                {
                                                    community.communityName
                                                }
                                            </h3>

                                            <div className="pending-badge">
                                                👥 Pending Community
                                            </div>

                                            <div className="content-author">
                                                👤 Created by {community.fullName}
                                            </div>

                                            <p className="community-description">
                                                {community.description}
                                            </p>

                                            <div
                                                className=
                                                "action-grid"
                                            >

                                                <button
                                                    className=
                                                    "action-btn"
                                                    onClick={() =>
                                                        handleApproveCommunity(
                                                            community.communityId
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    className=
                                                    "delete-btn"
                                                    onClick={() =>
                                                        handleRejectCommunity(
                                                            community.communityId
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>

                                            </div>

                                        </div>

                                    )
                                )
                        }

                    </div>

                )
            }

            {
                activeSection === "videos" && (

                    <div
                       
                        className="content-section"
                    >
                        <h2 className="admin-section-title">
                            Manage Videos
                        </h2>

                        {
                            filteredVideos.map((video) => (

                                <div
                                    key={video.videoId}
                                    className="video-card"
                                >

                                    <h3>
                                        {video.title}
                                    </h3>
                                    <div className="approved-badge">
                                        ✅ Approved Video
                                    </div>

                                    <div className="content-author">
                                        👤 {video.fullName}
                                    </div>
                                    <p className="video-description">
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

                                    </video>

                                    

                                    <div className="manage-actions">

                                        <button
                                            className="delete-btn"
                                        onClick={() => {

                                            setDeleteType("video");

                                            setSelectedVideoId(
                                                video.videoId
                                            );

                                            setShowDeleteModal(true);

                                        }}
                                    >
                                        Delete Video
                                    </button>
                                    </div>
                                </div>

                            ))
                        }

                    </div>

                )
            }

           
            </div>

        </section>
        </>

    );
}

export default AdminDashboard;