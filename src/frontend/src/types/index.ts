import type { ExternalBlob as BackendBlob } from "../backend.d";

// Re-export ExternalBlob for use across the app
export type ExternalBlob = BackendBlob;

// Primitive aliases — use the types from backend.d.ts directly
export type UserId = import("../backend.d").UserId;
export type Timestamp = bigint;
export type PostId = bigint;
export type CommentId = bigint;
export type FileId = bigint;
export type ProductId = bigint;
export type ReelId = bigint;
export type StoryId = bigint;
export type NotifId = bigint;

// Enum-like string unions (mirrors backend enums)
export type FriendStatus = "none" | "sent" | "friends" | "received";
export type MediaType = "video" | "image";
export type NotifType =
  | "like_post"
  | "comment_post"
  | "friend_request"
  | "friend_accept"
  | "verified_granted";

// User profile — extended with social features
export interface UserProfile {
  id: UserId;
  username: string;
  avatar?: ExternalBlob;
  createdAt: Timestamp;
  isVerified: boolean;
  isBanned: boolean;
  bio?: string;
  coverPhoto?: ExternalBlob;
}

// Feed types — extended with verified + flag info
export interface PostView {
  id: PostId;
  author: UserId;
  authorName: string;
  authorAvatar?: ExternalBlob;
  authorIsVerified: boolean;
  text: string;
  image?: ExternalBlob;
  createdAt: Timestamp;
  likeCount: bigint;
  commentCount: bigint;
  likedByMe: boolean;
  flagCount: bigint;
}

export interface CommentView {
  id: CommentId;
  postId: PostId;
  author: UserId;
  authorName: string;
  authorAvatar?: ExternalBlob;
  text: string;
  createdAt: Timestamp;
}

export interface PostInput {
  text: string;
  image?: ExternalBlob;
}

// Story types
export interface Story {
  id: StoryId;
  authorId: UserId;
  authorName: string;
  image: ExternalBlob;
  createdAt: Timestamp;
  expiresAt: Timestamp;
  viewedBy: UserId[];
}

export interface StoryGroup {
  authorId: UserId;
  authorName: string;
  stories: Story[];
}

// Reel types
export interface Reel {
  id: ReelId;
  title: string;
  description: string;
  authorId: UserId;
  authorName: string;
  authorIsVerified: boolean;
  mediaUrl: ExternalBlob;
  mediaType: MediaType;
  likedBy: UserId[];
  savedBy: UserId[];
  createdAt: Timestamp;
}

// Friend types
export interface FriendView {
  userId: UserId;
  username: string;
  avatar?: ExternalBlob;
  status: FriendStatus;
  mutualFriendCount: bigint;
}

// Notification types
export interface Notification {
  id: NotifId;
  userId: UserId;
  actorId: UserId;
  actorName: string;
  notifType: NotifType;
  message: string;
  isRead: boolean;
  createdAt: Timestamp;
  targetType?: string;
  targetId?: bigint;
}

// File record
export interface FileRecord {
  id: FileId;
  title: string;
  description: string;
  blob: ExternalBlob;
  uploadedBy: UserId;
  uploaderName: string;
  uploadedAt: Timestamp;
}

// Product
export interface Product {
  id: ProductId;
  title: string;
  description: string;
  price: number;
  image?: ExternalBlob;
  createdBy: UserId;
  createdAt: Timestamp;
}

// Admin types
export interface AdminStats {
  totalUsers: bigint;
  totalPosts: bigint;
  totalFiles: bigint;
  totalProducts: bigint;
}

export interface AnalyticsResult {
  userGrowth: DailyCount[];
  postActivity: DailyCount[];
  engagementStats: EngagementStats;
}

export interface DailyCount {
  date: string;
  count: bigint;
}

export interface EngagementStats {
  totalLikes: bigint;
  totalComments: bigint;
  avgLikesPerPost: bigint;
}
