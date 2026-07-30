import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import CreateBlog from "./pages/CreateBlog";
import UploadVideo from "./pages/UploadVideo";

import MyBlogs from "./pages/MyBlogs";

import MyVideos from "./pages/MyVideos";

import Profile from "./pages/Profile";
import AdminProfile
    from "./pages/AdminProfile";

import CreateCommunity
    from "./pages/CreateCommunity";

import DiscoverCommunities
    from "./pages/DiscoverCommunities";

import MyCommunities
    from "./pages/MyCommunities";

import CommunityHome
    from "./pages/CommunityHome";

import CreateCommunityBlog
    from "./pages/CreateCommunityBlog";

import UploadCommunityVideo
    from "./pages/UploadCommunityVideo";

import CreatePassword from "./pages/CreatePassword";

import ForgotPassword from "./pages/ForgotPassword";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/student" element={<StudentDashboard />} />

                <Route path="/admin" element={<AdminDashboard />} />
                <Route
                    path="/create-blog"
                    element={<CreateBlog />}
                />
                <Route
                    path="/upload-video"
                    element={<UploadVideo />}
                />
                <Route
                    path="/my-blogs"
                    element={<MyBlogs />}
                />
                <Route
                    path="/my-videos"
                    element={<MyVideos />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />
                <Route
                    path="/admin-profile"
                    element={<AdminProfile />}
                />

                <Route
                    path="/create-community"
                    element={<CreateCommunity />}
                />

                <Route
                    path="/discover-communities"
                    element={
                        <DiscoverCommunities />
                    }
                />

                <Route
                    path="/my-communities"
                    element={
                        <MyCommunities />
                    }
                />

                <Route
                    path="/community/:communityId"
                    element={
                        <CommunityHome />
                    }
                />

                <Route
                    path="/community/:communityId/create-blog"
                    element={
                        <CreateCommunityBlog />
                    }
                />

                <Route
                    path="/community/:communityId/upload-video"
                    element={
                        <UploadCommunityVideo />
                    }
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />


                <Route
                    path="/create-password"
                    element={<CreatePassword />}
                />

                <Route
                    path="/reset-password"
                    element={<CreatePassword />}
                />
            </Routes>

           

           
          
        </BrowserRouter>
    );
}

export default App;