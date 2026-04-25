import { c as createLucideIcon, j as jsxRuntimeExports, i as cn } from "./index-DpisiOh5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20
};
function VerifiedBadge({ className, size = "sm" }) {
  const px = sizeMap[size];
  const id = `verified-title-${size}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      role: "img",
      "aria-labelledby": id,
      width: px,
      height: px,
      viewBox: "0 0 24 24",
      fill: "none",
      className: cn("inline-block flex-shrink-0", className),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { id, children: "Verified account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "12", fill: "#1877F2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: "M7 12.5L10.5 16L17 9",
            stroke: "white",
            strokeWidth: "2.2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
export {
  Share2 as S,
  VerifiedBadge as V
};
