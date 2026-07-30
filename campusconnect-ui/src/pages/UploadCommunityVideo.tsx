import { useState } from "react";
import "../styles/UploadCommunityVideo.css";
import {
    useNavigate,
    useParams
}
    from "react-router-dom";
import { uploadVideo } from "../services/VideoService";


function UploadVideo() {

    const navigate = useNavigate();
    const { communityId } =
        useParams();

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
                videoFile,
                Number(
                    communityId
                )
            );

            navigate(
                `/community/${communityId}`, 
                {
                    state: {
                        message:
                            "✅ Community video submitted successfully. It will be visible after admin approval."
                    }
                }
            );

        }
        catch (error: any) {

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

            <h1>
                Upload Video 🎥
            </h1>

            <div className="create-blog-form">

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