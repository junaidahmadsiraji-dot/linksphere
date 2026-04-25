import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  FileRecord,
  FriendView,
  Notification,
  PostView,
  Product,
  Reel,
  StoryGroup,
  UserProfile,
} from "../types";

// ── Profile ───────────────────────────────────────────────────────────────────

export function useProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile() as Promise<UserProfile | null>;
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Feed / Posts ──────────────────────────────────────────────────────────────

export function usePosts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PostView[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNewsfeed() as Promise<PostView[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Stories ───────────────────────────────────────────────────────────────────

export function useStories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<StoryGroup[]>({
    queryKey: ["stories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStories() as Promise<StoryGroup[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Reels ─────────────────────────────────────────────────────────────────────

export function useReels(page = 0, pageSize = 10) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Reel[]>({
    queryKey: ["reels", page],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReels(BigInt(page), BigInt(pageSize)) as Promise<Reel[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useLikeReel() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (reelId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.likeReel(reelId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reels"] }),
  });
}

export function useSaveReel() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (reelId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveReel(reelId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reels"] }),
  });
}

// ── Friends ───────────────────────────────────────────────────────────────────

export function useFriends() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FriendView[]>({
    queryKey: ["friends"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFriends() as Promise<FriendView[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFriendRequests() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FriendView[]>({
    queryKey: ["friend-requests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFriendRequests() as Promise<FriendView[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFriendSuggestions() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FriendView[]>({
    queryKey: ["friend-suggestions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFriendSuggestions() as Promise<FriendView[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Notifications ─────────────────────────────────────────────────────────────

export function useNotifications() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotifications() as Promise<Notification[]>;
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

// ── Files ─────────────────────────────────────────────────────────────────────

export function useFiles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<FileRecord[]>({
    queryKey: ["files"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFiles() as Promise<FileRecord[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Products ──────────────────────────────────────────────────────────────────

export function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts() as Promise<Product[]>;
    },
    enabled: !!actor && !isFetching,
  });
}
