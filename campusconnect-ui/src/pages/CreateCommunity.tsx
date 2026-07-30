import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCommunity }
    from "../services/CommunityService";

import "../styles/CreateCommunity.css";

function CreateCommunity() {

    const navigate =
        useNavigate();

    const [communityName,
        setCommunityName] =
        useState("");

    const [description,
        setDescription] =
        useState("");

    const handleSubmit =
        async () => {

            try {

                const createdBy =
                    Number(
                        localStorage.getItem(
                            "userId"
                        )
                    );

                await createCommunity({
                    communityName,
                    description,
                    createdBy
                });

                navigate(
                    "/student",
                    {
                        state: {
                            message:
                                "✅ Community submitted successfully. It will be visible after admin approval."
                        }
                    }
                );

            }
            catch {

                alert(
                    "Failed to create community"
                );

            }
        };

    return (
        <div className="dashboard-container create-community-page">

            <button
                className="back-btn"
                onClick={() => navigate("/student")}
            >
                ← Back
            </button>

            <div className="create-community-form glass-card">

                <h1 className="community-page-title">
                    Create Community
                </h1>

                <p className="community-page-subtitle">
                    Build a community where students can collaborate,
                    share blogs and videos.
                </p>

                <input
                    type="text"
                    placeholder="Community Name"
                    value={communityName}
                    onChange={(e) =>
                        setCommunityName(e.target.value)
                    }
                />

                <textarea
                    rows={4}
                    placeholder="Community Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <button
                    className="action-btn"
                    onClick={handleSubmit}
                >
                    Create Community
                </button>

            </div>

                

        </div>

    );
}

export default CreateCommunity;