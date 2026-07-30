import "../styles/CreatePassword.css";

import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import {
    useNavigate,
    useLocation
} from "react-router-dom";

import {
    createPassword,
    resetPassword
} from "../services/AuthService";



function CreatePassword() {

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const location = useLocation();

    const isResetPassword =
        location.pathname === "/reset-password";

    const token =
        searchParams.get("token");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const handleCreatePassword = async () => {

        if (password !== confirmPassword) {

            setErrorMessage("Passwords do not match.");
            return;

            
        }

        try {

            const response =
                isResetPassword
                    ? await resetPassword({
                        token,
                        password
                    })
                    : await createPassword({
                        token,
                        password
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

        <div className="create-password-page">

            <div className="create-password-container">

                <div className="create-password-card">

                    <h2 className="create-password-title">
                        {isResetPassword
                            ? "Reset Password"
                            : "Create Password"}
                    </h2>

                    <p className="create-password-text">
                        {isResetPassword
                            ? "Enter your new password."
                            : "Welcome to CampusConnect. Create your password to activate your account."}
                    </p>

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />


                    {
                        successMessage &&
                        <div className="success-message">
                            {successMessage}
                        </div>
                    }

                    {
                        errorMessage &&
                        <div className="error-message">
                            {errorMessage}
                        </div>
                    }

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                    />

                    <button
                        onClick={handleCreatePassword}
                    >
                        Create Password
                    </button>

                </div>

            </div>

        </div>

    );

}

export default CreatePassword;