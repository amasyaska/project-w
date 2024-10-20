import React, {createContext, useMemo, useState} from "react";
import axios from "axios";

type loginParams = { username: string; password: string };
type registerParams = { email: string; username: string; password: string };
type getMessagesParams = { postId: number | string };

type BaseData = {
    error?: string;
};

type User = {
    id: number;
    username: string;
    email: string;
};

export type Post = {
    id: number;
    title: string;
    description: string;
    tags?: string[];
};

const defaultContext = {
    user: null as User | null,
    login: async (_params: loginParams) => ({} as BaseData),
    logout: async () => ({} as BaseData),
    register: async (_params: registerParams) => ({} as BaseData),
    getUser: async () => ({} as BaseData),

    getPosts: async () => ({} as BaseData & { posts: Post[] }),
    getPost: async (_params: getMessagesParams) => ({} as BaseData & { post?: Post }),

    createPost: async (_params: Post) => ({} as BaseData & { postId: number }),
};

// context for managing authentication state
export const AuthContext = createContext(defaultContext);

// create a new axios client for making requests to the API
const client = axios.create({
    baseURL: "http://127.0.0.1:8080/api/",
    withCredentials: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFTOKEN",
    withXSRFToken: true,

    validateStatus: () => true, // don't throw errors on non-2xx responses
});

// provider component that wraps the entire application
export function AuthProvider({children}: Readonly<{ children: React.ReactNode }>) {
    const [user, setUser] = useState(null);

    // fetch the current user when the component mounts
    // useEffect(() => {
    //     client.get("/api/user/").then((response) => {
    //         setUser(response.data);
    //     });
    // }, []);

    // memoize the context value to avoid unnecessary re-renders
    const value = useMemo(
        () => ({
            user,
            login: async (params: loginParams) => {
                const response = await client.post("login", params);
                console.log(response);
                if (response.status !== 200) {
                    return {};
                }
                setUser(response.data || defaultContext.user);
                return {};
            },
            logout: async () => {
                const response = await client.post("logout");
                console.log(response);
                if (response.status !== 200) {
                    return {};
                }
                setUser(null);
                return {};
            },
            register: async (params: registerParams) => {
                const response = await client.post("user", params);
                console.log(response);
                if (response.status !== 200) {
                    return {};
                }
                setUser(response.data || defaultContext.user);
                return {};
            },
            getUser: async () => {
                const response = await client.get("user");
                console.log(response);
                if (response.status !== 200) {
                    return {};
                }
                setUser(response.data || defaultContext.user);
                return {};
            },

            getPosts: async () => {
                const response = await client.get("posts");
                if (response.status !== 200) {
                    return {};
                }
                return response.data;
            },
            getPost: async (params: getMessagesParams) => {
                const postId = Number(params.postId);
                const response = await client.get(`post/${postId}`);
                if (response.status !== 200) {
                    return {};
                }
                return response.data;
            },

            createPost: async (params: Post) => {
                const response = await client.post("post", params);
                if (response.status !== 200) {
                    return {};
                }
                return response.data;
            },
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
