import { N as useAdminAuth, a as useActor, r as reactExports, b as ue, j as jsxRuntimeExports, s as Users, x as FileText, n as MessageCircle, d as createActor } from "./index-DpisiOh5.js";
import { H as Heart } from "./heart-BgYeM2cY.js";
import { C as ChartNoAxesColumn, T as TrendingUp } from "./trending-up-DsEzAdkM.js";
const CARD_BG = "oklch(0.15 0.01 282)";
const BORDER = "oklch(0.2 0.008 282)";
const TEXT_MAIN = "oklch(0.93 0.01 282)";
const TEXT_DIM = "oklch(0.54 0.01 282)";
const TEAL = "oklch(0.72 0.26 180)";
const PURPLE = "oklch(0.62 0.22 260)";
const GREEN = "oklch(0.68 0.22 150)";
const ORANGE = "oklch(0.72 0.22 28)";
const FALLBACK_DATA = {
  userGrowth: [
    { date: "Apr 19", count: 45n },
    { date: "Apr 20", count: 52n },
    { date: "Apr 21", count: 38n },
    { date: "Apr 22", count: 61n },
    { date: "Apr 23", count: 73n },
    { date: "Apr 24", count: 55n },
    { date: "Apr 25", count: 68n }
  ],
  postActivity: [
    { date: "Apr 19", count: 312n },
    { date: "Apr 20", count: 287n },
    { date: "Apr 21", count: 345n },
    { date: "Apr 22", count: 398n },
    { date: "Apr 23", count: 421n },
    { date: "Apr 24", count: 376n },
    { date: "Apr 25", count: 430n }
  ],
  engagementStats: {
    totalLikes: 14830n,
    totalComments: 5241n,
    avgLikesPerPost: 6n
  }
};
const CONTENT_BREAKDOWN = [
  { label: "Posts", value: 68, color: PURPLE },
  { label: "Reels", value: 18, color: TEAL },
  { label: "Stories", value: 10, color: GREEN },
  { label: "Files", value: 4, color: ORANGE }
];
function MiniBarChart({ data, color, title, unit = "" }) {
  const max = Math.max(...data.map((d) => Number(d.count)));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-5",
      style: { background: CARD_BG, border: `1px solid ${BORDER}` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "font-semibold text-sm",
              style: { color: TEXT_MAIN, fontFamily: "var(--font-display)" },
              children: title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: TEXT_DIM }, children: "Last 7 days" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs mb-4", style: { color: TEXT_DIM }, children: [
          "Peak:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color }, children: [
            unit,
            max.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1.5 h-28", children: data.map((d) => {
          const pct = max > 0 ? Number(d.count) / max * 100 : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex-1 flex flex-col items-center gap-1 group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full flex flex-col items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "absolute -top-5 text-[9px] opacity-0 group-hover:opacity-100 transition-smooth px-1 py-0.5 rounded",
                      style: {
                        background: color,
                        color: "oklch(0.11 0.008 282)",
                        whiteSpace: "nowrap"
                      },
                      children: [
                        unit,
                        Number(d.count).toLocaleString()
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-full rounded-t-sm transition-smooth",
                      style: {
                        height: `${Math.max(pct, 5)}%`,
                        maxHeight: "100px",
                        minHeight: "4px",
                        background: `linear-gradient(180deg, ${color} 0%, ${color}80 100%)`
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", style: { color: TEXT_DIM }, children: d.date.split(" ")[1] ?? d.date })
              ]
            },
            d.date
          );
        }) })
      ]
    }
  );
}
function DonutChart() {
  const total = CONTENT_BREAKDOWN.reduce((sum, d) => sum + d.value, 0);
  let cumPct = 0;
  const segments = CONTENT_BREAKDOWN.map((d) => {
    const pct = d.value / total;
    const start = cumPct;
    cumPct += pct;
    return { ...d, pct, start };
  });
  function describeArc(cx, cy, r, startAngle, endAngle) {
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-5",
      style: { background: CARD_BG, border: `1px solid ${BORDER}` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h3",
          {
            className: "font-semibold text-sm mb-1",
            style: { color: TEXT_MAIN, fontFamily: "var(--font-display)" },
            children: "Content Breakdown"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-4", style: { color: TEXT_DIM }, children: "Distribution by content type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              viewBox: "0 0 100 100",
              className: "w-24 h-24 flex-shrink-0",
              "aria-label": "Content breakdown donut chart",
              role: "img",
              children: [
                segments.map((seg) => {
                  const startAngle = seg.start * 360;
                  const endAngle = (seg.start + seg.pct) * 360;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: describeArc(50, 50, 38, startAngle, endAngle),
                      fill: "none",
                      stroke: seg.color,
                      strokeWidth: "14",
                      strokeLinecap: "butt"
                    },
                    seg.label
                  );
                }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "24", fill: "oklch(0.13 0.008 282)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "text",
                  {
                    x: "50",
                    y: "46",
                    textAnchor: "middle",
                    fill: "oklch(0.93 0.01 282)",
                    fontSize: "10",
                    fontWeight: "bold",
                    children: [
                      total,
                      "%"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "text",
                  {
                    x: "50",
                    y: "58",
                    textAnchor: "middle",
                    fill: "oklch(0.54 0.01 282)",
                    fontSize: "6",
                    children: "total"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 flex-1", children: segments.map((seg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-2.5 h-2.5 rounded-full flex-shrink-0",
                  style: { background: seg.color }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: TEXT_MAIN }, children: seg.label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-xs font-semibold",
                style: { color: seg.color },
                children: [
                  seg.value,
                  "%"
                ]
              }
            )
          ] }, seg.label)) })
        ] })
      ]
    }
  );
}
function AdminAnalyticsPage() {
  const { adminToken } = useAdminAuth();
  const { actor } = useActor(createActor);
  const [analytics, setAnalytics] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const loadAnalytics = reactExports.useCallback(async () => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.getAnalytics(adminToken);
      setAnalytics(result);
    } catch {
      ue.error("Could not load analytics — showing sample data");
    } finally {
      setIsLoading(false);
    }
  }, [actor, adminToken]);
  reactExports.useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);
  const data = analytics ?? FALLBACK_DATA;
  const engagement = data.engagementStats;
  const summaryCards = [
    {
      label: "New Users (7d)",
      value: data.userGrowth.reduce((s, d) => s + Number(d.count), 0).toLocaleString(),
      change: "+18%",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
      accent: PURPLE,
      ocid: "admin.analytics.stat.users"
    },
    {
      label: "Posts (7d)",
      value: data.postActivity.reduce((s, d) => s + Number(d.count), 0).toLocaleString(),
      change: "+24%",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
      accent: TEAL,
      ocid: "admin.analytics.stat.posts"
    },
    {
      label: "Total Likes",
      value: Number(engagement.totalLikes).toLocaleString(),
      change: "+31%",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4" }),
      accent: GREEN,
      ocid: "admin.analytics.stat.likes"
    },
    {
      label: "Avg Likes/Post",
      value: Number(engagement.avgLikesPerPost).toLocaleString(),
      change: "+8%",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4" }),
      accent: ORANGE,
      ocid: "admin.analytics.stat.avg"
    },
    {
      label: "Total Comments",
      value: Number(engagement.totalComments).toLocaleString(),
      change: "+15%",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-4 h-4" }),
      accent: PURPLE,
      ocid: "admin.analytics.stat.comments"
    },
    {
      label: "Engagement Rate",
      value: "8.4%",
      change: "+2.1%",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
      accent: TEAL,
      ocid: "admin.analytics.stat.engagement"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { minHeight: "100%" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "text-xl font-bold",
          style: { color: TEXT_MAIN, fontFamily: "var(--font-display)" },
          children: "Analytics"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-0.5", style: { color: TEXT_DIM }, children: "LinkSphere performance metrics · Last 7 days" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3", children: summaryCards.map(
      (card) => isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-xl p-4 h-20 animate-pulse",
          style: { background: CARD_BG }
        },
        card.label
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl p-3 stat-card admin-dark",
          "data-ocid": card.ocid,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "p-1.5 rounded-lg",
                  style: {
                    background: `${card.accent}20`,
                    color: card.accent
                  },
                  children: card.icon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] font-medium",
                  style: { color: GREEN },
                  children: card.change
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-xl font-bold",
                style: {
                  color: TEXT_MAIN,
                  fontFamily: "var(--font-display)"
                },
                children: card.value
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-[10px] mt-0.5 leading-tight",
                style: { color: TEXT_DIM },
                children: card.label
              }
            )
          ]
        },
        card.label
      )
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MiniBarChart,
        {
          data: data.userGrowth,
          color: PURPLE,
          title: "Daily New Users"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MiniBarChart,
        {
          data: data.postActivity,
          color: TEAL,
          title: "Daily Post Activity"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DonutChart, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl p-5",
          style: { background: CARD_BG, border: `1px solid ${BORDER}` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: "font-semibold text-sm mb-1",
                style: { color: TEXT_MAIN, fontFamily: "var(--font-display)" },
                children: "Engagement Deep Dive"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mb-4", style: { color: TEXT_DIM }, children: "User interaction metrics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
              {
                label: "Total Likes",
                value: Number(engagement.totalLikes).toLocaleString(),
                color: GREEN,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-3.5 h-3.5" }),
                pct: 72
              },
              {
                label: "Total Comments",
                value: Number(engagement.totalComments).toLocaleString(),
                color: TEAL,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
                pct: 35
              },
              {
                label: "Avg Likes / Post",
                value: Number(engagement.avgLikesPerPost).toLocaleString(),
                color: PURPLE,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3.5 h-3.5" }),
                pct: 48
              }
            ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2",
                    style: { color: item.color },
                    children: [
                      item.icon,
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", style: { color: TEXT_MAIN }, children: item.label })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm font-bold",
                    style: { color: item.color },
                    children: item.value
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1.5 rounded-full overflow-hidden",
                  style: { background: "oklch(0.22 0.008 282)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full rounded-full",
                      style: {
                        width: `${item.pct}%`,
                        background: item.color
                      }
                    }
                  )
                }
              )
            ] }, item.label)) })
          ]
        }
      )
    ] })
  ] }) });
}
export {
  AdminAnalyticsPage as default
};
