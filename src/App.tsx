import { useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Beaker,
  ChevronRight,
  CircleHelp,
  Droplets,
  Gauge,
  Leaf,
  Menu,
  Map,
  Microscope,
  Settings,
  ShieldCheck,
  Sprout,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

type Tab =
  | "Dashboard"
  | "Experimental Data"
  | "Graphs & Analysis"
  | "Soil Transition Map"
  | "Settings";

const moistureData = [
  { condition: "Dry", resistance: 29, moisture: 11 },
  { condition: "Slightly", resistance: 18, moisture: 34 },
  { condition: "Moderate", resistance: 13, moisture: 48 },
  { condition: "Wet", resistance: 8, moisture: 61 },
];

const retentionData = [
  { time: "0", moisture: 12 },
  { time: "10", moisture: 34 },
  { time: "20", moisture: 47 },
  { time: "30", moisture: 53 },
  { time: "40", moisture: 57 },
  { time: "50", moisture: 60 },
];

const navigation = [
  { name: "Dashboard", icon: Activity },
  { name: "Experimental Data", icon: Beaker },
  { name: "Graphs & Analysis", icon: BarChart3 },
  { name: "Soil Transition Map", icon: Map },
  { name: "Settings", icon: Settings },
] as const;

const lifecycle = [
  {
    title: "SENSE",
    subtitle: "GHOST sensing element",
    description: "Temporary soil intelligence",
    icon: Wifi,
    tone: "green",
  },
  {
    title: "DEGRADE",
    subtitle: "Biodegradable substrate",
    description: "Planned end of life",
    icon: Sprout,
    tone: "brown",
  },
  {
    title: "PROTECT",
    subtitle: "SOILSKIN layer",
    description: "Protect exposed soil",
    icon: ShieldCheck,
    tone: "green",
  },
  {
    title: "REGENERATE",
    subtitle: "Seed + soil transition",
    description: "Support the next crop cycle",
    icon: Leaf,
    tone: "leaf",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitle = useMemo(() => {
    return activeTab === "Dashboard"
      ? "Soil Transition Intelligence"
      : activeTab;
  }, [activeTab]);

  const selectTab = (tab: Tab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <div className="app-shell">
      {/* Mobile header */}
      <header className="mobile-header">
        <div className="brand">
          <div className="brand-mark">
            <Leaf size={22} strokeWidth={2.2} />
          </div>

          <div>
            <strong>GHOST × SOILSKIN</strong>
            <span>Soil Transition Intelligence</span>
          </div>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Open navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  className={
                    activeTab === item.name
                      ? "mobile-nav-item active"
                      : "mobile-nav-item"
                  }
                  onClick={() => selectTab(item.name)}
                >
                  <Icon size={18} />
                  {item.name}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark large">
            <Leaf size={28} strokeWidth={2} />
          </div>

          <div>
            <h1>GHOST × SOILSKIN</h1>
            <p>Soil Transition Intelligence</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={
                  activeTab === item.name ? "nav-item active" : "nav-item"
                }
                onClick={() => selectTab(item.name)}
              >
                <Icon size={18} strokeWidth={1.8} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-quote">
          <p>
            “We don't design technology for one crop. We design the transition
            between crops.”
          </p>

          <div className="quote-brand">
            <Leaf size={15} />
            <span>GHOST × SOILSKIN</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <div className="breadcrumb">
              Research Prototype <span className="status-dot" />
            </div>
          </div>

          <div className="topbar-right">
            <span>Green Agriculture</span>
            <span className="separator">•</span>
            <span>Sustainable Tomorrow</span>
            <Leaf size={24} className="top-leaf" />
          </div>
        </header>

        <div className="page-container">
          {activeTab === "Dashboard" && (
            <Dashboard
              pageTitle={pageTitle}
              onNavigate={selectTab}
            />
          )}

          {activeTab === "Experimental Data" && (
            <ExperimentalData onNavigate={selectTab} />
          )}

          {activeTab === "Graphs & Analysis" && (
            <GraphsAnalysis />
          )}

          {activeTab === "Soil Transition Map" && (
            <TransitionPage />
          )}

          {activeTab === "Settings" && <SettingsPage />}
        </div>
      </main>
    </div>
  );
}

function Dashboard({
  onNavigate,
}: {
  pageTitle: string;
  onNavigate: (tab: Tab) => void;
}) {
  return (
    <>
      <Hero />

      <section className="section-heading">
        <div>
          <h2>Soil Status</h2>
          <p>Live data from experimental setup</p>
        </div>

        <div className="updated">
          <span className="status-dot" />
          Last updated: prototype
        </div>
      </section>

      <section className="status-grid">
        <StatusCard
          icon={<Droplets size={20} />}
          label="Soil Moisture"
          value="MODERATE"
          subValue="Measured experimentally"
          tone="blue"
          trend="Awaiting data"
        />

        <StatusCard
          icon={<Gauge size={20} />}
          label="Resistance (GHOST)"
          value="—"
          subValue="Add multimeter reading"
          tone="amber"
          trend="No live reading"
        />

        <StatusCard
          icon={<Leaf size={20} />}
          label="Soil Cover"
          value="LOW"
          subValue="Post-harvest status"
          tone="green"
          trend="Track experimentally"
        />

        <StatusCard
          icon={<Sprout size={20} />}
          label="Germination Rate"
          value="—"
          subValue="Awaiting experiment"
          tone="leaf"
          trend="No result yet"
        />
      </section>

      <section className="dashboard-grid">
        <div className="evidence-panel card">
          <PanelHeader
            title="Experimental Evidence"
            subtitle="Real measurements from your prototype"
          />

          <div className="experiment-tabs">
            <button className="experiment-tab active">
              Moisture Response
            </button>
            <button className="experiment-tab">SOILSKIN Comparison</button>
            <button className="experiment-tab">Germination</button>
            <button className="experiment-tab">Degradation</button>
          </div>

          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-title">
                <span>Resistance vs Soil Moisture</span>
                <small>Prototype data</small>
              </div>

              <div className="chart">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moistureData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="condition"
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="resistance"
                      stroke="#2e7749"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        strokeWidth: 2,
                        fill: "#ffffff",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-title">
                <span>Moisture Response Curve</span>
                <small>Reference visualization</small>
              </div>

              <div className="chart">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={retentionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="moisture"
                      stroke="#4a9962"
                      fill="#dff2e3"
                      strokeWidth={2.5}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <TransitionMap />
      </section>

      <section className="lower-grid">
        <SoilSkinPanel />

        <GhostStatus />

        <InsightPanel />

        <ActionPanel onNavigate={onNavigate} />
      </section>
    </>
  );
}

function Hero() {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-background" />

      <div className="hero-content">
        <span className="hero-eyebrow">GHOST × SOILSKIN</span>

        <h2>
          From Soil Intelligence
          <br />
          to Soil Regeneration
        </h2>

        <p>
          GHOST provides temporary soil sensing.
          <br />
          SOILSKIN protects and enables the next life cycle.
        </p>
      </div>

      <div className="hero-lifecycle">
  {lifecycle.map((item, index) => {
    const Icon = item.icon;

    return (
      <div className="hero-step-wrapper" key={item.title}>
        <div className={`hero-step ${item.tone}`}>
          <Icon size={23} />
        </div>

        <div className="hero-step-text">
          <strong>{item.title}</strong>
          <span>{item.description}</span>
        </div>

        {index !== lifecycle.length - 1 && (
          <ChevronRight className="hero-arrow" size={20} />
        )}
      </div>
    );
  })}
</div>

      <div className="hero-plant">
        <div className="soil-illustration">
          <div className="soil-layer layer-one" />
          <div className="soil-layer layer-two" />
          <div className="soil-layer layer-three" />
        </div>

        <div className="plant">
          <div className="stem" />
          <div className="leaf left" />
          <div className="leaf right" />
        </div>
      </div>
    </motion.section>
  );
}

function StatusCard({
  icon,
  label,
  value,
  subValue,
  tone,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue: string;
  tone: string;
  trend: string;
}) {
  return (
    <motion.div
      className={`status-card ${tone}`}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <div className="status-icon">{icon}</div>

      <div className="status-label">{label}</div>

      <div className="status-value">{value}</div>

      <div className="status-subvalue">{subValue}</div>

      <div className="status-trend">
        <span>{trend}</span>
      </div>

      <div className="mini-chart">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </motion.div>
  );
}

function PanelHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="panel-header">
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function TransitionMap() {
  return (
    <div className="transition-panel card">
      <PanelHeader
        title="Soil Transition Map"
        subtitle="The full lifecycle in one view"
      />

      <div className="transition-map-fixed">
        {/* Lifecycle line */}
        <div className="transition-map-line" />

        {/* LEFT SIDE — LIFECYCLE */}
        <div className="transition-stages">
          {lifecycle.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                className="transition-stage-fixed"
                key={item.title}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.35,
                }}
              >
                <div className={`transition-icon-fixed ${item.tone}`}>
                  <Icon size={21} strokeWidth={2} />
                </div>

                <div className="transition-copy-fixed">
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                  <small>{item.description}</small>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT SIDE — VISUAL */}
        <div className="transition-visual-fixed">
          <div className="soil-block-fixed">
            <div className="soil-sensor-fixed" />
          </div>

          <div className="soil-block-fixed second">
            <div className="soil-skin-layer-fixed" />
          </div>

          <div className="soil-block-fixed third">
            <div className="tiny-plant-fixed">
              <div className="plant-stem-fixed" />
              <span className="plant-leaf-left-fixed" />
              <span className="plant-leaf-right-fixed" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SoilSkinPanel() {
  return (
    <div className="card soilskin-panel">
      <PanelHeader
        title="SOILSKIN Performance"
        subtitle="Protection layer for exposed soil"
      />

      <div className="soil-comparison">
        <ComparisonRow
          imageClass="bare-soil"
          title="Bare Soil"
          items={[
            "Higher runoff",
            "More sediment loss",
            "Faster drying",
          ]}
        />

        <ComparisonRow
          imageClass="soilskin"
          title="SOILSKIN"
          items={[
            "Target: reduced runoff",
            "Target: less sediment loss",
            "Target: better moisture retention",
          ]}
          highlight
        />
      </div>

      <div className="runoff-comparison">
        <strong>Runoff / Sediment Comparison</strong>

        <div className="bar-row">
          <span>Bare Soil</span>
          <div className="bar-track">
            <div className="bar bare" style={{ width: "100%" }} />
          </div>
        </div>

        <div className="bar-row">
          <span>SOILSKIN</span>
          <div className="bar-track">
            <div className="bar skin" style={{ width: "34%" }} />
          </div>
        </div>

        <small>
          Example visualization only — replace with your measured values.
        </small>
      </div>
    </div>
  );
}

function ComparisonRow({
  imageClass,
  title,
  items,
  highlight,
}: {
  imageClass: string;
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div className={`comparison-row ${highlight ? "highlight" : ""}`}>
      <div className={`comparison-image ${imageClass}`}>
        <div className="soil-grain grain-one" />
        <div className="soil-grain grain-two" />
        <div className="soil-grain grain-three" />

        {highlight && <div className="mini-sprout" />}
      </div>

      <div>
        <strong>{title}</strong>

        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GhostStatus() {
  const stages = [
    { title: "Sensing", sub: "Active", active: true },
    { title: "Degrading", sub: "Phase 2" },
    { title: "Soil Transition", sub: "Phase 3" },
    { title: "Completed", sub: "→ SOILSKIN" },
  ];

  return (
    <div className="card ghost-status">
      <PanelHeader
        title="GHOST Status"
        subtitle="Sensor lifecycle and condition"
      />

      <div className="ghost-timeline">
        {stages.map((stage, index) => (
          <div className="ghost-stage" key={stage.title}>
            <div
              className={`ghost-stage-icon ${
                stage.active ? "active" : ""
              }`}
            >
              {index === 0 && <Wifi size={17} />}
              {index === 1 && <Sprout size={17} />}
              {index === 2 && <ShieldCheck size={17} />}
              {index === 3 && <Leaf size={17} />}
            </div>

            <strong>{stage.title}</strong>
            <span>{stage.sub}</span>

            {index < stages.length - 1 && (
              <div className="ghost-stage-line" />
            )}
          </div>
        ))}
      </div>

      <div className="current-condition">
        <div className="condition-icon">
          <Leaf size={18} />
        </div>

        <div>
          <strong>Current condition: Sensing phase</strong>
          <p>
            The graphite–cellulose sensing element is designed to respond to
            changes in soil moisture.
          </p>
        </div>
      </div>
    </div>
  );
}

function InsightPanel() {
  return (
    <div className="card insight-panel">
      <PanelHeader
        title="Key Insights"
        subtitle="Evidence-driven interpretation"
      />

      <ul className="insights">
        <li>
          <span>✓</span>
          Soil moisture can be investigated through relative resistance
          changes.
        </li>

        <li>
          <span>✓</span>
          GHOST is designed as a temporary sensing interface rather than
          permanent hardware.
        </li>

        <li>
          <span>✓</span>
          SOILSKIN connects post-harvest soil protection with the next crop
          cycle.
        </li>
      </ul>
    </div>
  );
}

function ActionPanel({
  onNavigate,
}: {
  onNavigate: (tab: Tab) => void;
}) {
  return (
    <div className="card action-panel">
      <PanelHeader
        title="Next Recommended Action"
        subtitle="Build the evidence layer"
      />

      <div className="action-content">
        <CircleHelp size={21} />

        <p>
          Record dry, moderately moist and wet soil resistance values. Then
          compare repeated measurements and add them to the dashboard.
        </p>
      </div>

      <button
        className="primary-button"
        onClick={() => onNavigate("Experimental Data")}
      >
        Open Experimental Data
        <ChevronRight size={17} />
      </button>
    </div>
  );
}

function ExperimentalData({
  onNavigate,
}: {
  onNavigate: (tab: Tab) => void;
}) {
  return (
    <PageSection
      title="Experimental Data"
      subtitle="Enter and review measurements generated from the physical prototype."
    >
      <div className="data-grid">
        {[
          ["Moisture Response", "Dry / Slightly Moist / Moderate / Wet"],
          ["Resistance", "Record repeated multimeter readings"],
          ["Germination", "Normal seed vs GHOST pod seed"],
          ["SOILSKIN", "Runoff, sediment and moisture retention"],
          ["Degradation", "Physical end-of-life observations"],
          ["Environmental Notes", "Soil, temperature, watering and timing"],
        ].map(([title, description]) => (
          <div className="data-card card" key={title}>
            <div className="data-icon">
              <Microscope size={21} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <button onClick={() => onNavigate("Graphs & Analysis")}>
              Analyse <ChevronRight size={15} />
            </button>
          </div>
        ))}
      </div>
    </PageSection>
  );
}

function GraphsAnalysis() {
  return (
    <PageSection
      title="Graphs & Analysis"
      subtitle="Experimental relationships will appear here as real measurements are added."
    >
      <div className="analysis-grid">
        <div className="large-chart card">
          <PanelHeader
            title="Resistance vs Moisture Condition"
            subtitle="Example structure — replace with measured values"
          />

          <div className="big-chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moistureData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="condition" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="resistance"
                  stroke="#2e7749"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="analysis-note card">
          <Zap size={23} />

          <h3>What the dashboard should answer</h3>

          <ul>
            <li>Does resistance change consistently with moisture?</li>
            <li>Are repeated measurements reproducible?</li>
            <li>How does SOILSKIN affect moisture retention?</li>
            <li>Does the seed pod preserve seed viability?</li>
            <li>What limitations remain before field validation?</li>
          </ul>
        </div>
      </div>
    </PageSection>
  );
}

function TransitionPage() {
  return (
    <PageSection
      title="Soil Transition Map"
      subtitle="GHOST and SOILSKIN treated as one seasonal lifecycle."
    >
      <div className="full-transition card">
        {lifecycle.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              className="full-transition-stage"
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.12,
                duration: 0.4,
              }}
            >
              {/* ICON */}
              <div className={`big-transition-icon ${item.tone}`}>
                <Icon size={30} strokeWidth={2} />
              </div>

              {/* STAGE NUMBER */}
              <span className="full-transition-number">
                0{index + 1}
              </span>

              {/* TITLE */}
              <h3 className="full-transition-title">
                {item.title}
              </h3>

              {/* SUBTITLE */}
              <p className="full-transition-subtitle">
                {item.subtitle}
              </p>

              {/* DESCRIPTION */}
              <small className="full-transition-description">
                {item.description}
              </small>

              {/* ARROW */}
              {index !== lifecycle.length - 1 && (
                <div className="full-transition-arrow">
                  <ChevronRight size={25} strokeWidth={1.8} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </PageSection>
  );
}

function SettingsPage() {
  return (
    <PageSection
      title="Settings"
      subtitle="Dashboard configuration and prototype information."
    >
      <div className="settings-grid">
        <div className="setting-card card">
          <Settings size={22} />
          <h3>Prototype Mode</h3>
          <p>
            This dashboard currently uses placeholder/example values. Replace
            them with your measured data before presenting experimental
            results.
          </p>
        </div>

        <div className="setting-card card">
          <Gauge size={22} />
          <h3>Data Source</h3>
          <p>
            Planned source: CSV / JSON generated from your physical
            experiments.
          </p>
        </div>

        <div className="setting-card card">
          <Leaf size={22} />
          <h3>Lifecycle</h3>
          <p>
            SENSE → DEGRADE → PROTECT → REGENERATE
          </p>
        </div>
      </div>
    </PageSection>
  );
}

function PageSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="generic-page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="generic-heading">
        <span>GHOST × SOILSKIN</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      {children}
    </motion.div>
  );
}

export default App;