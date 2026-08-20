import * as React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { StoreFrontmatter } from "../../types";
import { calculatePolicyGrade } from "../../lib/utils";
import { BarChart3, PieChart, ShieldCheck, Zap, DollarSign, Calendar, Sparkles } from "lucide-react";

interface ComparisonChartProps {
  storeA: StoreFrontmatter;
  storeB: StoreFrontmatter;
}

// Helper to extract numeric days from returnWindow string
export function parseReturnWindowDays(windowStr: string): number {
  if (!windowStr) return 30;
  const lower = windowStr.toLowerCase();
  if (lower.includes("365") || lower.includes("1 year") || lower.includes("unlimited") || lower.includes("no limit")) {
    return 365;
  }
  if (lower.includes("90")) return 90;
  if (lower.includes("60")) return 60;
  if (lower.includes("45")) return 45;
  if (lower.includes("30")) return 30;
  if (lower.includes("15") || lower.includes("14")) return 14;
  if (lower.includes("7")) return 7;

  const match = lower.match(/\d+/);
  return match ? parseInt(match[0], 10) : 30;
}

export function ComparisonChart({ storeA, storeB }: ComparisonChartProps) {
  const [chartType, setChartType] = React.useState<"bar" | "radar">("bar");

  // Calculate Metrics
  const daysA = parseReturnWindowDays(storeA.quickAnswer.returnWindow);
  const daysB = parseReturnWindowDays(storeB.quickAnswer.returnWindow);

  // Policy Grade Score (0-100)
  const gradeObjA = calculatePolicyGrade(storeA.quickAnswer);
  const gradeObjB = calculatePolicyGrade(storeB.quickAnswer);
  const scoreA = gradeObjA.score || 85;
  const scoreB = gradeObjB.score || 80;

  // Restocking Fee Penalty Score (0 = No Fee $0, 25 = Fee Applies)
  const feeA = storeA.quickAnswer.restockingFee ? 15 : 0;
  const feeB = storeB.quickAnswer.restockingFee ? 15 : 0;

  // Receipt Flexibility Score (100 = Lookup/Optional, 40 = Mandatory Receipt)
  const receiptScoreA = storeA.quickAnswer.receiptRequired ? 40 : 100;
  const receiptScoreB = storeB.quickAnswer.receiptRequired ? 40 : 100;

  // Bar Chart Dataset
  const barData = [
    {
      metric: "Return Window (Days)",
      [storeA.brand]: daysA,
      [storeB.brand]: daysB,
    },
    {
      metric: "Policy Grade Score (100)",
      [storeA.brand]: scoreA,
      [storeB.brand]: scoreB,
    },
    {
      metric: "Receipt Flexibility (100)",
      [storeA.brand]: receiptScoreA,
      [storeB.brand]: receiptScoreB,
    },
    {
      metric: "Restocking Fee Risk ($)",
      [storeA.brand]: feeA,
      [storeB.brand]: feeB,
    },
  ];

  // Radar Chart Dataset
  const radarData = [
    { subject: "Return Days", A: Math.min(daysA, 100), B: Math.min(daysB, 100), fullMark: 100 },
    { subject: "Overall Grade", A: scoreA, B: scoreB, fullMark: 100 },
    { subject: "Receipt Ease", A: receiptScoreA, B: receiptScoreB, fullMark: 100 },
    { subject: "No Fee Guarantee", A: feeA === 0 ? 100 : 50, B: feeB === 0 ? 100 : 50, fullMark: 100 },
    { subject: "Online Label Access", A: storeA.quickAnswer.onlineReturns ? 100 : 30, B: storeB.quickAnswer.onlineReturns ? 100 : 30, fullMark: 100 },
  ];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 font-sans my-6">
      {/* Chart Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-red-100 text-red-800 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md">
              Recharts Visualizer
            </span>
            <span className="text-xs text-slate-500 font-mono">Side-by-Side Analysis</span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-1">
            {storeA.brand} vs {storeB.brand} Metrics Chart
          </h3>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setChartType("bar")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              chartType === "bar"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Bar Chart</span>
          </button>

          <button
            onClick={() => setChartType("radar")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              chartType === "radar"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <PieChart className="h-3.5 w-3.5" />
            <span>Radar Matrix</span>
          </button>
        </div>
      </div>

      {/* Chart Display Area */}
      <div className="w-full h-72 sm:h-80 min-h-[280px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="metric" tick={{ fontSize: 11, fill: "#475569" }} />
              <YAxis tick={{ fontSize: 11, fill: "#475569" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Bar dataKey={storeA.brand} fill="#dc2626" radius={[6, 6, 0, 0]} />
              <Bar dataKey={storeB.brand} fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#475569" }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar name={storeA.brand} dataKey="A" stroke="#dc2626" fill="#dc2626" fillOpacity={0.5} />
              <Radar name={storeB.brand} dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#334155",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
            </RadarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary Score Callout Footer */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs font-sans">
        <div className="p-3 bg-red-50/70 border border-red-200/80 rounded-xl flex items-center justify-between">
          <div>
            <span className="font-bold text-red-950 block">{storeA.brand}</span>
            <span className="text-[11px] text-red-800">
              {daysA} Days Return Window • Grade {gradeObjA.grade}
            </span>
          </div>
          <span className="font-mono font-extrabold text-red-800 text-sm bg-white px-2.5 py-1 rounded-lg border border-red-200">
            {scoreA}/100
          </span>
        </div>

        <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between">
          <div>
            <span className="font-bold text-blue-950 block">{storeB.brand}</span>
            <span className="text-[11px] text-blue-800">
              {daysB} Days Return Window • Grade {gradeObjB.grade}
            </span>
          </div>
          <span className="font-mono font-extrabold text-blue-800 text-sm bg-white px-2.5 py-1 rounded-lg border border-blue-200">
            {scoreB}/100
          </span>
        </div>
      </div>
    </div>
  );
}
