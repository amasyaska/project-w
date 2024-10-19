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
};

const defaultContext = {
    user: null as User | null,
    login: async (_params: loginParams) => ({} as BaseData),
    logout: async () => ({} as BaseData),
    register: async (_params: registerParams) => ({} as BaseData),
    getUser: async () => ({} as BaseData),

    getPosts: async () => ({} as BaseData & { posts?: Post[] }),
    getPost: async (_params: getMessagesParams) => ({} as BaseData & { post?: Post }),
};

// context for managing authentication state
export const AuthContext = createContext(defaultContext);

// create a new axios client for making requests to the API
const client = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
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
                const response = await client.post("login/", params);
                console.log(response);
                if (response.status !== 200) {
                    return {};
                }
                setUser(response.data || defaultContext.user);
                return {};
            },
            logout: async () => {
                const response = await client.post("logout/");
                console.log(response);
                if (response.status !== 200) {
                    return {};
                }
                setUser(null);
                return {};
            },
            register: async (params: registerParams) => {
                const response = await client.post("register/", params);
                console.log(response);
                if (response.status !== 200) {
                    return {};
                }
                setUser(response.data || defaultContext.user);
                return {};
            },
            getUser: async () => {
                const response = await client.get("user/");
                console.log(response);
                if (response.status !== 200) {
                    return {};
                }
                setUser(response.data || defaultContext.user);
                return {};
            },

            getPosts: async () => {
                const response = await client.get("posts/");
                if (response.status !== 200) {
                    return {};
                }
                return response.data;
            },
            getPost: async (params: getMessagesParams) => {
                return {
                    post: {
                        title: "Збір на FPV для 3 ОШБ",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet luctus velit, sed bibendum turpis. Curabitur ac tempus turpis. Etiam vel convallis orci. Phasellus sed volutpat lorem, quis tristique ex. Nunc eget ligula quis lacus rhoncus iaculis. Aenean mauris urna, malesuada vel justo vitae, pretium euismod sem. Sed molestie porttitor dui, eget sagittis odio lobortis vel. Maecenas condimentum in sapien non commodo.\n" +
                            "\n" +
                            "Cras rhoncus quam et dolor cursus, ut posuere eros venenatis. Praesent massa ligula, pulvinar nec ultricies pellentesque, mattis porttitor nibh. Donec eget posuere neque, et rhoncus arcu. Aliquam ac pulvinar quam, ut mollis mauris. Sed non placerat nisi. Phasellus consequat turpis enim, eu condimentum lacus convallis a. In at convallis odio. Vivamus vel volutpat metus. Quisque eget nulla in libero consectetur venenatis id eu augue. Nunc tempor, elit pellentesque aliquet molestie, magna massa lobortis nibh, id mollis urna elit et neque.\n" +
                            "\n" +
                            "Sed varius ex leo, consectetur rutrum erat vestibulum nec. Nunc non nisl dui. Quisque porta feugiat enim a elementum. Suspendisse commodo consectetur condimentum. Nunc id leo finibus, venenatis felis luctus, molestie turpis. Vestibulum a quam eu nunc dictum iaculis. Integer quis augue in dolor convallis dictum vitae at mauris.\n" +
                            "\n" +
                            "Nunc nisl risus, accumsan a libero gravida, aliquet efficitur arcu. Phasellus euismod, dui eu blandit sagittis, neque felis euismod nibh, at maximus erat justo a augue. Cras sed lorem felis. In lacinia elit eu erat pulvinar, ut laoreet massa porta. Cras vel maximus velit. Integer quis est eu orci aliquet fermentum. In at lectus hendrerit, fermentum purus ac, consequat libero. Donec velit lacus, efficitur vel massa et, posuere pellentesque velit. Curabitur quis odio varius, lacinia elit in, interdum risus. Nulla eget justo rhoncus, lobortis tellus sit amet, commodo lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum maximus placerat massa vitae consequat. Mauris imperdiet mauris a nisi ornare, ac vestibulum arcu fermentum. Suspendisse potenti. Phasellus eget diam at magna tincidunt lacinia vitae id nunc. Ut iaculis vulputate nisl, id ultricies purus sodales eu.\n" +
                            "\n" +
                            "Suspendisse sed ornare arcu, ac pretium magna. Aliquam arcu elit, sodales a bibendum non, tincidunt gravida quam. Nunc laoreet semper interdum. Cras augue velit, auctor non dictum quis, condimentum in neque. Cras facilisis vel elit sit amet pellentesque. Aenean vel eros quis nisl semper pulvinar sed quis urna. Mauris vitae lorem non risus blandit consequat mollis id urna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur venenatis ultricies pharetra. Vestibulum quis purus tristique, euismod tortor sit amet, tincidunt massa. Praesent dapibus consectetur tellus, ac vestibulum nibh tempus id.",
                        progress: {
                            current: 2352,
                            goal: 10000,
                        }
                    }
                };
                const postId = Number(params.postId);
                const response = await client.get(`post/${postId}/`);
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
