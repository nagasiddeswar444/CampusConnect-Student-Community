import "../styles/MyVideos.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getVideosByUser,
    updateVideo,
    deleteVideo
}
    from "../services/VideoService";

function MyVideos() {

    const navigate = useNavigate();

    const [videos, setVideos] =
        useState<any[]>([]);

    const [showEditModal, setShowEditModal] =
        useState(false);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [selectedVideo, setSelectedVideo] =
        useState<any>(null);

    const [editTitle, setEditTitle] =
        useState("");

    const [editDescription, setEditDescription] =
        useState("");

    useEffect(() => {

        loadVideos();

    }, []);

    const loadVideos = async () => {

        const userId =
            Number(
                localStorage.getItem("userId")
            );

        const data =
            await getVideosByUser(userId);

        setVideos(data);
    };
    const handleEdit = (
        video: any
    ) => {

        setSelectedVideo(video);

        setEditTitle(video.title);

        setEditDescription(
            video.description
        );

        setShowEditModal(true);
    };

    const saveVideo = async () => {

        const userId =
            Number(
                localStorage.getItem(
                    "userId"
                )
            );

        await updateVideo(
            selectedVideo.videoId,
            userId,
            editTitle,
            editDescription
        );

        setShowEditModal(false);

        loadVideos();

        
    }; 
    const handleDelete = (
        video: any
    ) => {

        setSelectedVideo(video);

        setShowDeleteModal(true);
    };
    const confirmDelete = async () => {

        const userId =
            Number(
                localStorage.getItem(
                    "userId"
                )
            );

        await deleteVideo(
            selectedVideo.videoId,
            userId
        );

        setShowDeleteModal(false);

        loadVideos();

        
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
                My Videos 🎥
            </h1>

            {
                videos.length === 0 ?

                    (

                        <div className="empty-state">

                            <h2>
                                🎥 No Videos Yet
                            </h2>

                            <p>
                                Upload your first video and help
                                fellow students learn something new.
                            </p>

                            <h4>
                                "Small steps today become great achievements tomorrow."
                            </h4>

                        </div>

                    )

                    :

                    videos.map((video) => (

                        <div
                            key={video.videoId}
                            className="video-card"
                        >

                        <h3>
                            {video.title}
                        </h3>

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

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                marginTop: "15px"
                            }}
                        >

                                <div className="video-actions">

                                    <button className="action-btn">
                                        Edit
                                    </button>

                                    <button className="delete-btn">
                                        Delete
                                    </button>

                                </div>

                        </div>

                    </div>

                ))
            }

            {
                showEditModal && (

                    <div className="modal-overlay">

                        <div className="modal-box">

                            <h2>
                                Edit Video 🎥
                            </h2>

                            <input
                                value={editTitle}
                                onChange={(e) =>
                                    setEditTitle(
                                        e.target.value
                                    )
                                }
                            />

                            <textarea
                                rows={6}
                                value={editDescription}
                                onChange={(e) =>
                                    setEditDescription(
                                        e.target.value
                                    )
                                }
                            />

                            <div
                                className="modal-buttons"
                            >

                                <button
                                    className="action-btn"
                                    onClick={saveVideo}
                                >
                                    Save
                                </button>

                                <button
                                    className="action-btn"
                                    onClick={() =>
                                        setShowEditModal(false)
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
                                ⚠️ Delete Video
                            </h2>

                            <p>
                                Are you sure you want
                                to delete this video?
                            </p>

                            <h4>
                                {selectedVideo?.title}
                            </h4>

                            <div
                                className="modal-buttons"
                            >

                                <button
                                    className="action-btn"
                                    onClick={() =>
                                        setShowDeleteModal(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={confirmDelete}
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

export default MyVideos;