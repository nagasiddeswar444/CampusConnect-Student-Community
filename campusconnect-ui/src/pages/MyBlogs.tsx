import "../styles/Blog.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getBlogsByUser,
    updateBlog,
    deleteBlog
}
    from "../services/BlogService";

function MyBlogs() {
    const navigate = useNavigate();

    const [blogs, setBlogs] =
        useState<any[]>([]);
    const [showModal, setShowModal] =
        useState(false);
    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [blogToDelete, setBlogToDelete] =
        useState<any>(null);

    const [selectedBlog, setSelectedBlog] =
        useState<any>(null);

    const [editTitle, setEditTitle] =
        useState("");

    const [editContent, setEditContent] =
        useState("");

    const [editAttachment,
        setEditAttachment] =
        useState<File | null>(
            null
        );

    const loadBlogs = async () => {

        const userId =
            Number(
                localStorage.getItem("userId")
            );

        const data =
            await getBlogsByUser(userId);

        setBlogs(data);
    };


    useEffect(() => {

        loadBlogs();

    }, []);

    const handleDelete =
        (blog: any) => {

            setBlogToDelete(blog);

            setShowDeleteModal(true);
        }; const confirmDelete = async () => {

            try {

                const userId =
                    Number(
                        localStorage.getItem(
                            "userId"
                        )
                    );

                await deleteBlog(
                    blogToDelete.blogId,
                    userId
                );

                setShowDeleteModal(false);

                loadBlogs();

            }
            catch {

                alert(
                    "Failed to delete blog"
                );

            }
        };

    const handleEdit = (blog: any) => {

        setSelectedBlog(blog);

        setEditTitle(blog.title);

        setEditContent(blog.content);

        setShowModal(true);
    };

    const saveBlog = async () => {

        try {

            const userId =
                Number(
                    localStorage.getItem("userId")
                );

            await updateBlog(
                selectedBlog.blogId,
                userId,
                editTitle,
                editContent,
                editAttachment
            );

            alert(
                "Blog updated successfully"
            );

            setShowModal(false);

            loadBlogs();

        }
        catch {

            alert(
                "Failed to update blog"
            );

        }
    };



    return (

        <div className="dashboard-container">

            <button
                className="back-btn"
                onClick={() => navigate("/student")}
            >
                ← Back
            </button>

            <h1>
                My Blogs 📚
            </h1>

            {
                blogs.length === 0 ?

                    (

                        <div className="empty-state">

                            <h2>
                                📝 No Blogs Yet
                            </h2>

                            <p>
                                Start sharing your knowledge and
                                inspire other students.
                            </p>

                            <h4>
                                "Every expert was once a beginner."
                            </h4>

                        </div>

                    )

                    :

                    blogs.map((blog) => (

                        <div
                            key={blog.blogId}
                            className="blog-card"
                        >

                        <h3>
                            {blog.title}
                        </h3>

                        <p>
                            {blog.content}
                        </p>

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

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "15px"
                            }}
                        >

                            <button
                                className="action-btn"
                                onClick={() =>
                                    handleEdit(blog)
                                }
                            >
                                Edit
                            </button>

                            <button
                                className="action-btn"
                                onClick={() =>
                                    handleDelete(blog)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))
            }
            {
                showModal && (

                    <div className="modal-overlay">

                        <div className="modal-box">

                            <h2>
                                Edit Blog ✍️
                            </h2>

                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) =>
                                    setEditTitle(
                                        e.target.value
                                    )
                                }
                            />

                            <textarea
                                rows={8}
                                value={editContent}
                                onChange={(e) =>
                                    setEditContent(
                                        e.target.value
                                    )
                                }
                            />

                            <input
                                type="file"
                                accept="
        .pdf,
        .ppt,
        .pptx,
        .doc,
        .docx,
        .jpg,
        .jpeg,
        .png
    "
                                onChange={(e) =>
                                    setEditAttachment(
                                        e.target.files?.[0]
                                        || null
                                    )
                                }
                            />

                            {
                                selectedBlog?.attachmentPath && (

                                    <div
                                        style={{
                                            marginTop: "10px",
                                            marginBottom: "10px"
                                        }}
                                    >

                                        Current Attachment:

                                        <br />

                                        <a
                                            href={
                                                `http://localhost:5000/${selectedBlog.attachmentPath}`
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            📎 {selectedBlog.attachmentName}
                                        </a>

                                    </div>

                                )
                            }

                            <div
                                className="modal-buttons"
                            >

                                <button
                                    className="action-btn"
                                    onClick={saveBlog}
                                >
                                    Save
                                </button>

                                <button
                                    className="action-btn"
                                    onClick={() =>
                                        setShowModal(false)
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
                showDeleteModal && (

                    <div className="modal-overlay">

                        <div className="delete-modal">

                            <h2>
                                ⚠️ Delete Blog
                            </h2>

                            <p>

                                Are you sure you want to
                                delete this blog?

                            </p>

                            <h4>
                                {blogToDelete?.title}
                            </h4>

                            <div
                                className="modal-buttons"
                            >

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

                                <button
                                    className="delete-btn"
                                    onClick={
                                        confirmDelete
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>

    );
}

export default MyBlogs;