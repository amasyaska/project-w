type DummyData = {
    posts: {
        [key: string]: {
            title: string;
            description: string;
        };
    };
};

const TEST_DATA = {
    'posts': {
        '1': {
            title: "Post 1",
            description: "Description 1",
            tags: ["tag1", "tag2"],
        },
        '2': {
            title: "Post 2",
            description: "Description 2",
        },
    }
} as DummyData;

async function asRequest<T>(data: T) {
    return {
        ...data,
        error: null,
    };
}

async function getPosts() {
    return asRequest({
        posts: Object.entries(TEST_DATA.posts)
            .map(([id, post]) => ({id: parseInt(id), ...post}))
    });
}

async function getPost({postId}: { postId: string }) {
    const post = TEST_DATA.posts[postId];
    return asRequest(post ? {post} : {});
}

export default function useTestAuth() {
    return {
        user: null,
        login: async () => ({}),
        logout: async () => ({}),
        register: async () => ({}),
        getUser: async () => ({}),
        getPosts,
        getPost,
        createPost: async () => ({postId: 0}),
    };
}
