import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../services/VideoService";
import "../styles/UploadVideo.css";


function UploadVideo() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const handleUpload = async () => {

        try {

            const userId =
                Number(localStorage.getItem("userId"));

            if (!videoFile) {

                alert("Please select a video");

                return;
            }

            await uploadVideo(
                userId,
                title,
                description,
                videoFile
            );

            navigate(
                "/student",
                {
                    state: {
                        message:
                            "✅ Video submitted successfully. It will be visible after admin approval."
                    }
                }
            );

        }
        catch (error: any) {

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
            <div className="upload-video-form glass-card">

                <h1 className="page-title">
                    Upload Video 🎥
                </h1>

                <p className="page-subtitle">
                    Share educational videos and help other students learn.
                </p>

                <input
                    type="text"
                    placeholder="Video Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    rows={6}
                    placeholder="Video Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                        setVideoFile(
                            e.target.files?.[0] || null
                        )
                    }
                />

                <button
                    className="action-btn"
                    onClick={handleUpload}
                >
                    Upload Video
                </button>

            </div>

        </div>

    );
}

export default UploadVideo;