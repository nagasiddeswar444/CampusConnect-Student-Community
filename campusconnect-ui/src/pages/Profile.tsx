import "../styles/Profile.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getProfile,
    updateProfile,
    uploadProfilePhoto
}
    from "../services/AuthService";

function Profile() {

    const navigate = useNavigate();

    const [profile, setProfile] =
        useState<any>(null);

    const [showEditModal, setShowEditModal] =
        useState(false);

    const [fullName, setFullName] =
        useState("");

    const [department, setDepartment] =
        useState("");

    const [yearOfStudy, setYearOfStudy] =
        useState(1);
    const [selectedImage,
        setSelectedImage] =
        useState<File | null>(null);


    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

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

    const openEditModal = () => {

        setFullName(
            profile.fullName
        );

        setDepartment(
            profile.department
        );

        setYearOfStudy(
            profile.yearOfStudy
        );

        setShowEditModal(true);
    };
    const saveProfile =
        async () => {

            await updateProfile(
                profile.userId,
                fullName,
                department,
                yearOfStudy
            );

            if (selectedImage) {
                await uploadProfilePhoto(
                    profile.userId,
                    selectedImage
                );
            }

            localStorage.setItem(
                "fullName",
                fullName
            );

            setShowEditModal(false);

            loadProfile();

           
        };

    if (!profile) {
        return (
            <div className="dashboard-container">


                Loading...
            </div>
        );
    }

    return (

        <div className="dashboard-container">

            <button
                className="back-btn"
                onClick={() => navigate("/student")}
            >
                ← Back
            </button>

            <div className="profile-card">

                <div className="profile-header">

                  

                        <div className="profile-top">

                            <div className="profile-user">

                                <div className="profile-avatar">

                                    {
                                        profile.profileImagePath ?

                                            (
                                                <img
                                                    src={`http://localhost:5000/${profile.profileImagePath}`}
                                                    alt="Profile"
                                                    className="profile-photo"
                                                />
                                            )

                                            :

                                            "👤"
                                    }

                                </div>

                                <h1>{profile.fullName}</h1>

                                <p>{profile.email}</p>

                            </div>

                            <button
                                className="action-btn"
                                onClick={openEditModal}
                            >
                                ✏️ Edit Profile
                            </button>

                        </div>


                    </div>


                <div
                    className="profile-grid"
                >

                    <div className="profile-stat">

                        <h3>
                            Department
                        </h3>

                        <p>
                            {
                                profile.department
                            }
                        </p>

                    </div>

                    <div className="profile-stat">

                        <h3>
                            Year
                        </h3>

                        <p>
                            {
                                profile.yearOfStudy
                            }
                        </p>

                    </div>

                    <div className="profile-stat">

                        <h3>
                            Joined
                        </h3>

                        <p>
                            {
                                new Date(
                                    profile.joinedDate
                                )
                                    .toLocaleDateString()
                            }
                        </p>

                    </div>

                </div>

            <h2 className="profile-section-title">
                📊 Statistics
            </h2>

                <div
                    className="stats-grid"
                >

                    <div
                        className="stat-card"
                    >
                        <h3>
                            Blogs
                        </h3>

                        <p>
                            {
                                profile.totalBlogs
                            }
                        </p>
                    </div>

                    <div
                        className="stat-card"
                    >
                        <h3>
                            Videos
                        </h3>

                        <p>
                            {
                                profile.totalVideos
                            }
                        </p>
                    </div>

                    <div
                        className="stat-card"
                    >
                        <h3>
                            Likes
                        </h3>

                        <p>
                            {
                                profile.totalLikes
                            }
                        </p>
                    </div>

                </div>

            </div>
            {
                showEditModal && (

                    <div className="modal-overlay">

                        <div className="modal-box">

                            <h2>
                                Edit Profile 👤
                            </h2>

                            <input
                                value={fullName}
                                onChange={(e) =>
                                    setFullName(
                                        e.target.value
                                    )
                                }
                                placeholder="Full Name"
                            />

                            <input
                                value={department}
                                onChange={(e) =>
                                    setDepartment(
                                        e.target.value
                                    )
                                }
                                placeholder="Department"
                            />

                            <input
                                type="number"
                                value={yearOfStudy}
                                onChange={(e) =>
                                    setYearOfStudy(
                                        Number(
                                            e.target.value
                                        )
                                    )
                                }
                            /><div>

                                <label>
                                    Profile Photo
                                </label>

                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={(e) =>
                                        setSelectedImage(
                                            e.target.files?.[0]
                                            || null
                                        )
                                    }
                                />

                            </div>

                            <div
                                className="modal-buttons"
                            >

                                <button
                                    className="action-btn"
                                    onClick={
                                        saveProfile
                                    }
                                >
                                    Save
                                </button>

                                <button
                                    className="cancel-btn"
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

        </div>

    );
}

export default Profile;