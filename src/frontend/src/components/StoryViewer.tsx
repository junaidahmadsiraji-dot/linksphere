import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Story, StoryGroup } from "../types";

interface StoryViewerProps {
  groups: StoryGroup[];
  startGroupIndex: number;
  onClose: () => void;
}

const STORY_DURATION = 5000;

export function StoryViewer({
  groups,
  startGroupIndex,
  onClose,
}: StoryViewerProps) {
  const [groupIndex, setGroupIndex] = useState(startGroupIndex);
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

  const group = groups[groupIndex];
  const story: Story | undefined = group?.stories[storyIndex];

  const goNext = useCallback(() => {
    const currentGroup = groups[groupIndex];
    if (!currentGroup) return;
    if (storyIndex < currentGroup.stories.length - 1) {
      setStoryIndex((i) => i + 1);
      setProgress(0);
      startTimeRef.current = Date.now();
    } else if (groupIndex < groups.length - 1) {
      setGroupIndex((g) => g + 1);
      setStoryIndex(0);
      setProgress(0);
      startTimeRef.current = Date.now();
    } else {
      onClose();
    }
  }, [groups, groupIndex, storyIndex, onClose]);

  const goPrev = useCallback(() => {
    if (storyIndex > 0) {
      setStoryIndex((i) => i - 1);
      setProgress(0);
      startTimeRef.current = Date.now();
    } else if (groupIndex > 0) {
      setGroupIndex((g) => g - 1);
      setStoryIndex(0);
      setProgress(0);
      startTimeRef.current = Date.now();
    }
  }, [groupIndex, storyIndex]);

  useEffect(() => {
    startTimeRef.current = Date.now();
    setProgress(0);
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / STORY_DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= STORY_DURATION) goNext();
    }, 50);
    return () => clearInterval(timer);
  }, [goNext]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  if (!group || !story) return null;

  const imageUrl =
    story.image && typeof story.image.getDirectURL === "function"
      ? story.image.getDirectURL()
      : null;

  const initials = group.authorName.slice(0, 2).toUpperCase();

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full max-w-none max-h-none m-0 p-0 border-0"
      style={{ background: "rgba(0,0,0,0.92)" }}
      aria-label="Story viewer"
      data-ocid="stories.viewer.dialog"
    >
      {/* Story container */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "100%",
          maxWidth: 390,
          height: "100%",
          maxHeight: 700,
          background: "#1a1a1a",
          borderRadius: 12,
        }}
      >
        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 z-10 flex gap-1">
          {group.stories.map((s, i) => (
            <div
              key={s.id.toString()}
              className="flex-1 rounded-full overflow-hidden"
              style={{ height: 3, background: "rgba(255,255,255,0.35)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  background: "white",
                  width:
                    i < storyIndex
                      ? "100%"
                      : i === storyIndex
                        ? `${progress}%`
                        : "0%",
                  transition: "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Author row */}
        <div className="absolute top-8 left-3 right-12 z-10 flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center font-bold text-white text-xs flex-shrink-0 border-2 border-white"
            style={{ background: "#1877F2" }}
          >
            {initials}
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">
              {group.authorName}
            </p>
            <p className="text-white/60 text-[11px]">
              {new Date(Number(story.createdAt) / 1_000_000).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                },
              )}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          data-ocid="stories.viewer.close_button"
          className="absolute top-7 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full transition-colors"
          style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
          aria-label="Close story"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Story image */}
        <div
          className="flex-1 flex items-center justify-center"
          style={{ background: "#111" }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`Story by ${group.authorName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: "#1877F2" }}
            >
              <span className="text-white text-5xl font-bold">
                {group.authorName.slice(0, 1)}
              </span>
            </div>
          )}
        </div>

        {/* Tap zones */}
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-0 top-0 w-1/3 h-full z-10"
          aria-label="Previous story"
          tabIndex={-1}
        />
        <button
          type="button"
          onClick={goNext}
          className="absolute right-0 top-0 w-2/3 h-full z-10"
          aria-label="Next story"
          tabIndex={-1}
        />
      </div>

      {/* Group navigation */}
      {groupIndex > 0 && (
        <button
          type="button"
          onClick={() => {
            setGroupIndex((g) => g - 1);
            setStoryIndex(0);
            setProgress(0);
          }}
          data-ocid="stories.viewer.prev_group"
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center text-white text-2xl transition-colors z-20"
          style={{ background: "rgba(255,255,255,0.15)" }}
          aria-label="Previous user's story"
        >
          ‹
        </button>
      )}
      {groupIndex < groups.length - 1 && (
        <button
          type="button"
          onClick={() => {
            setGroupIndex((g) => g + 1);
            setStoryIndex(0);
            setProgress(0);
          }}
          data-ocid="stories.viewer.next_group"
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center text-white text-2xl transition-colors z-20"
          style={{ background: "rgba(255,255,255,0.15)" }}
          aria-label="Next user's story"
        >
          ›
        </button>
      )}
    </dialog>
  );
}
