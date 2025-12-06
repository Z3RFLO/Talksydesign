export interface User {
    username: string;
    avatar?: string;
    handle?: string;
}

export interface Comment {
    id: number | string;
    author: string;
    avatar: string;
    content: string;
    time: string;
    likes: number;
    replies?: Comment[];
}

export interface Post {
    id: number | string;
    author: string;
    handle: string;
    avatar: string;
    content: string;
    likes: number;
    comments: number;
    accent?: string;
    time: string;
    tags?: string[];
    isBoosted?: boolean;
}

export interface Notification {
    // Add notification shape if needed later
    id: number;
    message: string;
}
