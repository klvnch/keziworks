export type ProjectId = "f1-strat-analyzer" | "alosplit" | "momentum";

export interface F1MockData {
  lapCurrent: number;
  lapTotal: number;
  raceName: string;
  weather: {
    airTemp: string;
    trackTemp: string;
    wind: string;
    condition: string;
  };
  leaderboard: Array<{
    pos: number;
    driver: string;
    gap: string;
    s1: string;
    s2: string;
    s3: string;
    tyre: string;
  }>;
  alerts: Array<{ driver: string; text: string }>;
  blunderAlert: {
    driver: string;
    title: string;
    message: string;
  };
  telemetryPaths: {
    speed: string;
    throttle: string;
    brake: string;
  };
}

export interface ALOSplitMockData {
  sessionName: string;
  date: string;
  totalSession: number;
  debtAmount: number;
  participants: Array<{ initials: string; color: string }>;
  pushNotification: {
    title: string;
    body: string;
  };
}

export interface MomentumLoadState {
  id: "chill" | "moderate" | "chaos";
  label: string;
  gradientFrom: string;
  gradientTo: string;
  tasks: string[];
}

export interface MomentumMockData {
  loadStates: MomentumLoadState[];
}

export interface Project {
  id: ProjectId;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  accentColor: string;
  comingSoon?: boolean;
  mockData: F1MockData | ALOSplitMockData | MomentumMockData;
}

export const projects: Project[] = [
  {
    id: "f1-strat-analyzer",
    title: "F1 26 Strat Analyzer",
    tagline: "Deep professional racing telemetry insights",
    description:
      "A specialized telemetry dashboard born out of a core passion for motorsport, built to visualize complex track data and strategic blunders for fellow racing enthusiasts.",
    techStack: ["Vue", "Tailwind CSS", "Python (FastF1)"],
    accentColor: "#22d3ee",
    mockData: {
      lapCurrent: 56,
      lapTotal: 66,
      raceName: "Monaco GP 2026",
      weather: {
        airTemp: "29.9°C",
        trackTemp: "48.7°C",
        wind: "1.6 km/h",
        condition: "DRY OPTIMAL",
      },
      leaderboard: [
        {
          pos: 1,
          driver: "HAM",
          gap: "LEADER",
          s1: "22.891",
          s2: "31.204",
          s3: "24.118",
          tyre: "H",
        },
        {
          pos: 2,
          driver: "RUS",
          gap: "+1.842",
          s1: "23.012",
          s2: "31.441",
          s3: "24.205",
          tyre: "M",
        },
        {
          pos: 3,
          driver: "SAI",
          gap: "+4.221",
          s1: "23.118",
          s2: "31.552",
          s3: "24.310",
          tyre: "H",
        },
      ],
      alerts: [
        {
          driver: "HAM",
          text: "Steward review — track limits Turn 10",
        },
        {
          driver: "SAI",
          text: "5s penalty — unsafe release",
        },
      ],
      blunderAlert: {
        driver: "BEA",
        title: "STAYOUT BLUNDER",
        message:
          "High Alertness Theme: Pitted lap 54 under SC — lost 12.4s vs stay-out rivals.",
      },
      telemetryPaths: {
        speed:
          "M 0 180 C 40 160, 80 120, 120 100 S 200 60, 280 80 S 360 140, 400 120 S 480 40, 560 60 S 640 100, 720 90",
        throttle:
          "M 0 200 C 60 190, 100 150, 140 140 S 220 100, 280 130 S 340 160, 400 120 S 460 80, 520 100 S 600 140, 720 130",
        brake:
          "M 0 220 L 80 220 L 100 160 L 120 220 L 200 220 L 220 180 L 240 220 L 320 220 L 340 150 L 360 220 L 440 220 L 460 170 L 480 220 L 560 220 L 580 140 L 600 220 L 680 220 L 700 190 L 720 220",
      },
    } satisfies F1MockData,
  },
  {
    id: "alosplit",
    title: "ALOSplit",
    tagline: "Session-based split billing with global debt netting",
    description:
      "A mobile bill-splitter built to solve exhausting group math, handling multiple venues and intelligent global debt optimization where traditional single-receipt apps fail.",
    techStack: ["React Native", "Expo", "Node.js", "PostgreSQL"],
    accentColor: "#6ee7b7",
    mockData: {
      sessionName: "Nongkrong Duo",
      date: "Jun 16, 2026",
      totalSession: 344676,
      debtAmount: 44837,
      participants: [
        { initials: "FI", color: "#6366f1" },
        { initials: "KL", color: "#14b8a6" },
      ],
      pushNotification: {
        title: "Payment Received",
        body: "Nongkrong Duo settled · Rp 44.837",
      },
    } satisfies ALOSplitMockData,
  },
  {
    id: "momentum",
    title: "Momentum",
    tagline: "Workload-adaptive self-care routines",
    description:
      "A workload-adaptive behavioral assistant designed from personal burnout friction to maintain critical daily habits and completely eliminate the psychological snowball skip effect.",
    techStack: ["Laravel", "MySQL", "React Native"],
    accentColor: "#fbbf24",
    comingSoon: true,
    mockData: {
      loadStates: [
        {
          id: "chill",
          label: "Chill",
          gradientFrom: "#86efac",
          gradientTo: "#22c55e",
          tasks: [
            "Morning stretch",
            "Hydrate 500ml",
            "10-min walk",
            "Journal 3 lines",
            "Evening wind-down",
            "Sleep by 11pm",
          ],
        },
        {
          id: "moderate",
          label: "Moderate",
          gradientFrom: "#fbbf24",
          gradientTo: "#f97316",
          tasks: [
            "Quick workout",
            "Meal prep",
            "Inbox zero",
            "Plan tomorrow",
          ],
        },
        {
          id: "chaos",
          label: "Chaos",
          gradientFrom: "#f87171",
          gradientTo: "#dc2626",
          tasks: ["Deep breath", "One critical task"],
        },
      ],
    } satisfies MomentumMockData,
  },
];

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s/g, " ");
}
