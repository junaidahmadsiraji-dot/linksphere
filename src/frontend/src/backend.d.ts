import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Reel {
    id: ReelId;
    title: string;
    authorId: UserId;
    createdAt: Timestamp;
    authorName: string;
    description: string;
    likedBy: Array<UserId>;
    mediaUrl: ExternalBlob;
    authorIsVerified: boolean;
    savedBy: Array<UserId>;
    mediaType: MediaType;
}
export type ReelId = bigint;
export type Timestamp = bigint;
export interface Product {
    id: ProductId;
    title: string;
    createdAt: Timestamp;
    createdBy: UserId;
    description: string;
    image?: ExternalBlob;
    price: number;
}
export interface FileInput {
    title: string;
    blob: ExternalBlob;
    description: string;
}
export type PostId = bigint;
export interface PostView {
    id: PostId;
    likeCount: bigint;
    authorAvatar?: ExternalBlob;
    createdAt: Timestamp;
    text: string;
    authorName: string;
    author: UserId;
    authorIsVerified: boolean;
    commentCount: bigint;
    image?: ExternalBlob;
    likedByMe: boolean;
    flagCount: bigint;
}
export interface AnalyticsResult {
    userGrowth: Array<DailyCount>;
    postActivity: Array<DailyCount>;
    engagementStats: EngagementStats;
}
export interface AdminSession {
    token: AdminSessionToken;
    createdAt: Timestamp;
    adminEmail: string;
}
export interface DailyCount {
    date: string;
    count: bigint;
}
export interface ReelInput {
    title: string;
    description: string;
    mediaUrl: ExternalBlob;
    mediaType: MediaType;
}
export interface StoryInput {
    image: ExternalBlob;
}
export type NotifId = bigint;
export interface ProductInput {
    title: string;
    description: string;
    image?: ExternalBlob;
    price: number;
}
export type CommentId = bigint;
export interface StoryGroup {
    authorId: UserId;
    stories: Array<Story>;
    authorName: string;
}
export type StoryId = bigint;
export interface Story {
    id: StoryId;
    expiresAt: Timestamp;
    authorId: UserId;
    createdAt: Timestamp;
    authorName: string;
    viewedBy: Array<UserId>;
    image: ExternalBlob;
}
export interface EngagementStats {
    avgLikesPerPost: bigint;
    totalLikes: bigint;
    totalComments: bigint;
}
export interface CommentView {
    id: CommentId;
    authorAvatar?: ExternalBlob;
    createdAt: Timestamp;
    text: string;
    authorName: string;
    author: UserId;
    postId: PostId;
}
export type UserId = Principal;
export interface AdminStats {
    totalProducts: bigint;
    totalFiles: bigint;
    totalUsers: bigint;
    totalPosts: bigint;
}
export interface Notification {
    id: NotifId;
    actorName: string;
    notifType: NotifType;
    userId: UserId;
    createdAt: Timestamp;
    isRead: boolean;
    actorId: UserId;
    message: string;
    targetType?: string;
    targetId?: bigint;
}
export interface FileRecord {
    id: FileId;
    title: string;
    uploaderName: string;
    blob: ExternalBlob;
    description: string;
    uploadedAt: Timestamp;
    uploadedBy: UserId;
}
export type ProductId = bigint;
export interface PostInput {
    text: string;
    image?: ExternalBlob;
}
export type FileId = bigint;
export type AdminSessionToken = string;
export interface UserProfile {
    id: UserId;
    bio?: string;
    username: string;
    createdAt: Timestamp;
    coverPhoto?: ExternalBlob;
    isVerified: boolean;
    isBanned: boolean;
    avatar?: ExternalBlob;
}
export interface FriendView {
    status: FriendStatus;
    mutualFriendCount: bigint;
    username: string;
    userId: UserId;
    avatar?: ExternalBlob;
}
export enum FriendStatus {
    none = "none",
    sent = "sent",
    friends = "friends",
    received = "received"
}
export enum MediaType {
    video = "video",
    image = "image"
}
export enum ModerationAction {
    approve = "approve",
    delete_ = "delete"
}
export enum NotifType {
    like_post = "like_post",
    friend_accept = "friend_accept",
    comment_post = "comment_post",
    verified_granted = "verified_granted",
    friend_request = "friend_request"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    acceptFriendRequest(from: UserId): Promise<void>;
    addAdmin(token: AdminSessionToken, email: string, password: string): Promise<void>;
    addComment(postId: PostId, text: string): Promise<CommentView>;
    adminBanUser(token: AdminSessionToken, userId: UserId): Promise<void>;
    adminLogin(email: string, password: string): Promise<AdminSession | null>;
    adminLogout(token: AdminSessionToken): Promise<void>;
    adminUnbanUser(token: AdminSessionToken, userId: UserId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    banUser(token: AdminSessionToken, userId: UserId): Promise<void>;
    cancelFriendRequest(to: UserId): Promise<void>;
    createPost(input: PostInput): Promise<PostView>;
    createProduct(input: ProductInput): Promise<Product>;
    createReel(input: ReelInput): Promise<Reel>;
    createStory(input: StoryInput): Promise<Story>;
    deleteComment(commentId: CommentId): Promise<boolean>;
    deleteFile(fileId: FileId): Promise<boolean>;
    deletePost(postId: PostId): Promise<boolean>;
    deleteProduct(productId: ProductId): Promise<boolean>;
    deleteReel(reelId: ReelId): Promise<boolean>;
    deleteStory(storyId: StoryId): Promise<boolean>;
    deleteUser(token: AdminSessionToken, userId: UserId): Promise<void>;
    flagPost(postId: PostId, reason: string): Promise<void>;
    getAdminStats(token: AdminSessionToken): Promise<AdminStats>;
    getAllUsers(token: AdminSessionToken, page: bigint, pageSize: bigint): Promise<Array<UserProfile>>;
    getAnalytics(token: AdminSessionToken): Promise<AnalyticsResult>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFlaggedPosts(token: AdminSessionToken): Promise<Array<PostView>>;
    getFriendRequests(): Promise<Array<FriendView>>;
    getFriendSuggestions(): Promise<Array<FriendView>>;
    getFriends(): Promise<Array<FriendView>>;
    getNewsfeed(): Promise<Array<PostView>>;
    getNotifications(): Promise<Array<Notification>>;
    getPostComments(postId: PostId): Promise<Array<CommentView>>;
    getReels(page: bigint, pageSize: bigint): Promise<Array<Reel>>;
    getSentRequests(): Promise<Array<FriendView>>;
    getStories(): Promise<Array<StoryGroup>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    grantVerifiedTick(token: AdminSessionToken, userId: UserId): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    likePost(postId: PostId): Promise<boolean>;
    likeReel(reelId: ReelId): Promise<boolean>;
    listAdmins(token: AdminSessionToken): Promise<Array<string>>;
    listFiles(): Promise<Array<FileRecord>>;
    listProducts(): Promise<Array<Product>>;
    markAllNotificationsRead(): Promise<void>;
    markNotificationRead(notifId: NotifId): Promise<void>;
    markStoryViewed(storyId: StoryId): Promise<void>;
    moderatePost(token: AdminSessionToken, postId: PostId, action: ModerationAction): Promise<void>;
    rejectFriendRequest(from: UserId): Promise<void>;
    removeAdmin(token: AdminSessionToken, email: string): Promise<void>;
    revokeVerifiedTick(token: AdminSessionToken, userId: UserId): Promise<void>;
    saveCallerUserProfile(username: string, avatar: ExternalBlob | null): Promise<void>;
    saveReel(reelId: ReelId): Promise<boolean>;
    sendFriendRequest(to: UserId): Promise<void>;
    unbanUser(token: AdminSessionToken, userId: UserId): Promise<void>;
    unfriend(userId: UserId): Promise<void>;
    updateProfileAvatar(avatar: ExternalBlob): Promise<void>;
    updateProfileBio(bio: string): Promise<void>;
    updateProfileCoverPhoto(coverPhoto: ExternalBlob): Promise<void>;
    updateProfileUsername(username: string): Promise<void>;
    uploadFile(input: FileInput): Promise<FileRecord>;
    validateAdminSession(token: AdminSessionToken): Promise<boolean>;
}
