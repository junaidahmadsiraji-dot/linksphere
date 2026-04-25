import { UserAvatar } from "@/components/UserAvatar";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob, createActor } from "../backend";

interface EditProfileModalProps {
  currentName: string;
  currentBio?: string;
  currentAvatarUrl?: string;
  onClose: () => void;
}

export function EditProfileModal({
  currentName,
  currentBio = "",
  currentAvatarUrl,
  onClose,
}: EditProfileModalProps) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const [username, setUsername] = useState(currentName);
  const [bio, setBio] = useState(currentBio);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    currentAvatarUrl,
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!actor) return;
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }
    setSaving(true);
    try {
      if (avatarFile) {
        const bytes = new Uint8Array(await avatarFile.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes);
        await actor.saveCallerUserProfile(username.trim(), blob);
      } else {
        await actor.updateProfileUsername(username.trim());
      }
      if (bio.trim() !== currentBio.trim()) {
        try {
          await (
            actor as unknown as {
              updateProfileBio: (b: string) => Promise<void>;
            }
          ).updateProfileBio(bio.trim());
        } catch {
          // bio update is best-effort
        }
      }
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      await queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      toast.success("Profile updated!");
      onClose();
    } catch {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <dialog
      open
      aria-modal="true"
      aria-label="Edit Profile"
      className="fixed inset-0 z-50 m-0 flex h-full w-full max-h-none max-w-none items-end sm:items-center justify-center border-none bg-transparent p-0"
      data-ocid="edit_profile.dialog"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: dialog handles keyboard */}
      <div className="absolute inset-0 -z-10 bg-black/50" onClick={onClose} />

      <div className="relative w-full sm:max-w-lg bg-white dark:bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden">
        {/* Mobile drag handle */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-[#CED0D4]" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#CED0D4]">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            data-ocid="edit_profile.close_button"
            className="w-9 h-9 rounded-full bg-[#E4E6EB] hover:bg-[#D8DADF] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-[#050505]" />
          </button>
          <h2 className="font-bold text-[17px] text-[#050505]">Edit Profile</h2>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            data-ocid="edit_profile.save_button"
            className="px-4 py-1.5 rounded-md bg-[#E7F3FF] text-[#1877F2] text-sm font-semibold hover:bg-[#dbeefe] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Avatar picker */}
          <div>
            <p className="text-[15px] font-semibold text-[#050505] mb-3">
              Profile picture
            </p>
            <div className="flex items-center gap-4">
              <div className="relative">
                <UserAvatar
                  src={avatarPreview}
                  name={username || currentName}
                  size="xl"
                  className="w-16 h-16 ring-2 ring-[#CED0D4]"
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  data-ocid="edit_profile.upload_button"
                  aria-label="Change profile picture"
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#E4E6EB] hover:bg-[#D8DADF] flex items-center justify-center shadow-md transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-[#050505]" />
                </button>
              </div>
              <p className="text-sm text-[#65676B]">
                Tap the camera icon to choose a new photo
              </p>
            </div>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
              data-ocid="edit_profile.dropzone"
            />
          </div>

          {/* Divider */}
          <div className="h-px bg-[#CED0D4]" />

          {/* Display Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="edit-username"
              className="text-[15px] font-semibold text-[#050505]"
            >
              Display Name
            </label>
            <input
              id="edit-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={40}
              placeholder="Your display name"
              data-ocid="edit_profile.input"
              className="w-full px-3 py-2.5 rounded-md border border-[#CED0D4] bg-white dark:bg-muted text-sm text-[#050505] dark:text-foreground placeholder:text-[#65676B] focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] transition-colors"
            />
            <p className="text-xs text-[#65676B] text-right">
              {username.length}/40
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <label
              htmlFor="edit-bio"
              className="text-[15px] font-semibold text-[#050505]"
            >
              Bio
            </label>
            <textarea
              id="edit-bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={160}
              rows={3}
              placeholder="Describe yourself…"
              data-ocid="edit_profile.textarea"
              className="w-full px-3 py-2.5 rounded-md border border-[#CED0D4] bg-white dark:bg-muted text-sm text-[#050505] dark:text-foreground placeholder:text-[#65676B] focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] transition-colors resize-none"
            />
            <p className="text-xs text-[#65676B] text-right">
              {bio.length}/160
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-[#CED0D4] flex gap-2">
          <button
            type="button"
            onClick={onClose}
            data-ocid="edit_profile.cancel_button"
            className="flex-1 py-2 rounded-md border border-[#CED0D4] text-sm font-semibold text-[#050505] hover:bg-[#F2F2F2] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            data-ocid="edit_profile.submit_button"
            className="flex-1 py-2 rounded-md bg-[#1877F2] text-white text-sm font-semibold hover:bg-[#166FE5] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
