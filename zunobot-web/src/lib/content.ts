export const AGENTS = [
  {
    id: "personal",
    code: "P1",
    name: "Personal Agent",
    blurb:
      "Tell it what you want to achieve. Your personal agent remembers the context, connects the right tools, and makes a thoughtful plan to move your work forward.",
    cta: "Meet your personal agent",
    included: 24,
    extra: "0.4 credits",
    tags: [
      "Context-aware reasoning",
      "Persistent working memory",
      "Connected tools",
      "Multi-step planning",
      "Human approval controls",
    ],
  },
  {
    id: "research",
    code: "P2",
    name: "Research Agent",
    blurb:
      "Turns open questions into structured knowledge. It reads, compares sources, and returns a brief you can act on.",
    included: "Open",
    extra: "Complimentary",
    tags: ["Source tracing", "Brief synthesis", "Citation memory"],
  },
  {
    id: "code",
    code: "P3",
    name: "Code Agent",
    blurb:
      "Writes, reviews, and repairs software with the rest of the system in view — not a isolated snippet machine.",
    included: 12,
    extra: "1.2 credits",
    tags: ["Repo context", "Test-aware edits", "Review notes"],
  },
  {
    id: "design",
    code: "P4",
    name: "Design Agent",
    blurb:
      "Explores visual systems, layouts, and motion language while staying on-brand with your working context.",
    included: 32,
    extra: "1.4 credits",
    tags: ["System tokens", "Layout exploration", "Motion notes"],
  },
  {
    id: "data",
    code: "P5",
    name: "Data Agent",
    blurb:
      "Connects tables, traces anomalies, and explains the number behind the number in plain language.",
    included: 18,
    extra: "0.8 credits",
    tags: ["Warehouse tools", "Anomaly notes", "Plain-language stats"],
  },
  {
    id: "planning",
    code: "P6",
    name: "Planning Agent",
    blurb:
      "Holds the horizon. It sequences work, flags blockers, and keeps specialists pointed at the same outcome.",
    included: 6,
    extra: "1.6 credits",
    tags: ["Sequencing", "Blocker detection", "Shared intent"],
  },
  {
    id: "router",
    code: "P7",
    name: "Tool Router",
    blurb:
      "Chooses the next tool with restraint. Permissions, cost, and confidence sit in the loop before anything runs.",
    included: 8,
    extra: "2.4 credits",
    tags: ["Tool selection", "Permission gates", "Cost awareness"],
  },
  {
    id: "operations",
    code: "P8",
    name: "Operations Agent",
    blurb:
      "Bring a little initiative to the everyday. Your operations agent coordinates repeatable work, tracks the moving pieces, and keeps the system honest.",
    included: 16,
    extra: "0.9 credits",
    tags: [
      "Workflow orchestration",
      "Repeatable tasks",
      "Team coordination",
      "Exception handling",
      "Action summaries",
    ],
  },
  {
    id: "guardian",
    code: "P9",
    name: "Guardian Agent",
    blurb:
      "The last look. It watches for drift, asks for approval when it should, and keeps the human in the loop.",
    included: "Open",
    extra: "Complimentary",
    tags: ["Policy checks", "Approval gates", "Audit trail"],
  },
] as const;

export type AgentId = (typeof AGENTS)[number]["id"];

export const PRICING = [
  { id: "personal", name: "Personal Agent", featured: true, included: 24, extra: "0.4 credits" },
  { id: "code", name: "Code Agent", featured: false, included: 12, extra: "1.2 credits" },
  { id: "review", name: "Code Review", featured: false, included: 8, extra: "2.4 credits" },
  { id: "planning", name: "Planning Agent", featured: false, included: 6, extra: "1.6 credits" },
  { id: "design", name: "Design Agent", featured: false, included: 32, extra: "1.4 credits" },
  { id: "knowledge", name: "Knowledge Explorer", featured: false, included: 18, extra: "0.8 credits" },
  { id: "research", name: "Research Agent", featured: false, included: "Open", extra: "Complimentary" },
  { id: "guardian", name: "Guardian Agent", featured: false, included: "Open", extra: "Complimentary" },
] as const;

export const LAYERS = [
  {
    id: "l1",
    label: "L1 Perception & context",
    copy: "Sensors, files, and conversation land here first. The system decides what is signal.",
    nodes: ["personal", "observation", "tools", "perception"],
  },
  {
    id: "l2",
    label: "L2 Reasoning & planning",
    copy: "Working context, permissions, and knowledge fold into a plan the rest of the stack can share.",
    nodes: ["intent", "permissions", "context", "knowledge"],
  },
  {
    id: "l3",
    label: "L3 Tools & execution",
    copy: "Connected tools run with human gates. Exceptions return as summaries, not silent failure.",
    nodes: ["tools", "permissions", "context"],
  },
  {
    id: "l4",
    label: "L4 Agent network",
    copy: "Specialists talk through shared memory. One intent. Many hands. One clear result.",
    nodes: ["personal", "context", "memory"],
  },
] as const;

export const NODES = [
  { id: "personal", label: "Personal Agent", x: 18, y: 16 },
  { id: "observation", label: "Observation", x: 50, y: 16 },
  { id: "tools", label: "Connected Tools", x: 82, y: 16 },
  { id: "intent", label: "User Intent", x: 10, y: 50 },
  { id: "permissions", label: "Permissions", x: 32, y: 50 },
  { id: "context", label: "Working Context", x: 58, y: 50 },
  { id: "knowledge", label: "Knowledge", x: 86, y: 50 },
  { id: "perception", label: "Perception", x: 28, y: 84 },
  { id: "memory", label: "Long-term Memory", x: 72, y: 84 },
] as const;

export const STORIES = [
  {
    kicker: "Research / Context to knowledge",
    title: "From question to clarity.",
    body: "How an independent team connects research, planning, and action with specialized agents.",
    kind: "mask" as const,
  },
  {
    kicker: "Workflow / Plan to action",
    title: "A system that takes initiative.",
    body: "From a scattered brief to a coordinated workflow: a new way to move work forward.",
    kind: "gyro" as const,
  },
  {
    kicker: "Operations / Tools that work",
    title: "Less routine. More possibility.",
    body: "An operations agent handles the moving parts so a team can focus on its next decision.",
    kind: "disc" as const,
  },
  {
    kicker: "Design / Language to form",
    title: "Taste, kept in memory.",
    body: "A design agent holds the system so every surface — product, deck, motion — stays coherent.",
    kind: "mask" as const,
  },
  {
    kicker: "Code / Intent to merge",
    title: "Software with a witness.",
    body: "The code agent writes with tests in view, then the guardian asks before anything ships.",
    kind: "gyro" as const,
  },
  {
    kicker: "Collective / Many to one",
    title: "Specialists, one result.",
    body: "Research, design, and operations meet in shared context and return a single next step.",
    kind: "disc" as const,
  },
];

export const NAV: { href: string; label: string; menu?: boolean }[] = [
  { href: "#products", label: "Products", menu: true },
  { href: "#builders", label: "Builders" },
  { href: "#how", label: "How it works" },
  { href: "#stories", label: "Discover" },
  { href: "#agents", label: "Agents" },
  { href: "#network", label: "Collective" },
];
