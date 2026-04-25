const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DpisiOh5.js","assets/index-CgCVc3nz.css"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, a as useActor, h as useQueryClient, r as reactExports, j as jsxRuntimeExports, U as UserAvatar, b as ue, E as ExternalBlob, d as createActor, u as useAuth, L as LogIn, t as useNavigate, g as useProfile, e as usePosts, q as useFriends, w as LogOut, _ as __vitePreload, x as FileText, y as ShoppingBag, s as Users } from "./index-DpisiOh5.js";
import { X } from "./x-TmiiBXt_.js";
import { C as Camera, M as MapPin, P as PostCard } from "./PostCard-CoVsjtIQ.js";
import { V as VerifiedBadge } from "./VerifiedBadge-BXLXTE2F.js";
import { P as Plus } from "./plus-B_34AA_x.js";
import { m as motion } from "./proxy-Dn7xw19u.js";
import { H as Heart } from "./heart-BgYeM2cY.js";
import { G as Globe } from "./globe-CxiUXvpW.js";
import "./trash-2-ZUW3Dj86.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
];
const GraduationCap = createLucideIcon("graduation-cap", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
function EditProfileModal({
  currentName,
  currentBio = "",
  currentAvatarUrl,
  onClose
}) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [username, setUsername] = reactExports.useState(currentName);
  const [bio, setBio] = reactExports.useState(currentBio);
  const [avatarPreview, setAvatarPreview] = reactExports.useState(
    currentAvatarUrl
  );
  const [avatarFile, setAvatarFile] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const avatarInputRef = reactExports.useRef(null);
  const handleAvatarChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      ue.error("Image must be under 5MB");
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };
  const handleSave = async () => {
    if (!actor) return;
    if (!username.trim()) {
      ue.error("Username cannot be empty");
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
          await actor.updateProfileBio(bio.trim());
        } catch {
        }
      }
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      await queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      ue.success("Profile updated!");
      onClose();
    } catch {
      ue.error("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "dialog",
    {
      open: true,
      "aria-modal": "true",
      "aria-label": "Edit Profile",
      className: "fixed inset-0 z-50 m-0 flex h-full w-full max-h-none max-w-none items-end sm:items-center justify-center border-none bg-transparent p-0",
      "data-ocid": "edit_profile.dialog",
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-black/50", onClick: onClose }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:max-w-lg bg-white dark:bg-card rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-3 pb-1 sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-[#CED0D4]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-[#CED0D4]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "aria-label": "Close",
                "data-ocid": "edit_profile.close_button",
                className: "w-9 h-9 rounded-full bg-[#E4E6EB] hover:bg-[#D8DADF] flex items-center justify-center transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5 text-[#050505]" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-[17px] text-[#050505]", children: "Edit Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSave,
                disabled: saving,
                "data-ocid": "edit_profile.save_button",
                className: "px-4 py-1.5 rounded-md bg-[#E7F3FF] text-[#1877F2] text-sm font-semibold hover:bg-[#dbeefe] transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                children: saving ? "Saving…" : "Save"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-5 max-h-[75vh] overflow-y-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[15px] font-semibold text-[#050505] mb-3", children: "Profile picture" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    UserAvatar,
                    {
                      src: avatarPreview,
                      name: username || currentName,
                      size: "xl",
                      className: "w-16 h-16 ring-2 ring-[#CED0D4]"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        var _a;
                        return (_a = avatarInputRef.current) == null ? void 0 : _a.click();
                      },
                      "data-ocid": "edit_profile.upload_button",
                      "aria-label": "Change profile picture",
                      className: "absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#E4E6EB] hover:bg-[#D8DADF] flex items-center justify-center shadow-md transition-colors",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-3.5 h-3.5 text-[#050505]" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#65676B]", children: "Tap the camera icon to choose a new photo" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: avatarInputRef,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: handleAvatarChange,
                  "data-ocid": "edit_profile.dropzone"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-[#CED0D4]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "edit-username",
                  className: "text-[15px] font-semibold text-[#050505]",
                  children: "Display Name"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "edit-username",
                  type: "text",
                  value: username,
                  onChange: (e) => setUsername(e.target.value),
                  maxLength: 40,
                  placeholder: "Your display name",
                  "data-ocid": "edit_profile.input",
                  className: "w-full px-3 py-2.5 rounded-md border border-[#CED0D4] bg-white dark:bg-muted text-sm text-[#050505] dark:text-foreground placeholder:text-[#65676B] focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] transition-colors"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#65676B] text-right", children: [
                username.length,
                "/40"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "edit-bio",
                  className: "text-[15px] font-semibold text-[#050505]",
                  children: "Bio"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "edit-bio",
                  value: bio,
                  onChange: (e) => setBio(e.target.value),
                  maxLength: 160,
                  rows: 3,
                  placeholder: "Describe yourself…",
                  "data-ocid": "edit_profile.textarea",
                  className: "w-full px-3 py-2.5 rounded-md border border-[#CED0D4] bg-white dark:bg-muted text-sm text-[#050505] dark:text-foreground placeholder:text-[#65676B] focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] transition-colors resize-none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#65676B] text-right", children: [
                bio.length,
                "/160"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-[#CED0D4] flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "data-ocid": "edit_profile.cancel_button",
                className: "flex-1 py-2 rounded-md border border-[#CED0D4] text-sm font-semibold text-[#050505] hover:bg-[#F2F2F2] transition-colors",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSave,
                disabled: saving,
                "data-ocid": "edit_profile.submit_button",
                className: "flex-1 py-2 rounded-md bg-[#1877F2] text-white text-sm font-semibold hover:bg-[#166FE5] transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
                children: saving ? "Saving…" : "Save Changes"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function timeAgo(ts) {
  const ms = Date.now() - Number(ts / 1000000n);
  const m = Math.floor(ms / 6e4);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}
function getDirectUrl(blob) {
  var _a;
  if (!blob) return void 0;
  return (_a = blob.getDirectURL) == null ? void 0 : _a.call(blob);
}
function GuestView({ signIn }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center gap-6 py-20 px-6 text-center bg-[#F0F2F5] min-h-[60vh]",
      "data-ocid": "profile.guest_view",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-[#E4E6EB] flex items-center justify-center shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            role: "img",
            "aria-labelledby": "guest-icon-title",
            viewBox: "0 0 64 64",
            className: "w-14 h-14",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { id: "guest-icon-title", children: "Profile placeholder" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "32", cy: "26", r: "14", fill: "#BEC3C9" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "32", cy: "52", rx: "20", ry: "12", fill: "#BEC3C9" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-2xl text-[#050505]", children: "Welcome to LinkSphere" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#65676B] max-w-xs", children: "Sign in to see your profile, connect with friends, and share moments." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: signIn,
            "data-ocid": "profile.signin_button",
            className: "flex items-center gap-2 px-6 py-3 rounded-md bg-[#1877F2] text-white font-semibold text-base hover:bg-[#166FE5] transition-colors shadow",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-5 h-5" }),
              "Log in with Internet Identity"
            ]
          }
        )
      ]
    }
  );
}
function PostsTab({ posts }) {
  if (!posts.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center bg-white rounded-lg shadow-sm",
        "data-ocid": "profile.posts.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-[#F0F2F5] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-7 h-7 text-[#65676B]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#050505] text-base", children: "No posts yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#65676B] max-w-xs", children: "Share something on the feed and it'll appear here." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    PostCard,
    {
      post: {
        id: String(post.id),
        authorName: post.authorName,
        authorInitials: post.authorName.slice(0, 2).toUpperCase(),
        authorSrc: getDirectUrl(post.authorAvatar),
        time: timeAgo(post.createdAt),
        text: post.text,
        imageSrc: getDirectUrl(post.image),
        likeCount: Number(post.likeCount),
        commentCount: Number(post.commentCount),
        liked: post.likedByMe,
        isOwn: true
      },
      index: i
    },
    String(post.id)
  )) });
}
function AboutTab({
  bio,
  onEditProfile,
  isOwn
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-white rounded-lg shadow-sm p-4 space-y-4",
      "data-ocid": "profile.about.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#050505] text-base", children: "About" }),
        bio ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#050505] text-center leading-relaxed", children: bio }) : isOwn ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#65676B] text-center", children: "Add a bio to tell people about yourself." }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-[#65676B]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-5 h-5 text-[#65676B] flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add work" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-[#65676B]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-5 h-5 text-[#65676B] flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add education" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-[#65676B]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5 text-[#65676B] flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add location" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-[#65676B]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-5 h-5 text-[#65676B] flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add relationship status" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm text-[#65676B]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5 text-[#65676B] flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add website" })
          ] })
        ] }),
        isOwn && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onEditProfile,
            "data-ocid": "profile.about.edit_button",
            className: "w-full py-2 rounded-md bg-[#E4E6EB] text-[#050505] text-sm font-semibold hover:bg-[#D8DADF] transition-colors",
            children: "Edit details"
          }
        )
      ]
    }
  );
}
function PhotosTab({ posts }) {
  const photoPosts = posts.filter((p) => p.image);
  if (!photoPosts.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center bg-white rounded-lg shadow-sm",
        "data-ocid": "profile.photos.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-[#F0F2F5] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-7 h-7 text-[#65676B]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#050505] text-base", children: "No photos yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#65676B] max-w-xs", children: "Photos you share will appear here." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-[#E4E6EB]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#050505] text-base", children: "Photos" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-0.5 p-0.5", children: photoPosts.map((post, i) => {
      const src = getDirectUrl(post.image);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "aspect-square overflow-hidden bg-[#F0F2F5]",
          "data-ocid": `profile.photo.item.${i + 1}`,
          children: src && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src,
              alt: "Post",
              className: "w-full h-full object-cover"
            }
          )
        },
        String(post.id)
      );
    }) })
  ] });
}
function FriendsTab({ friends }) {
  if (!friends.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-3 py-12 text-center bg-white rounded-lg shadow-sm",
        "data-ocid": "profile.friends.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-[#F0F2F5] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-7 h-7 text-[#65676B]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[#050505] text-base", children: "No friends yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#65676B] max-w-xs", children: "Connect with people you know on the Friends tab." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-[#E4E6EB]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#050505] text-base", children: "Friends" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#65676B]", children: [
          friends.length,
          " friends"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "text-sm font-semibold text-[#1877F2] hover:bg-[#E7F3FF] px-2 py-1 rounded transition-colors",
          "data-ocid": "profile.friends.see_all_button",
          children: "See all friends"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-0.5 p-0.5", children: friends.map((f, i) => {
      const avatarUrl = getDirectUrl(f.avatar);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center gap-1.5 p-2 hover:bg-[#F0F2F5] rounded-lg transition-colors cursor-pointer",
          "data-ocid": `profile.friend.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-square rounded-lg overflow-hidden bg-[#F0F2F5]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              UserAvatar,
              {
                name: f.username,
                src: avatarUrl,
                size: "xl",
                className: "w-full h-full rounded-lg"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-[#050505] text-center line-clamp-2 w-full", children: f.username }),
            Number(f.mutualFriendCount) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-[#65676B] text-center", children: [
              Number(f.mutualFriendCount),
              " mutual"
            ] })
          ]
        },
        String(f.userId)
      );
    }) })
  ] });
}
function MoreMenu({ navigate }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setOpen((p) => !p),
        "data-ocid": "profile.more_button",
        "aria-label": "More options",
        className: "flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#E4E6EB] text-[#050505] text-sm font-semibold hover:bg-[#D8DADF] transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-10", onClick: () => setOpen(false) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "absolute right-0 top-10 z-20 bg-white border border-[#CED0D4] rounded-lg shadow-lg py-2 min-w-[180px]",
          "data-ocid": "profile.more_dropdown",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setOpen(false);
                  navigate({ to: "/files" });
                },
                "data-ocid": "profile.files_link",
                className: "flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#050505] hover:bg-[#F0F2F5] transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-[#65676B]" }),
                  "My Files"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setOpen(false);
                  navigate({ to: "/products" });
                },
                "data-ocid": "profile.products_link",
                className: "flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#050505] hover:bg-[#F0F2F5] transition-colors",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 text-[#65676B]" }),
                  "Products"
                ]
              }
            )
          ]
        }
      )
    ] })
  ] });
}
function AuthenticatedProfile({
  principal,
  signOut
}) {
  const { actor } = useActor(createActor);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("posts");
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [coverUploading, setCoverUploading] = reactExports.useState(false);
  const coverInputRef = reactExports.useRef(null);
  const { data: profile, isLoading } = useProfile();
  const { data: posts = [] } = usePosts();
  const { data: friends = [] } = useFriends();
  const displayName = isLoading ? "Loading…" : (profile == null ? void 0 : profile.username) || `User ${principal.slice(0, 6)}`;
  const avatarUrl = getDirectUrl(profile == null ? void 0 : profile.avatar);
  const coverUrl = getDirectUrl(profile == null ? void 0 : profile.coverPhoto);
  const isVerified = (profile == null ? void 0 : profile.isVerified) ?? false;
  const bio = profile == null ? void 0 : profile.bio;
  const handleCoverChange = async (file) => {
    if (!actor) return;
    if (file.size > 10 * 1024 * 1024) {
      ue.error("Cover photo must be under 10MB");
      return;
    }
    setCoverUploading(true);
    try {
      const { ExternalBlob: ExternalBlob2 } = await __vitePreload(async () => {
        const { ExternalBlob: ExternalBlob3 } = await import("./index-DpisiOh5.js").then((n) => n.Q);
        return { ExternalBlob: ExternalBlob3 };
      }, true ? __vite__mapDeps([0,1]) : void 0);
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob2.fromBytes(bytes);
      await actor.updateProfileCoverPhoto(blob);
      ue.success("Cover photo updated!");
    } catch {
      ue.error("Failed to update cover photo.");
    } finally {
      setCoverUploading(false);
    }
  };
  const TABS = [
    { id: "posts", label: "Posts" },
    { id: "about", label: "About" },
    { id: "photos", label: "Photos" },
    { id: "friends", label: "Friends" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-[#F0F2F5] min-h-screen",
        "data-ocid": "profile.authenticated_view",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white shadow-sm max-w-[820px] mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-[200px] sm:h-[300px] bg-gradient-to-br from-[#1877F2] to-[#42B72A] overflow-hidden", children: [
                coverUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: coverUrl,
                    alt: "Cover",
                    className: "w-full h-full object-cover"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-br from-[#1877F2]/80 to-[#6B3FDB]/60" }),
                coverUploading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm font-semibold", children: "Uploading…" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a;
                    return (_a = coverInputRef.current) == null ? void 0 : _a.click();
                  },
                  "data-ocid": "profile.cover_photo_button",
                  "aria-label": "Edit cover photo",
                  className: "absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-[#050505] text-sm font-semibold hover:bg-[#F2F2F2] transition-colors shadow",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4" }),
                    "Edit cover photo"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: coverInputRef,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: (e) => {
                    var _a;
                    const f = (_a = e.target.files) == null ? void 0 : _a[0];
                    if (f) handleCoverChange(f);
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-6 pb-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-[52px] sm:-mt-[36px] pb-3 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-[120px] h-[120px] ring-4 ring-white rounded-full shadow-md flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      UserAvatar,
                      {
                        name: displayName,
                        src: avatarUrl,
                        size: "xl",
                        className: "w-[120px] h-[120px] text-3xl rounded-full"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setEditOpen(true),
                        "aria-label": "Change profile picture",
                        "data-ocid": "profile.avatar_button",
                        className: "absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#E4E6EB] hover:bg-[#D8DADF] flex items-center justify-center shadow transition-colors",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-4 h-4 text-[#050505]" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-1 mt-2 sm:mt-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-[22px] sm:text-[28px] text-[#050505] leading-tight", children: displayName }),
                      isVerified && /* @__PURE__ */ jsxRuntimeExports.jsx(VerifiedBadge, { size: "md" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#65676B] font-semibold", children: [
                      friends.length,
                      " ",
                      friends.length === 1 ? "friend" : "friends"
                    ] }),
                    friends.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-1.5 mt-1", children: friends.slice(0, 6).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-7 h-7 ring-2 ring-white rounded-full overflow-hidden",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          UserAvatar,
                          {
                            name: f.username,
                            src: getDirectUrl(f.avatar),
                            size: "sm",
                            className: "w-7 h-7"
                          }
                        )
                      },
                      String(f.userId)
                    )) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap pb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setEditOpen(true),
                      "data-ocid": "profile.edit_button",
                      className: "flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#E4E6EB] text-[#050505] text-sm font-semibold hover:bg-[#D8DADF] transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4" }),
                        "Edit profile"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "profile.add_story_button",
                      className: "flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#E4E6EB] text-[#050505] text-sm font-semibold hover:bg-[#D8DADF] transition-colors",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                        "Add to story"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MoreMenu, { navigate })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-[#E4E6EB]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "nav",
                {
                  className: "flex overflow-x-auto scrollbar-none",
                  "aria-label": "Profile tabs",
                  "data-ocid": "profile.tabs",
                  children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActiveTab(tab.id),
                      "data-ocid": `profile.tab.${tab.id}`,
                      className: `flex-shrink-0 px-4 py-3 text-sm font-semibold transition-colors relative ${activeTab === tab.id ? "text-[#1877F2]" : "text-[#65676B] hover:bg-[#F0F2F5] rounded-md"}`,
                      children: [
                        tab.label,
                        activeTab === tab.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-[3px] bg-[#1877F2] rounded-t-full" })
                      ]
                    },
                    tab.id
                  ))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[820px] mx-auto px-0 sm:px-4 pt-4 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.15 },
              children: [
                activeTab === "posts" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full sm:w-[360px] flex-shrink-0 space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      AboutTab,
                      {
                        bio,
                        onEditProfile: () => setEditOpen(true),
                        isOwn: true
                      }
                    ),
                    friends.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-sm p-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-[#050505] text-base", children: "Friends" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            className: "text-sm font-semibold text-[#1877F2] hover:bg-[#E7F3FF] px-2 py-1 rounded transition-colors",
                            "data-ocid": "profile.sidebar.see_all_friends_button",
                            children: "See all friends"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-[#65676B] mb-3", children: [
                        friends.length,
                        " friends"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1", children: friends.slice(0, 9).map((f, i) => {
                        const url = getDirectUrl(f.avatar);
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "flex flex-col gap-1",
                            "data-ocid": `profile.sidebar.friend.${i + 1}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-md overflow-hidden bg-[#F0F2F5]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                UserAvatar,
                                {
                                  name: f.username,
                                  src: url,
                                  size: "xl",
                                  className: "w-full h-full rounded-md"
                                }
                              ) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-[#050505] truncate", children: f.username })
                            ]
                          },
                          String(f.userId)
                        );
                      }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PostsTab, { posts }) })
                ] }),
                activeTab === "about" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AboutTab,
                  {
                    bio,
                    onEditProfile: () => setEditOpen(true),
                    isOwn: true
                  }
                ),
                activeTab === "photos" && /* @__PURE__ */ jsxRuntimeExports.jsx(PhotosTab, { posts }),
                activeTab === "friends" && /* @__PURE__ */ jsxRuntimeExports.jsx(FriendsTab, { friends })
              ]
            },
            activeTab
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[820px] mx-auto px-4 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: signOut,
              "data-ocid": "profile.signout_button",
              className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-md border border-[#CED0D4] bg-white text-[#65676B] hover:bg-[#F0F2F5] transition-colors text-sm font-semibold",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
                "Log out"
              ]
            }
          ) })
        ]
      }
    ),
    editOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditProfileModal,
      {
        currentName: displayName,
        currentBio: bio,
        currentAvatarUrl: avatarUrl,
        onClose: () => setEditOpen(false)
      }
    )
  ] });
}
function ProfilePage() {
  const { isAuthenticated, principal, signIn, signOut } = useAuth();
  if (!isAuthenticated || !principal) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(GuestView, { signIn });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-[#F0F2F5]", "data-ocid": "profile.page", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthenticatedProfile, { principal, signOut }) });
}
export {
  ProfilePage as default
};
