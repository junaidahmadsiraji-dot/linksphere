import { createActor } from "@/backend";
import type { AnalyticsResult } from "@/backend.d";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  BarChart2,
  FileText,
  Heart,
  MessageCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

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
    { date: "Apr 25", count: 68n },
  ],
  postActivity: [
    { date: "Apr 19", count: 312n },
    { date: "Apr 20", count: 287n },
    { date: "Apr 21", count: 345n },
    { date: "Apr 22", count: 398n },
    { date: "Apr 23", count: 421n },
    { date: "Apr 24", count: 376n },
    { date: "Apr 25", count: 430n },
  ],
  engagementStats: {
    totalLikes: 14830n,
    totalComments: 5241n,
    avgLikesPerPost: 6n,
  },
};

const CONTENT_BREAKDOWN = [
  { label: "Posts", value: 68, color: PURPLE },
  { label: "Reels", value: 18, color: TEAL },
  { label: "Stories", value: 10, color: GREEN },
  { label: "Files", value: 4, color: ORANGE },
];

interface BarChartProps {
  data: { date: string; count: bigint }[];
  color: string;
  title: string;
  unit?: string;
}

function MiniBarChart({ data, color, title, unit = "" }: BarChartProps) {
  const max = Math.max(...data.map((d) => Number(d.count)));
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
    >
      <div className="flex items-center justify-between mb-1">
        <h3
          className="font-semibold text-sm"
          style={{ color: TEXT_MAIN, fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
        <span className="text-xs" style={{ color: TEXT_DIM }}>
          Last 7 days
        </span>
      </div>
      <p className="text-xs mb-4" style={{ color: TEXT_DIM }}>
        Peak:{" "}
        <span style={{ color }}>
          {unit}
          {max.toLocaleString()}
        </span>
      </p>
      <div className="flex items-end gap-1.5 h-28">
        {data.map((d) => {
          const pct = max > 0 ? (Number(d.count) / max) * 100 : 0;
          return (
            <div
              key={d.date}
              className="flex-1 flex flex-col items-center gap-1 group"
            >
              <div className="relative w-full flex flex-col items-center">
                <div
                  className="absolute -top-5 text-[9px] opacity-0 group-hover:opacity-100 transition-smooth px-1 py-0.5 rounded"
                  style={{
                    background: color,
                    color: "oklch(0.11 0.008 282)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {unit}
                  {Number(d.count).toLocaleString()}
                </div>
                <div
                  className="w-full rounded-t-sm transition-smooth"
                  style={{
                    height: `${Math.max(pct, 5)}%`,
                    maxHeight: "100px",
                    minHeight: "4px",
                    background: `linear-gradient(180deg, ${color} 0%, ${color}80 100%)`,
                  }}
                />
              </div>
              <span className="text-[10px]" style={{ color: TEXT_DIM }}>
                {d.date.split(" ")[1] ?? d.date}
              </span>
            </div>
          );
        })}
      </div>
    </div>
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

  function describeArc(
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number,
  ): string {
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const large = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  }

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
    >
      <h3
        className="font-semibold text-sm mb-1"
        style={{ color: TEXT_MAIN, fontFamily: "var(--font-display)" }}
      >
        Content Breakdown
      </h3>
      <p className="text-xs mb-4" style={{ color: TEXT_DIM }}>
        Distribution by content type
      </p>
      <div className="flex items-center gap-5">
        <svg
          viewBox="0 0 100 100"
          className="w-24 h-24 flex-shrink-0"
          aria-label="Content breakdown donut chart"
          role="img"
        >
          {segments.map((seg) => {
            const startAngle = seg.start * 360;
            const endAngle = (seg.start + seg.pct) * 360;
            return (
              <path
                key={seg.label}
                d={describeArc(50, 50, 38, startAngle, endAngle)}
                fill="none"
                stroke={seg.color}
                strokeWidth="14"
                strokeLinecap="butt"
              />
            );
          })}
          <circle cx="50" cy="50" r="24" fill="oklch(0.13 0.008 282)" />
          <text
            x="50"
            y="46"
            textAnchor="middle"
            fill="oklch(0.93 0.01 282)"
            fontSize="10"
            fontWeight="bold"
          >
            {total}%
          </text>
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fill="oklch(0.54 0.01 282)"
            fontSize="6"
          >
            total
          </text>
        </svg>
        <div className="space-y-2 flex-1">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: seg.color }}
                />
                <span className="text-xs" style={{ color: TEXT_MAIN }}>
                  {seg.label}
                </span>
              </div>
              <span
                className="text-xs font-semibold"
                style={{ color: seg.color }}
              >
                {seg.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const { adminToken } = useAdminAuth();
  const { actor } = useActor(createActor);
  const [analytics, setAnalytics] = useState<AnalyticsResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadAnalytics = useCallback(async () => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.getAnalytics(adminToken);
      setAnalytics(result as AnalyticsResult);
    } catch {
      toast.error("Could not load analytics — showing sample data");
    } finally {
      setIsLoading(false);
    }
  }, [actor, adminToken]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  const data = analytics ?? FALLBACK_DATA;
  const engagement = data.engagementStats;

  const summaryCards = [
    {
      label: "New Users (7d)",
      value: data.userGrowth
        .reduce((s, d) => s + Number(d.count), 0)
        .toLocaleString(),
      change: "+18%",
      icon: <Users className="w-4 h-4" />,
      accent: PURPLE,
      ocid: "admin.analytics.stat.users",
    },
    {
      label: "Posts (7d)",
      value: data.postActivity
        .reduce((s, d) => s + Number(d.count), 0)
        .toLocaleString(),
      change: "+24%",
      icon: <FileText className="w-4 h-4" />,
      accent: TEAL,
      ocid: "admin.analytics.stat.posts",
    },
    {
      label: "Total Likes",
      value: Number(engagement.totalLikes).toLocaleString(),
      change: "+31%",
      icon: <Heart className="w-4 h-4" />,
      accent: GREEN,
      ocid: "admin.analytics.stat.likes",
    },
    {
      label: "Avg Likes/Post",
      value: Number(engagement.avgLikesPerPost).toLocaleString(),
      change: "+8%",
      icon: <BarChart2 className="w-4 h-4" />,
      accent: ORANGE,
      ocid: "admin.analytics.stat.avg",
    },
    {
      label: "Total Comments",
      value: Number(engagement.totalComments).toLocaleString(),
      change: "+15%",
      icon: <MessageCircle className="w-4 h-4" />,
      accent: PURPLE,
      ocid: "admin.analytics.stat.comments",
    },
    {
      label: "Engagement Rate",
      value: "8.4%",
      change: "+2.1%",
      icon: <TrendingUp className="w-4 h-4" />,
      accent: TEAL,
      ocid: "admin.analytics.stat.engagement",
    },
  ];

  return (
    <div style={{ minHeight: "100%" }}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1
            className="text-xl font-bold"
            style={{ color: TEXT_MAIN, fontFamily: "var(--font-display)" }}
          >
            Analytics
          </h1>
          <p className="text-sm mt-0.5" style={{ color: TEXT_DIM }}>
            LinkSphere performance metrics · Last 7 days
          </p>
        </div>

        {/* Summary stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {summaryCards.map((card) =>
            isLoading ? (
              <div
                key={card.label}
                className="rounded-xl p-4 h-20 animate-pulse"
                style={{ background: CARD_BG }}
              />
            ) : (
              <div
                key={card.label}
                className="rounded-xl p-3 stat-card admin-dark"
                data-ocid={card.ocid}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="p-1.5 rounded-lg"
                    style={{
                      background: `${card.accent}20`,
                      color: card.accent,
                    }}
                  >
                    {card.icon}
                  </div>
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: GREEN }}
                  >
                    {card.change}
                  </span>
                </div>
                <div
                  className="text-xl font-bold"
                  style={{
                    color: TEXT_MAIN,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {card.value}
                </div>
                <div
                  className="text-[10px] mt-0.5 leading-tight"
                  style={{ color: TEXT_DIM }}
                >
                  {card.label}
                </div>
              </div>
            ),
          )}
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <MiniBarChart
            data={data.userGrowth}
            color={PURPLE}
            title="Daily New Users"
          />
          <MiniBarChart
            data={data.postActivity}
            color={TEAL}
            title="Daily Post Activity"
          />
        </div>

        {/* Bottom row: donut + engagement breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <DonutChart />

          {/* Engagement details */}
          <div
            className="rounded-2xl p-5"
            style={{ background: CARD_BG, border: `1px solid ${BORDER}` }}
          >
            <h3
              className="font-semibold text-sm mb-1"
              style={{ color: TEXT_MAIN, fontFamily: "var(--font-display)" }}
            >
              Engagement Deep Dive
            </h3>
            <p className="text-xs mb-4" style={{ color: TEXT_DIM }}>
              User interaction metrics
            </p>
            <div className="space-y-3">
              {[
                {
                  label: "Total Likes",
                  value: Number(engagement.totalLikes).toLocaleString(),
                  color: GREEN,
                  icon: <Heart className="w-3.5 h-3.5" />,
                  pct: 72,
                },
                {
                  label: "Total Comments",
                  value: Number(engagement.totalComments).toLocaleString(),
                  color: TEAL,
                  icon: <MessageCircle className="w-3.5 h-3.5" />,
                  pct: 35,
                },
                {
                  label: "Avg Likes / Post",
                  value: Number(engagement.avgLikesPerPost).toLocaleString(),
                  color: PURPLE,
                  icon: <TrendingUp className="w-3.5 h-3.5" />,
                  pct: 48,
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <div
                      className="flex items-center gap-2"
                      style={{ color: item.color }}
                    >
                      {item.icon}
                      <span className="text-xs" style={{ color: TEXT_MAIN }}>
                        {item.label}
                      </span>
                    </div>
                    <span
                      className="text-sm font-bold"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "oklch(0.22 0.008 282)" }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.pct}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
