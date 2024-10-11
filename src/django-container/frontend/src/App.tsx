import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "@pages/Home";
import Auth from "@pages/Auth";
import Chat from "@pages/chat/Chat";
import NotFound from "@pages/NotFound";
import Wombat from "@pages/Wombat";
import Logout from "@pages/Logout";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Chat />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/register" element={<Auth registering />} />
                <Route path="/logout" element={<Logout />} />

                <Route path="/chat/:chatId" element={<Chat />} />
                <Route path="/wombat" element={<Wombat />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
