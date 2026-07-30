import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/BlogService";
import "../styles/CreateBlog.css";

function CreateBlog() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [attachment,
        setAttachment] =
        useState<File | null>(
            null
        );

    const handleSubmit = async () => {

        try {

            const userId =
                Number(localStorage.getItem("userId"));

            await createBlog({
                userId,
                title,
                content,
                attachmentFile:
                    attachment
            });

            navigate(
                "/student",
                {
                    state: {
                        message:
                            "✅ Blog submitted successfully. It will be visible after admin approval."
                    }
                }
            );

        } catch (error: any) {

            alert(error.message);
        }
    };

    return (

    

        <div className="dashboard-container compact-form-page">

            <button
                className="back-btn"
                onClick={() => navigate("/student")}
            >
                ← Back
            </button>

            <div className="create-blog-form glass-card">

                <h1 className="page-title">
                    Create Blog ✍️
                </h1>

                <p className="page-subtitle">
                    Share your knowledge, tutorials and useful resources with other students.
                </p>

            

                <input
                    type="text"
                    placeholder="Blog Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    rows={10}
                    placeholder="Write your blog content..."
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
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
                        setAttachment(
                            e.target.files?.[0]
                            || null
                        )
                    }
                />

                <button
                    className="action-btn"
                    onClick={handleSubmit}
                >
                    Publish Blog
                </button>

            </div>

        </div>
    );
}

export default CreateBlog;