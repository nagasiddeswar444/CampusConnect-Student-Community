import "../styles/AdminCommon.css";
import "../styles/AdminProfile.css";
import "../styles/AdminProfile.css";
import {
    useNavigate,
    useLocation
}
    from "react-router-dom";

import {
    getProfile,
    uploadProfilePhoto
}
    from "../services/AuthService";



import {
    useEffect,
    useState,
    useRef
}
    from "react";

function AdminProfile() {

    const navigate =
        useNavigate();

    const location =
        useLocation();

    const {
        totalStudents,
        totalBlogs,
        totalVideos
    } = location.state || {};

    const [profile,
        setProfile] =
        useState<any>(null);

    useEffect(() => {

        loadProfile();

    }, []);
    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const loadProfile =
        async () => {

            const userId =
                Number(
                    localStorage.getItem(
                        "userId"
                    )
                );

            const data =
                await getProfile(
                    userId
                );

            setProfile(data);
        };


    const handlePhotoUpload =
        async (
            event: React.ChangeEvent<HTMLInputElement>
        ) => {

            const file =
                event.target.files?.[0];

            if (!file)
                return;

            const userId =
                Number(
                    localStorage.getItem(
                        "userId"
                    )
                );

            try {

                await uploadProfilePhoto(
                    userId,
                    file
                );

                alert(
                    "Profile photo uploaded successfully"
                );

                loadProfile();

            }
            catch {

                alert(
                    "Upload failed"
                );
            }
        };

    return (

        <div className="admin-profile-container">

            <button
                className="back-btn"
                onClick={() => navigate("/admin")}
            >
                ← Back
            </button>

            <h1 className="admin-profile-title">
                Admin Profile
            </h1>

            <p className="admin-profile-subtitle">
                Manage your administrator account and dashboard overview.
            </p>

            <div className="admin-profile-card glass-card">

                <img
                    src={
                        profile?.profileImagePath
                            ? `http://localhost:5000/${profile.profileImagePath}`
                            : "https://via.placeholder.com/150"
                    }
                    alt="Admin"
                    className="admin-profile-photo"
                />

                <h2>
                    {profile?.fullName || "Admin"}
                </h2>

                <p>
                    {profile?.email}
                </p>

                <div className="admin-role-badge">
                    👑 Administrator
                </div>

            </div>

            <div className="admin-stats-grid">

                <div className="admin-stat-card glass-card">

                    <h3>
                        Students
                    </h3>

                    <p>
                        {totalStudents}
                    </p>

                </div>

                <div className="admin-stat-card glass-card">

                    <h3>
                        Blogs
                    </h3>

                    <p>
                        {totalBlogs}
                    </p>

                </div>

                <div className="admin-stat-card glass-card">

                    <h3>
                        Videos
                    </h3>

                    <p>
                        {totalVideos}
                    </p>

                </div>

            </div>

            <div className="admin-profile-actions">

                <>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{
                            display: "none"
                        }}
                        onChange={
                            handlePhotoUpload
                        }
                    />

                    <button
                        className="profile-action-btn"
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                    >
                        Upload Photo
                    </button>
                </>

                

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

    );
}

export default AdminProfile;