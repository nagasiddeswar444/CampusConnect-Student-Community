import "../styles/Register.css";
import studentImage from "../assets/student.png";
import { useState } from "react";
import { registerUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    
    const [department, setDepartment] = useState("");
    const [yearOfStudy, setYearOfStudy] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleRegister = async () => {

        try {

            const response = await registerUser({
                fullName,
                email,
                
                department,
                yearOfStudy: Number(yearOfStudy)
            });

            setSuccessMessage(response.message);

            setErrorMessage("");

            setFullName("");
            setEmail("");
            
            setDepartment("");
            setYearOfStudy("");

        }
        catch (error: any) {

            setErrorMessage(error.message);

            setSuccessMessage("");

        }
    };

    return (
        <div className="register-page">

            <div className="register-left">

                <div className="register-brand">
                    <h1 className="campus">CAMPUS</h1>
                    <h1 className="connect">CONNECT</h1>
                </div>

                <img
                    src={studentImage}
                    alt="Students"
                    className="register-image"
                />

                <h2 className="register-title">
                    Join.
                    <br />
                    Connect.
                    <br />
                    Learn.
                    <br />
                    Succeed.
                </h2>

                <p className="register-description">
                    Become part of a vibrant student
                    community where knowledge sharing
                    creates opportunities.
                </p>

                <div className="register-quote">
                    <h3>🌟 Student Success</h3>

                    <p>
                        "Success is not final, failure is not fatal:
                        it is the courage to continue that counts."
                    </p>

                    <span>- Winston Churchill</span>
                </div>

            </div>

            <div className="register-right">

                <div className="register-card">

                    <h2 className="register-welcome">
                        Create Account 🚀
                    </h2>

                    <p className="register-text">
                        Start your CampusConnect journey.
                    </p>

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
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                   

                    <input
                        type="text"
                        placeholder="Department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Year Of Study"
                        value={yearOfStudy}
                        onChange={(e) => setYearOfStudy(e.target.value)}
                    />

                    <button onClick={handleRegister}>
                        Register
                    </button>

                    <p
                        className="register-link"
                        onClick={() => navigate("/login")}
                    >
                        Already have an account? Login
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;