import "../styles/ForgotPassword.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { forgotPassword } from "../services/AuthService";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleForgotPassword = async () => {

        try {

            const response = await forgotPassword({
                email
            });

            setSuccessMessage(response.message);
            setErrorMessage("");

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        }
        catch (error: any) {

            setErrorMessage(error.message);
            setSuccessMessage("");

        }

    };

    return (

        <div className="forgot-page">

            <div className="forgot-container">

                <div className="forgot-card">

                    <h2 className="forgot-title">
                        Forgot Password
                    </h2>

                    <p className="forgot-text">
                        Enter your registered email address.
                    </p>
                    {
                        successMessage && (
                            <div className="success-message">
                                {successMessage}
                            </div>
                        )
                    }

                    {
                        errorMessage && (
                            <div className="error-message">
                                {errorMessage}
                            </div>
                        )
                    }

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <button
                        onClick={handleForgotPassword}
                    >
                        Send Reset Link
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ForgotPassword;