
import "../styles/CreateCommunityBlog.css";
import { useState } from "react";

import {
    useNavigate,
    useParams
}
    from "react-router-dom";

import { createBlog } from "../services/BlogService";

function CreateBlog() {

    const navigate = useNavigate();
    const { communityId } =
        useParams();

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

                communityId:
                    Number(
                        communityId
                    ),

                attachmentFile:
                    attachment
            });
            navigate(
                `/community/${communityId}`,
                {
                    state: {
                        message:
                            "✅ Community blog submitted successfully. It will be visible after admin approval."
                    }
                }
            );

        } catch (error: any) {

            alert(error.message);
        }
    };

    return (



        <div className="dashboard-container">

            <button
                className="back-btn"
                onClick={() =>
                    navigate(`/community/${communityId}`)
                }
            >
                ← Back
            </button>

            <h1>Create Blog ✍️</h1>

            <div className="create-blog-form">

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