import "../styles/Login.css";
import studentImage from "../assets/student.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/AuthService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await loginUser({
                email,
                password
            });

            localStorage.setItem(
                "token",
                response.token
            );

            localStorage.setItem(
                "userId",
                response.userId
            );

            localStorage.setItem(
                "fullName",
                response.fullName
            );

            localStorage.setItem(
                "email",
                response.email
            );

            localStorage.setItem(
                "roleName",
                response.roleName
            );

           

            if (response.roleName === "Admin") {
                navigate("/admin");
            }
            else {
                navigate("/student");
            }
        }
        catch (error: any) {

            if (
                error.message.includes("create your password")
            ) {

                alert(
                    "Your account has been approved. Please create your password using the email sent by CampusConnect."
                );

            }
            else {

                alert(error.message);

            }

        }
    };

    return (
        <div className="login-page">

            <div className="left-panel">

                <div className="brand">
                    <h1 className="campus">CAMPUS</h1>
                    <h1 className="connect">CONNECT</h1>
                </div>

                <img
                    src={studentImage}
                    alt="Students"
                    className="student-image"
                />

                <h2 className="main-title">
                    Connect.
                    <br />
                    Learn.
                    <br />
                    Share.
                    <br />
                    Grow.
                </h2>

                <p className="description">
                    Empowering students to connect,
                    learn together, share ideas and
                    build a better future.
                </p>

                <div className="feature-box">
                    <div>👥 Connect</div>
                    <div>📚 Learn</div>
                    <div>💡 Share</div>
                    <div>🚀 Grow</div>
                </div>

                <div className="quote-box">
                    <h3>💡 Daily Inspiration</h3>

                    <p>
                        "Education is the passport to the future,
                        for tomorrow belongs to those who prepare
                        for it today."
                    </p>

                    <span>- Malcolm X</span>
                </div>

            </div>

            <div className="right-panel">

                <div className="login-card">

                    <h2 className="welcome">
                        Welcome Back 👋
                    </h2>

                    <p className="login-text">
                        Login to access CampusConnect and continue learning with your community.
                    </p>

                    <div className="input-group">

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>

                    <div className="input-group">

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </div>

                    <p
                        className="register-link"
                        onClick={() => navigate("/forgot-password")}
                    >
                        Forgot Password?
                    </p>

                    <button
                        className="login-btn"
                        onClick={handleLogin}
                    >
                        Login →
                    </button>

                    <p className="register-text">
                        Don't have an account?

                        <span
                            className="register-link"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;