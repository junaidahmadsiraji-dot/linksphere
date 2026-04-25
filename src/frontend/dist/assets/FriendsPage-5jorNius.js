import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as useAuth, a as useActor, h as useQueryClient, o as useFriendRequests, p as useFriendSuggestions, q as useFriends, s as Users, S as Search, U as UserAvatar, d as createActor } from "./index-DpisiOh5.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-Dn7xw19u.js";
import { U as UserPlus } from "./user-plus-zKonSa2p.js";
import { U as UserCheck } from "./user-check-QDUrpVzF.js";
import { X } from "./x-TmiiBXt_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserMinus = createLucideIcon("user-minus", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      className: "grid grid-cols-2 gap-3 list-none p-0 m-0",
      "data-ocid": "friends.loading_state",
      "aria-busy": "true",
      "aria-label": "Loading friends",
      children: SKELETON_KEYS.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "bg-white rounded-lg p-3 flex flex-col items-center gap-3 border border-[#CED0D4]",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-[#F0F2F5] animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3/4 h-3 bg-[#F0F2F5] animate-pulse rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 h-2.5 bg-[#F0F2F5] animate-pulse rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-8 bg-[#F0F2F5] animate-pulse rounded-md" })
          ]
        },
        k
      ))
    }
  );
}
function EmptyState({
  icon,
  title,
  subtitle,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-14 gap-3 text-center px-4",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-16 h-16 rounded-full flex items-center justify-center",
            style: { background: "#E4E6EB" },
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-base", style: { color: "#050505" }, children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm max-w-xs leading-relaxed",
            style: { color: "#65676B" },
            children: subtitle
          }
        )
      ]
    }
  );
}
function FriendCard({ friend, actions, index }) {
  var _a;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.li,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.2, delay: index * 0.04 },
      className: "bg-white rounded-lg border border-[#CED0D4] overflow-hidden flex flex-col list-none",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-full aspect-square overflow-hidden",
            style: { background: "#F0F2F5" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              UserAvatar,
              {
                name: friend.username,
                size: "xl",
                src: (_a = friend.avatar) == null ? void 0 : _a.getDirectURL(),
                className: "w-full h-full rounded-none"
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-semibold text-sm truncate",
                style: { color: "#050505" },
                children: friend.username
              }
            ),
            Number(friend.mutualFriendCount) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mt-0.5", style: { color: "#65676B" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3 h-3 inline mr-0.5 -mt-0.5" }),
              Number(friend.mutualFriendCount),
              " ",
              Number(friend.mutualFriendCount) === 1 ? "mutual friend" : "mutual friends"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5", children: actions })
        ] })
      ]
    }
  );
}
function FriendsPage() {
  const { isAuthenticated, signIn } = useAuth();
  const [tab, setTab] = reactExports.useState("requests");
  const [friendSearch, setFriendSearch] = reactExports.useState("");
  const [pendingIds, setPendingIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  const { data: requests = [], isLoading: loadingRequests } = useFriendRequests();
  const { data: suggestions = [], isLoading: loadingSuggestions } = useFriendSuggestions();
  const { data: friends = [], isLoading: loadingFriends } = useFriends();
  const setPending = reactExports.useCallback((userId, val) => {
    setPendingIds((prev) => {
      const next = new Set(prev);
      if (val) next.add(String(userId));
      else next.delete(String(userId));
      return next;
    });
  }, []);
  async function accept(userId) {
    if (!actor) return;
    setPending(userId, true);
    try {
      await actor.acceptFriendRequest(userId);
      qc.invalidateQueries({ queryKey: ["friend-requests"] });
      qc.invalidateQueries({ queryKey: ["friends"] });
    } finally {
      setPending(userId, false);
    }
  }
  async function reject(userId) {
    if (!actor) return;
    setPending(userId, true);
    try {
      await actor.rejectFriendRequest(userId);
      qc.invalidateQueries({ queryKey: ["friend-requests"] });
    } finally {
      setPending(userId, false);
    }
  }
  async function sendRequest(userId) {
    if (!actor) return;
    setPending(userId, true);
    try {
      await actor.sendFriendRequest(userId);
      qc.invalidateQueries({ queryKey: ["friend-suggestions"] });
    } finally {
      setPending(userId, false);
    }
  }
  async function cancelRequest(userId) {
    if (!actor) return;
    setPending(userId, true);
    try {
      await actor.cancelFriendRequest(userId);
      qc.invalidateQueries({ queryKey: ["friend-suggestions"] });
    } finally {
      setPending(userId, false);
    }
  }
  async function unfriend(userId) {
    if (!actor) return;
    setPending(userId, true);
    try {
      await actor.unfriend(userId);
      qc.invalidateQueries({ queryKey: ["friends"] });
    } finally {
      setPending(userId, false);
    }
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 gap-5 px-6",
        style: { background: "#F0F2F5", minHeight: "100%" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-full flex items-center justify-center",
              style: { background: "#E4E6EB" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10", style: { color: "#65676B" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-1", style: { color: "#050505" }, children: "Sign in to connect" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "#65676B" }, children: "Manage friend requests, find people you know, and more." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: signIn,
              className: "px-8 py-2.5 rounded-md font-semibold text-sm text-white transition-opacity hover:opacity-90",
              style: { background: "#1877F2" },
              "data-ocid": "friends.signin_button",
              children: "Sign In"
            }
          )
        ]
      }
    );
  }
  const tabs = [
    {
      id: "requests",
      label: "Friend Requests",
      count: requests.length > 0 ? requests.length : void 0
    },
    { id: "suggestions", label: "People You May Know" },
    {
      id: "friends",
      label: "All Friends",
      count: friends.length > 0 ? friends.length : void 0
    }
  ];
  const filteredFriends = friendSearch.trim() ? friends.filter(
    (f) => f.username.toLowerCase().includes(friendSearch.toLowerCase())
  ) : friends;
  const currentlyLoading = tab === "requests" && loadingRequests || tab === "suggestions" && loadingSuggestions || tab === "friends" && loadingFriends;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-full pb-8",
      style: { background: "#F0F2F5" },
      "data-ocid": "friends.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "sticky top-0 z-10 px-4 py-3 border-b",
            style: { background: "#FFFFFF", borderColor: "#CED0D4" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-2xl", style: { color: "#050505" }, children: "Friends" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex gap-0.5 mt-3 overflow-x-auto",
                  role: "tablist",
                  "aria-label": "Friends tabs",
                  style: { scrollbarWidth: "none" },
                  children: tabs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      role: "tab",
                      "aria-selected": tab === t.id,
                      onClick: () => setTab(t.id),
                      "data-ocid": `friends.${t.id}_tab`,
                      className: "flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-1.5 whitespace-nowrap transition-colors",
                      style: {
                        background: tab === t.id ? "#E7F3FF" : "transparent",
                        color: tab === t.id ? "#1877F2" : "#65676B"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.label }),
                        t.count !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full font-bold",
                            style: {
                              background: tab === t.id ? "#1877F2" : "#E4E6EB",
                              color: tab === t.id ? "#FFFFFF" : "#65676B"
                            },
                            children: t.count
                          }
                        )
                      ]
                    },
                    t.id
                  ))
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: tab === "friends" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.2 },
            className: "px-4 pt-3 overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Search,
                {
                  className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none",
                  style: { color: "#65676B" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Search friends…",
                  value: friendSearch,
                  onChange: (e) => setFriendSearch(e.target.value),
                  "data-ocid": "friends.search_input",
                  className: "w-full pl-9 pr-4 py-2.5 rounded-full text-sm focus:outline-none",
                  style: {
                    background: "#E4E6EB",
                    color: "#050505",
                    border: "none"
                  }
                }
              )
            ] })
          },
          "search-bar"
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-2", children: [
          tab === "requests" && /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-base", style: { color: "#050505" }, children: [
            "Friend Requests",
            requests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "ml-2 font-normal text-sm",
                style: { color: "#65676B" },
                children: [
                  "· ",
                  requests.length
                ]
              }
            )
          ] }),
          tab === "suggestions" && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-base", style: { color: "#050505" }, children: "People You May Know" }),
          tab === "friends" && /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-base", style: { color: "#050505" }, children: [
            friendSearch.trim() ? `Results for "${friendSearch}"` : "All Friends",
            !friendSearch.trim() && friends.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "ml-2 font-normal text-sm",
                style: { color: "#65676B" },
                children: [
                  "· ",
                  friends.length
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4", children: currentlyLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {}) : tab === "requests" ? requests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-8 h-8", style: { color: "#65676B" } }),
            title: "No friend requests",
            subtitle: "When someone sends you a request, it'll appear here.",
            ocid: "friends.requests_empty_state"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            className: "grid grid-cols-2 gap-3 list-none p-0 m-0",
            "data-ocid": "friends.requests_list",
            "aria-label": "Friend requests",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: requests.map((f, i) => {
              const busy = pendingIds.has(String(f.userId));
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                FriendCard,
                {
                  friend: f,
                  index: i,
                  actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => accept(f.userId),
                        disabled: busy,
                        "data-ocid": `friends.accept_button.${i + 1}`,
                        className: "w-full py-2 rounded-md text-sm font-semibold text-white flex items-center justify-center gap-1 disabled:opacity-50 transition-opacity hover:opacity-90",
                        style: { background: "#1877F2" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-4 h-4 flex-shrink-0" }),
                          "Confirm"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => reject(f.userId),
                        disabled: busy,
                        "data-ocid": `friends.reject_button.${i + 1}`,
                        className: "w-full py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-50 transition-colors hover:opacity-90",
                        style: { background: "#E4E6EB", color: "#050505" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 flex-shrink-0" }),
                          "Delete"
                        ]
                      }
                    )
                  ] })
                },
                String(f.userId)
              );
            }) })
          }
        ) : tab === "suggestions" ? suggestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8", style: { color: "#65676B" } }),
            title: "No suggestions right now",
            subtitle: "As more people join LinkSphere, you'll see friend suggestions here.",
            ocid: "friends.suggestions_empty_state"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            className: "grid grid-cols-2 gap-3 list-none p-0 m-0",
            "data-ocid": "friends.suggestions_list",
            "aria-label": "People you may know",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: suggestions.map((f, i) => {
              const busy = pendingIds.has(String(f.userId));
              const alreadySent = f.status === "sent";
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                FriendCard,
                {
                  friend: f,
                  index: i,
                  actions: alreadySent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => cancelRequest(f.userId),
                      disabled: busy,
                      "data-ocid": `friends.cancel_button.${i + 1}`,
                      className: "w-full py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-50 transition-opacity hover:opacity-90",
                      style: { background: "#E4E6EB", color: "#65676B" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 flex-shrink-0" }),
                        "Pending"
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => sendRequest(f.userId),
                      disabled: busy,
                      "data-ocid": `friends.add_button.${i + 1}`,
                      className: "w-full py-2 rounded-md text-sm font-semibold text-white flex items-center justify-center gap-1 disabled:opacity-50 transition-opacity hover:opacity-90",
                      style: { background: "#1877F2" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 flex-shrink-0" }),
                        "Add Friend"
                      ]
                    }
                  )
                },
                String(f.userId)
              );
            }) })
          }
        ) : filteredFriends.length === 0 ? friendSearch.trim() ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-8 h-8", style: { color: "#65676B" } }),
            title: `No results for "${friendSearch}"`,
            subtitle: "Try a different name or clear your search.",
            ocid: "friends.search_empty_state"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmptyState,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8", style: { color: "#65676B" } }),
            title: "No friends yet",
            subtitle: "Accept friend requests or explore suggestions to start connecting.",
            ocid: "friends.friends_empty_state"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            className: "grid grid-cols-2 gap-3 list-none p-0 m-0",
            "data-ocid": "friends.friends_list",
            "aria-label": "Your friends",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: filteredFriends.map((f, i) => {
              const busy = pendingIds.has(String(f.userId));
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                FriendCard,
                {
                  friend: f,
                  index: i,
                  actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => unfriend(f.userId),
                      disabled: busy,
                      "data-ocid": `friends.unfriend_button.${i + 1}`,
                      className: "w-full py-2 rounded-md text-sm font-semibold flex items-center justify-center gap-1 disabled:opacity-50 transition-opacity hover:opacity-90",
                      style: { background: "#E4E6EB", color: "#050505" },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { className: "w-4 h-4 flex-shrink-0" }),
                        "Unfriend"
                      ]
                    }
                  )
                },
                String(f.userId)
              );
            }) })
          }
        ) })
      ]
    }
  );
}
export {
  FriendsPage as default
};
