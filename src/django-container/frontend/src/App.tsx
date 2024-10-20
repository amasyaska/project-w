import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";

import Auth from "@pages/Auth";
import NotFound from "@pages/NotFound";
import Wombat from "@pages/Wombat";
import Logout from "@pages/Logout";
import Home from "@pages/Home";
import Header from "@components/Header.tsx";
import Footer from "@components/Footer.tsx";
import Post from "@pages/Post.tsx";
import Profile from "@pages/Profile";
import Posts from "@pages/Posts";
import Agreement from "@components/Agreement";
import Creation from "@components/Creation";

export default function App() {
    return (
        <BrowserRouter>
            <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/login" element={<Auth/>}/>
                    <Route path="/register" element={<Auth registering/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/profile" element={<Profile/>}/>

                    <Route path="/posts" element={<Posts/>}/>
                    <Route path="/post/:postId" element={<Post/>}/>

                    <Route path="/dev/agreement" element={<Agreement/>}/>
                    <Route path="/creation" element={<Creation/>}/>

                    <Route path="/wombat" element={<Wombat/>}/>

                    <Route path="/*" element={<NotFound/>}/>
                </Routes>
            <Footer/>
        </BrowserRouter>
    );
}
