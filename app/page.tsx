"use client";
import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, PieChart, Pie
} from "recharts";

const C = {
  bg: "#07090f", bgCard: "#0e1420", bgCardHover: "#131b2a",
  primary: "#06d6a0", secondary: "#3a86ff", accent: "#ff006e",
  warning: "#ffbe0b", purple: "#8338ec",
  text: "#f0f4fc", muted: "#8892a4", border: "#1e2a3a",
};

const CHART_COLORS = [C.primary, C.secondary, C.accent, C.warning, C.purple, "#fb8500"];

const ttStyle = {
  backgroundColor: "#1a2232", border: `1px solid ${C.border}`,
  borderRadius: "8px", color: C.text, fontFamily: "inherit", fontSize: "0.82rem",
};

// --- DATA ---
const ageExposureData = [
  { age: "Under 10", boys: 15, girls: 8 },
  { age: "10–12", boys: 42, girls: 24 },
  { age: "13–15", boys: 78, girls: 45 },
  { age: "16–18", boys: 93, girls: 62 },
];

const prevalenceData = [
  { group: "18–24", weekly: 46, daily: 18 },
  { group: "25–34", weekly: 38, daily: 14 },
  { group: "35–44", weekly: 28, daily: 9 },
  { group: "45–54", weekly: 18, daily: 6 },
  { group: "55+", weekly: 11, daily: 4 },
];

const effectsData = [
  { effect: "Anxiety/Depression", pct: 68 },
  { effect: "Relationship Damage", pct: 57 },
  { effect: "Social Isolation", pct: 52 },
  { effect: "Sleep Disruption", pct: 43 },
  { effect: "Sexual Dysfunction", pct: 44 },
  { effect: "Work/Study Issues", pct: 38 },
];

const brainData = [
  { area: "Prefrontal Cortex", healthy: 90, addicted: 62 },
  { area: "Nucleus Accumbens", healthy: 78, addicted: 96 },
  { area: "Amygdala", healthy: 74, addicted: 88 },
  { area: "Ant. Cingulate", healthy: 85, addicted: 54 },
  { area: "Orbitofrontal", healthy: 87, addicted: 57 },
];

const recoveryData = [
  { label: "Baseline\n(Using)", dop: 45, mood: 40, focus: 38, energy: 42 },
  { label: "Wk 1", dop: 32, mood: 25, focus: 28, energy: 30 },
  { label: "Wk 2", dop: 40, mood: 35, focus: 38, energy: 38 },
  { label: "Wk 3", dop: 50, mood: 46, focus: 50, energy: 48 },
  { label: "Mo 1", dop: 62, mood: 59, focus: 64, energy: 62 },
  { label: "Mo 2", dop: 73, mood: 69, focus: 75, energy: 72 },
  { label: "Mo 3", dop: 81, mood: 77, focus: 83, energy: 80 },
  { label: "Mo 6", dop: 90, mood: 86, focus: 91, energy: 89 },
  { label: "Yr 1", dop: 95, mood: 93, focus: 96, energy: 94 },
];

const pieData = [
  { name: "Anxiety/Depression", value: 68 },
  { name: "Relationship Issues", value: 57 },
  { name: "Social Isolation", value: 52 },
  { name: "Sexual Dysfunction", value: 44 },
  { name: "Sleep Problems", value: 43 },
  { name: "Work Issues", value: 38 },
];

// --- SHARED COMPONENTS ---
const SectionHead = ({ title, sub, color = C.primary }) => (
  <div style={{ marginBottom: "2.5rem" }}>
    <div style={{ width: 36, height: 3, background: color, borderRadius: 2, marginBottom: "1rem" }} />
    <h2 style={{
      fontFamily: "'Playfair Display', serif", fontWeight: 700,
      fontSize: "clamp(1.6rem,4vw,2.3rem)", color: C.text, margin: "0 0 0.75rem", lineHeight: 1.15,
    }}>{title}</h2>
    {sub && <p style={{ color: C.muted, fontSize: "1rem", lineHeight: 1.65, maxWidth: 620, margin: 0 }}>{sub}</p>}
  </div>
);

const Card = ({ children, style = {}, accent }) => (
  <div style={{
    background: C.bgCard, borderRadius: 12, padding: "1.5rem",
    border: `1px solid ${C.border}`,
    borderLeft: accent ? `3px solid ${accent}` : `1px solid ${C.border}`,
    ...style,
  }}>{children}</div>
);

const StatCard = ({ number, label, color = C.primary, note }) => (
  <Card accent={color}>
    <div style={{ fontSize: "2rem", fontWeight: 800, color, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{number}</div>
    <div style={{ color: C.text, fontSize: "0.9rem", marginTop: "0.5rem", fontWeight: 500 }}>{label}</div>
    {note && <div style={{ color: C.muted, fontSize: "0.72rem", marginTop: "0.4rem" }}>{note}</div>}
  </Card>
);

const ChartCard = ({ title, note, children }) => (
  <Card>
    <h3 style={{ color: C.text, margin: "0 0 0.3rem", fontSize: "1.05rem", fontWeight: 700 }}>{title}</h3>
    {note && <p style={{ color: C.muted, fontSize: "0.76rem", marginBottom: "1.2rem", margin: "0 0 1.2rem" }}>{note}</p>}
    {children}
  </Card>
);

const Dot = ({ color }) => (
  <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0, marginTop: "0.42rem" }} />
);

// --- PAGES ---

function HomePage({ setPage }) {
  return (
    <div>
      {/* HERO */}
      <div style={{
        minHeight: "88vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "clamp(2rem,6vw,5rem)", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: `radial-gradient(ellipse 80% 60% at 60% 40%, rgba(6,214,160,0.07) 0%, transparent 60%),
                       radial-gradient(ellipse 60% 50% at 80% 80%, rgba(58,134,255,0.06) 0%, transparent 50%)`,
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
          <div style={{
            display: "inline-block", background: "rgba(6,214,160,0.12)", color: C.primary,
            border: "1px solid rgba(6,214,160,0.3)", padding: "0.3rem 1rem",
            borderRadius: 100, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.09em",
            textTransform: "uppercase", marginBottom: "1.5rem",
          }}>Evidence-Based Awareness</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: "clamp(2.4rem,7vw,4.4rem)", color: C.text,
            lineHeight: 1.08, margin: "0 0 1.5rem",
          }}>
            Porn Addiction:<br />
            <span style={{ background: "linear-gradient(135deg,#06d6a0,#3a86ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              The Hidden Epidemic
            </span>
          </h1>
          <p style={{ color: C.muted, fontSize: "clamp(1rem,2.5vw,1.12rem)", lineHeight: 1.75, maxWidth: 580, marginBottom: "2rem" }}>
            Pornography addiction affects millions worldwide — reshaping brain chemistry, damaging relationships,
            and undermining mental health. This site presents the science, the data, and the path forward.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={() => setPage("science")} style={{
              background: C.primary, color: "#07090f", padding: "0.85rem 2rem",
              border: "none", borderRadius: 8, fontWeight: 700, fontSize: "0.95rem",
              cursor: "pointer", fontFamily: "inherit",
            }}>Explore The Science</button>
            <button onClick={() => setPage("recovery")} style={{
              background: "transparent", color: C.text, padding: "0.85rem 2rem",
              border: `1px solid ${C.border}`, borderRadius: 8, fontWeight: 600,
              fontSize: "0.95rem", cursor: "pointer", fontFamily: "inherit",
            }}>Path to Recovery</button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ padding: "clamp(2rem,6vw,4rem)", borderTop: `1px solid ${C.border}` }}>
        <SectionHead title="The Numbers Don't Lie" sub="Research-backed statistics on the scale and impact of pornography addiction." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: "1rem" }}>
          <StatCard number="200M+" label="Pornhub visits per day globally" color={C.accent} note="Pornhub Insights, 2023" />
          <StatCard number="40M" label="Americans are regular porn users" color={C.primary} note="AAP, 2023" />
          <StatCard number="11–12" label="Average age of first exposure" color={C.warning} note="Common Sense Media, 2022" />
          <StatCard number="56%" label="Divorces cite porn as a major factor" color={C.secondary} note="AAMFT Clinical Study" />
          <StatCard number="28%" label="Adults 18–24 report compulsive use" color={C.purple} note="Journal of Sex Research, 2022" />
          <StatCard number="$97B" label="Global porn industry revenue/year" color={C.accent} note="KPMG Industry Report, 2022" />
        </div>
      </div>

      {/* WHAT IS IT */}
      <div style={{ padding: "clamp(2rem,6vw,4rem)", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "2rem" }}>
          <div>
            <SectionHead title="What Is Porn Addiction?" color={C.secondary} />
            <p style={{ color: C.muted, lineHeight: 1.8, fontSize: "0.93rem", marginBottom: "1rem" }}>
              Pornography addiction is a behavioral addiction characterized by compulsive consumption of pornographic material
              despite significant negative consequences. Like substance addictions, it involves the same neural reward pathways
              and produces tolerance, withdrawal symptoms, and loss of control.
            </p>
            <p style={{ color: C.muted, lineHeight: 1.8, fontSize: "0.93rem" }}>
              The American Society of Addiction Medicine defines addiction as a primary, chronic disease of brain reward,
              motivation, memory, and related circuitry — a definition that behavioral research now confirms applies to
              compulsive pornography use.
            </p>
          </div>
          <div>
            <SectionHead title="Diagnostic Signs" color={C.warning} />
            {[
              "Spending increasing amounts of time viewing pornography",
              "Failed attempts to cut back or stop",
              "Neglecting relationships, work, or responsibilities",
              "Needing more extreme content for the same effect (tolerance)",
              "Continuing use despite negative consequences",
              "Irritability or anxiety when unable to view",
              "Using pornography as a primary coping mechanism",
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "0.8rem", marginBottom: "0.6rem", alignItems: "flex-start" }}>
                <Dot color={C.warning} />
                <span style={{ color: C.muted, fontSize: "0.88rem", lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TOPIC CARDS */}
      <div style={{ padding: "clamp(2rem,6vw,4rem)", borderTop: `1px solid ${C.border}` }}>
        <SectionHead title="Explore All Topics" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: "1.2rem" }}>
          {[
            { id: "science", title: "The Brain Science", desc: "Neurological effects, dopamine pathways, and how porn rewires the brain.", color: C.primary, icon: "🧠" },
            { id: "statistics", title: "Statistics & Data", desc: "Charts and research on usage patterns, demographics, and impact.", color: C.secondary, icon: "📊" },
            { id: "relationships", title: "Relationships", desc: "How pornography addiction damages intimacy, trust, and connection.", color: C.accent, icon: "💔" },
            { id: "recovery", title: "Recovery", desc: "The science of healing, recovery timelines, and actionable steps.", color: C.warning, icon: "🌱" },
            { id: "help", title: "Get Help", desc: "Resources, hotlines, therapists, and community support.", color: C.purple, icon: "🤝" },
            { id: "donate", title: "Support Our Work", desc: "Help fund awareness campaigns and support resources.", color: C.primary, icon: "❤️" },
          ].map(({ id, title, desc, color, icon }) => (
            <div key={id} onClick={() => setPage(id)} style={{
              background: C.bgCard, border: `1px solid ${C.border}`,
              borderTop: `3px solid ${color}`, borderRadius: 12,
              padding: "1.5rem", cursor: "pointer", transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = C.bgCardHover}
              onMouseLeave={e => e.currentTarget.style.background = C.bgCard}
            >
              <div style={{ fontSize: "1.9rem", marginBottom: "0.7rem" }}>{icon}</div>
              <h3 style={{ color: C.text, margin: "0 0 0.4rem", fontSize: "1rem", fontWeight: 700 }}>{title}</h3>
              <p style={{ color: C.muted, margin: 0, fontSize: "0.83rem", lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SciencePage() {
  return (
    <div style={{ padding: "clamp(2rem,6vw,4rem)" }}>
      <SectionHead
        title="The Brain Science of Porn Addiction"
        sub="How repeated pornography use alters neural architecture, hijacks the reward system, and degrades cognitive function."
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "1.2rem", marginBottom: "3rem" }}>
        {[
          { title: "Dopamine Hijacking", color: C.primary, body: "Pornography triggers massive dopamine surges — up to 200% above baseline — in the nucleus accumbens (the brain's reward center). This artificially intense stimulation desensitizes dopamine receptors, requiring increasingly extreme content to achieve the same effect, mirroring tolerance seen in drug addiction." },
          { title: "Prefrontal Cortex Shrinkage", color: C.secondary, body: "Neuroimaging studies (Kühn & Gallinat, JAMA Psychiatry 2014) found that greater porn use correlated with reduced gray matter volume in the right caudate of the striatum and weaker prefrontal activation — the region governing impulse control, decision-making, and long-term planning." },
          { title: "DeltaFosB Accumulation", color: C.accent, body: "Compulsive behavior accumulates a protein called DeltaFosB in reward circuits. This sensitizes the brain to sexual cues while desensitizing it to natural rewards (food, exercise, social connection), fundamentally altering motivation and reward processing." },
          { title: "Desensitization & Escalation", color: C.warning, body: "As dopamine receptors downregulate, users experience anhedonia — inability to feel pleasure from everyday activities. This drives escalation to more extreme or taboo content not from genuine preference, but neurological necessity to generate the same dopamine response." },
          { title: "Sensitization to Cues", color: C.purple, body: "The brain creates powerful neural pathways associating pornography cues (devices, notifications, solitude) with dopamine release. These cue-induced cravings can persist for years into recovery — similar to why recovering drug users experience cravings from environmental triggers." },
          { title: "Impaired Pair Bonding", color: C.primary, body: "Oxytocin — the bonding hormone released during intimacy — becomes conditioned to solo, screen-based experiences rather than real human connection. Over time this impairs the capacity for deep emotional and physical bonding with real partners." },
        ].map(({ title, color, body }) => (
          <Card key={title} accent={color}>
            <h3 style={{ color, margin: "0 0 0.7rem", fontSize: "1rem", fontWeight: 700 }}>{title}</h3>
            <p style={{ color: C.muted, margin: 0, fontSize: "0.855rem", lineHeight: 1.7 }}>{body}</p>
          </Card>
        ))}
      </div>

      <ChartCard title="Brain Region Activity: Healthy vs. Compulsive User" note="Normalized activation levels across key regions. Based on fMRI data: Kühn et al. 2014; Laier et al. 2015.">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={brainData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="area" tick={{ fill: C.muted, fontSize: 10 }} />
            <YAxis tick={{ fill: C.muted, fontSize: 10 }} domain={[0, 100]} />
            <Tooltip contentStyle={ttStyle} />
            <Legend wrapperStyle={{ color: C.muted, fontSize: "0.8rem" }} />
            <Bar dataKey="healthy" name="Healthy Brain" fill={C.primary} radius={[4, 4, 0, 0]} />
            <Bar dataKey="addicted" name="Compulsive User" fill={C.accent} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div style={{ marginTop: "2rem" }}>
        <ChartCard title="Porn Addiction vs. Substance Addiction: Parallels">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.855rem" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                  {["Characteristic", "Heroin", "Cocaine", "Alcohol", "Pornography"].map(h => (
                    <th key={h} style={{ color: C.primary, padding: "0.75rem 0.6rem", textAlign: "left", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Dopamine surge", "↑↑↑↑", "↑↑↑↑", "↑↑↑", "↑↑↑"],
                  ["Tolerance develops", "✓", "✓", "✓", "✓"],
                  ["Withdrawal symptoms", "✓", "✓", "✓", "✓"],
                  ["Brain structural changes", "✓", "✓", "✓", "✓"],
                  ["Cue-induced craving", "✓", "✓", "✓", "✓"],
                  ["Legal (adult)", "✗", "✗", "✓", "✓"],
                  ["Physical withdrawal", "Severe", "Moderate", "Severe", "Mild–Mod"],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                    <td style={{ color: C.text, padding: "0.7rem 0.6rem", fontWeight: 500 }}>{row[0]}</td>
                    {row.slice(1).map((cell, j) => (
                      <td key={j} style={{ color: C.muted, padding: "0.7rem 0.6rem" }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

function StatisticsPage() {
  return (
    <div style={{ padding: "clamp(2rem,6vw,4rem)" }}>
      <SectionHead
        title="Statistics & Research Data"
        sub="Compiled from peer-reviewed journals, clinical studies, and demographic surveys."
        color={C.secondary}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <ChartCard title="Age of First Exposure" note="% exposed by age group. Source: Common Sense Media 2022; Wolak et al. 2007">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ageExposureData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="age" tick={{ fill: C.muted, fontSize: 10 }} />
              <YAxis tick={{ fill: C.muted, fontSize: 10 }} unit="%" />
              <Tooltip contentStyle={ttStyle} />
              <Legend wrapperStyle={{ color: C.muted, fontSize: "0.75rem" }} />
              <Bar dataKey="boys" name="Male" fill={C.secondary} radius={[3, 3, 0, 0]} />
              <Bar dataKey="girls" name="Female" fill={C.accent} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Regular Use by Age Group" note="% using weekly or daily. Source: Journal of Sex Research, 2022">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={prevalenceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="group" tick={{ fill: C.muted, fontSize: 10 }} />
              <YAxis tick={{ fill: C.muted, fontSize: 10 }} unit="%" />
              <Tooltip contentStyle={ttStyle} />
              <Legend wrapperStyle={{ color: C.muted, fontSize: "0.75rem" }} />
              <Bar dataKey="weekly" name="Weekly" fill={C.primary} radius={[3, 3, 0, 0]} />
              <Bar dataKey="daily" name="Daily" fill={C.warning} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <ChartCard title="Self-Reported Negative Effects" note="Among those who identify as having problematic use. Source: YBOP compilation, 2021">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={effectsData} layout="vertical" margin={{ left: 130, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis type="number" tick={{ fill: C.muted, fontSize: 10 }} unit="%" />
              <YAxis dataKey="effect" type="category" tick={{ fill: C.text, fontSize: 10 }} width={130} />
              <Tooltip contentStyle={ttStyle} />
              <Bar dataKey="pct" name="%" radius={[0, 4, 4, 0]}>
                {effectsData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribution of Reported Effects" note="Proportional breakdown of primary negative effects reported">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={90} dataKey="value" nameKey="name" label={({ name, value }) => `${value}%`} labelLine={false} fontSize={10}>
                {pieData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={ttStyle} />
              <Legend wrapperStyle={{ color: C.muted, fontSize: "0.72rem" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Key Research Studies" note="Peer-reviewed research on pornography addiction and its effects">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["Study", "Year", "Sample", "Key Finding"].map(h => (
                  <th key={h} style={{ color: C.primary, padding: "0.75rem 0.6rem", textAlign: "left", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Kühn & Gallinat (JAMA Psychiatry)", "2014", "64 adults", "More porn use = less gray matter in reward striatum; weaker prefrontal connectivity"],
                ["Voon et al. (PLOS ONE)", "2014", "19 CSB patients", "Porn activates same neural regions as drug cues; compulsive users show hypersensitivity"],
                ["Laier, Pawlikowski & Brand", "2014", "28 males", "Cue-induced craving in porn addiction parallels craving in substance abuse"],
                ["Sun et al. (Arch. Sex. Behav.)", "2016", "1,285 students", "Increasing consumption linked to more callous sexual attitudes and reduced partner intimacy"],
                ["Perry & Whitehead", "2019", "15,000 adults", "Habitual porn users 3× more likely to report marital unhappiness over time"],
                ["Dwulit & Rzymski (Meta-analysis)", "2019", "Multiple studies", "Pornography-induced erectile dysfunction (PIED) confirmed in healthy men under 40"],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                  <td style={{ color: C.secondary, padding: "0.7rem 0.6rem", fontWeight: 500 }}>{row[0]}</td>
                  {row.slice(1).map((cell, j) => (
                    <td key={j} style={{ color: C.muted, padding: "0.7rem 0.6rem" }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}

function RelationshipsPage() {
  return (
    <div style={{ padding: "clamp(2rem,6vw,4rem)" }}>
      <SectionHead
        title="Impact on Relationships"
        sub="Pornography addiction profoundly alters how users relate to partners, family, and the world around them."
        color={C.accent}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "1.2rem", marginBottom: "3rem" }}>
        {[
          { title: "Unrealistic Expectations", icon: "🎭", color: C.accent, body: "Regular porn consumption creates distorted templates for sex and body image. Research (Sun et al., 2016) shows users develop increasingly unrealistic expectations of sexual performance and appearance, making real intimacy feel inadequate or disappointing by comparison." },
          { title: "Emotional Withdrawal", icon: "🌫️", color: C.secondary, body: "Partners of porn users frequently report emotional unavailability, reduced affection, and a sense that their partner is 'elsewhere.' This emotional withdrawal mirrors patterns seen in partners of people with substance use disorders." },
          { title: "Sexual Dysfunction (PIED)", icon: "⚡", color: C.warning, body: "Pornography-Induced Erectile Dysfunction is increasingly documented in otherwise healthy men under 40. The brain becomes conditioned to screen-based, high-novelty stimulation and loses sensitivity to real partners — reversible upon cessation." },
          { title: "Betrayal Trauma", icon: "🔒", color: C.accent, body: "Discovery of a partner's hidden pornography use can produce trauma responses indistinguishable from infidelity trauma: hypervigilance, intrusive thoughts, loss of safety, and complex grief. Partners' pain is real and clinically recognized." },
          { title: "Relationship Quality Decline", icon: "📉", color: C.primary, body: "A 2019 study of 15,000 adults found habitual pornography users were 3× more likely to report marital unhappiness. Relationship satisfaction, communication quality, and sexual satisfaction all decline with increased use." },
          { title: "Children & Family Impact", icon: "👨‍👩‍👧", color: C.purple, body: "Children of addicted parents experience reduced parental presence, higher household tension, and earlier pornography exposure. Parental modeling is one of the strongest predictors of children's future use patterns." },
        ].map(({ title, icon, color, body }) => (
          <Card key={title}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.4rem" }}>{icon}</span>
              <h3 style={{ color, margin: 0, fontSize: "0.98rem", fontWeight: 700 }}>{title}</h3>
            </div>
            <p style={{ color: C.muted, margin: 0, fontSize: "0.865rem", lineHeight: 1.7 }}>{body}</p>
          </Card>
        ))}
      </div>

      <ChartCard title="Partners' Reported Experience" note="Survey data from partners of compulsive porn users. Source: AAMFT 2020; Harborth et al. 2019">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "1rem", marginTop: "0.5rem" }}>
          {[
            { stat: "70%", label: "feel 'not good enough'", color: C.accent },
            { stat: "62%", label: "experience depression or anxiety", color: C.secondary },
            { stat: "48%", label: "consider or pursue separation", color: C.warning },
            { stat: "38%", label: "report sexual relationship declined", color: C.purple },
          ].map(({ stat, label, color }) => (
            <div key={label} style={{
              background: "rgba(255,255,255,0.03)", borderRadius: 10,
              padding: "1.2rem", textAlign: "center", border: `1px solid ${C.border}`,
            }}>
              <div style={{ fontSize: "1.9rem", fontWeight: 800, color, fontFamily: "'Playfair Display', serif" }}>{stat}</div>
              <div style={{ color: C.muted, fontSize: "0.78rem", marginTop: "0.3rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </ChartCard>

      <div style={{
        marginTop: "2rem", borderLeft: `4px solid ${C.accent}`,
        padding: "1.5rem 2rem", background: "rgba(255,0,110,0.05)",
        borderRadius: "0 12px 12px 0",
      }}>
        <p style={{ color: C.text, fontSize: "1.02rem", lineHeight: 1.75, fontStyle: "italic", margin: 0 }}>
          "The research is unambiguous: pornography use is not a victimless private act. It restructures how users
          relate to real people, creates unrealistic and often harmful expectations, and inflicts measurable
          psychological damage on partners."
        </p>
        <p style={{ color: C.muted, fontSize: "0.83rem", margin: "0.8rem 0 0" }}>
          — Dr. Gail Dines, sociologist and author of <em>Pornland</em>
        </p>
      </div>
    </div>
  );
}

function RecoveryPage() {
  return (
    <div style={{ padding: "clamp(2rem,6vw,4rem)" }}>
      <SectionHead
        title="The Path to Recovery"
        sub="Recovery from pornography addiction is well-documented, achievable, and transformative. The same brain plasticity that enabled addiction enables full healing."
        color={C.warning}
      />

      <ChartCard
        title="Brain Recovery Timeline"
        note="Normalized improvement scores after cessation. Based on neurological recovery research and self-report studies. Week 1 shows a withdrawal dip before steady recovery."
      >
        <ResponsiveContainer width="100%" height={310}>
          <AreaChart data={recoveryData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <defs>
              {[
                { id: "dop", color: C.primary },
                { id: "mood", color: C.secondary },
                { id: "focus", color: C.warning },
                { id: "energy", color: C.purple },
              ].map(({ id, color }) => (
                <linearGradient key={id} id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
            <XAxis dataKey="label" tick={{ fill: C.muted, fontSize: 10 }} />
            <YAxis tick={{ fill: C.muted, fontSize: 10 }} domain={[0, 100]} unit="%" />
            <Tooltip contentStyle={ttStyle} />
            <Legend wrapperStyle={{ color: C.muted, fontSize: "0.78rem" }} />
            <Area type="monotone" dataKey="dop" name="Dopamine Balance" stroke={C.primary} fill="url(#g-dop)" strokeWidth={2} />
            <Area type="monotone" dataKey="mood" name="Mood / Wellbeing" stroke={C.secondary} fill="url(#g-mood)" strokeWidth={2} />
            <Area type="monotone" dataKey="focus" name="Focus / Clarity" stroke={C.warning} fill="url(#g-focus)" strokeWidth={2} />
            <Area type="monotone" dataKey="energy" name="Energy Levels" stroke={C.purple} fill="url(#g-energy)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <h3 style={{ color: C.text, fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "1.5rem" }}>Stages of Recovery</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            { timeframe: "Days 1–7", title: "Acute Withdrawal", color: C.accent, body: "Heightened irritability, anxiety, difficulty concentrating, and strong cravings. The brain is recalibrating dopamine systems. This is the hardest phase — expect it and plan for it with accountability and environment changes." },
            { timeframe: "Weeks 2–4", title: "Early Recovery", color: C.warning, body: "Mood may fluctuate unpredictably (the 'flatline period'). Social awkwardness, reduced libido, and emotional numbness are common. The brain is growing new dopamine receptors — this is progress, not regression." },
            { timeframe: "Months 2–3", title: "Active Rewiring", color: C.primary, body: "Significant improvement in mood, focus, and natural motivation. Real-world pleasures begin feeling rewarding again. Neural pathways associated with porn weaken as healthy pathways strengthen." },
            { timeframe: "Months 3–6", title: "Integration", color: C.secondary, body: "Emotional regulation improves markedly. Relationships deepen. Sexual function normalizes. Clarity about values and goals returns. Former triggers lose their power as new coping skills solidify." },
            { timeframe: "Month 6+", title: "Long-Term Recovery", color: C.purple, body: "Sustained wellbeing, healthy intimacy, and resilience against relapse. Many report this as the best period of their adult lives. Regular mindfulness, exercise, and accountability maintain progress." },
          ].map(({ timeframe, title, color, body }, i) => (
            <div key={i} style={{
              display: "flex", gap: "1.5rem", alignItems: "flex-start",
              background: C.bgCard, borderRadius: 12, padding: "1.4rem",
              border: `1px solid ${C.border}`,
            }}>
              <div style={{ flexShrink: 0, textAlign: "center", width: 64 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: color, color: "#07090f",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: "0.85rem", margin: "0 auto 0.3rem",
                }}>{i + 1}</div>
                <div style={{ color: C.muted, fontSize: "0.67rem", lineHeight: 1.3 }}>{timeframe}</div>
              </div>
              <div>
                <h4 style={{ color, margin: "0 0 0.4rem", fontSize: "0.98rem", fontWeight: 700 }}>{title}</h4>
                <p style={{ color: C.muted, margin: 0, fontSize: "0.865rem", lineHeight: 1.65 }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card>
        <h3 style={{ color: C.text, fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", marginBottom: "1.5rem" }}>Evidence-Based Recovery Strategies</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: "1rem" }}>
          {[
            { icon: "🛡️", title: "Content Filtering", color: C.primary, desc: "Install router-level and device-level filters (OpenDNS, Covenant Eyes). Environmental control reduces relapse rates by 40%." },
            { icon: "🧘", title: "Mindfulness Practice", color: C.secondary, desc: "Daily meditation strengthens prefrontal control over impulsive behavior. Even 10 min/day shows measurable brain changes within 8 weeks." },
            { icon: "💪", title: "Exercise", color: C.warning, desc: "Aerobic exercise raises baseline dopamine and BDNF, directly counteracting reward system deficits. 30 min 4×/week is clinically supported." },
            { icon: "🤝", title: "Accountability", color: C.accent, desc: "Structured accountability (partner, group, therapist) doubles recovery success rates. Isolation is the primary relapse risk factor." },
            { icon: "📝", title: "Journaling", color: C.purple, desc: "Processing emotional triggers through writing reduces compulsive behavior. Identify the cycle: trigger → craving → ritual → use → shame." },
            { icon: "🏥", title: "Therapy (CBT/ACT)", color: C.primary, desc: "Cognitive Behavioral Therapy and Acceptance & Commitment Therapy have strong evidence bases for treating behavioral addictions." },
          ].map(({ icon, title, color, desc }) => (
            <div key={title} style={{ padding: "1.1rem", background: "rgba(255,255,255,0.025)", borderRadius: 10, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.2rem" }}>{icon}</span>
                <span style={{ color, fontWeight: 700, fontSize: "0.93rem" }}>{title}</span>
              </div>
              <p style={{ color: C.muted, margin: 0, fontSize: "0.81rem", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function HelpPage() {
  return (
    <div style={{ padding: "clamp(2rem,6vw,4rem)" }}>
      <SectionHead
        title="Get Help"
        sub="You don't have to face this alone. Verified resources, hotlines, and communities that have helped thousands."
        color={C.purple}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(275px,1fr))", gap: "1.2rem", marginBottom: "2.5rem" }}>
        {[
          { title: "SAA — Sex Addicts Anonymous", url: "saa.org", type: "12-Step / Free", color: C.primary, desc: "Worldwide fellowship with in-person and online meetings. No cost. Follows a 12-step recovery model adapted for sexual compulsivity." },
          { title: "Your Brain On Porn (YBOP)", url: "yourbrainonporn.com", type: "Educational", color: C.secondary, desc: "The largest research repository on pornography's neurological effects. Thousands of recovery accounts and peer-reviewed study summaries." },
          { title: "NoFap Community", url: "reddit.com/r/NoFap", type: "Peer Support / Free", color: C.warning, desc: "Over 1.1 million members sharing recovery journeys, strategies, and support. Daily accountability threads available." },
          { title: "Psychology Today Therapist Finder", url: "psychologytoday.com/us/therapists", type: "Professional Help", color: C.accent, desc: "Search for therapists specializing in sexual compulsivity and behavioral addiction. Filter by insurance, cost, and specialization." },
          { title: "Fortify Program", url: "joinfortify.com", type: "Structured Program", color: C.purple, desc: "Science-based online recovery program with tracking, education, and community. Free basic access, premium features available." },
          { title: "SAMHSA Helpline", url: "1-800-662-4357", type: "Crisis Hotline", color: C.primary, desc: "Free, confidential, 24/7 treatment referral and information for mental health and behavioral addiction issues. Nationwide (US)." },
        ].map(({ title, url, type, color, desc }) => (
          <div key={title} style={{
            background: C.bgCard, borderRadius: 12, padding: "1.5rem",
            border: `1px solid ${C.border}`, borderTop: `3px solid ${color}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem", flexWrap: "wrap", gap: "0.3rem" }}>
              <h3 style={{ color: C.text, margin: 0, fontSize: "0.93rem", fontWeight: 700, flexShrink: 1 }}>{title}</h3>
              <span style={{
                background: "rgba(255,255,255,0.06)", color, padding: "0.15rem 0.6rem",
                borderRadius: 100, fontSize: "0.69rem", fontWeight: 700, whiteSpace: "nowrap",
              }}>{type}</span>
            </div>
            <p style={{ color: C.muted, margin: "0 0 0.75rem", fontSize: "0.84rem", lineHeight: 1.55 }}>{desc}</p>
            <div style={{ color, fontSize: "0.8rem", fontWeight: 500 }}>{url}</div>
          </div>
        ))}
      </div>
      <div style={{
        background: "linear-gradient(135deg,rgba(6,214,160,0.08) 0%,rgba(58,134,255,0.08) 100%)",
        borderRadius: 16, padding: "2.5rem",
        border: "1px solid rgba(6,214,160,0.2)", textAlign: "center",
      }}>
        <h3 style={{ color: C.text, fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", margin: "0 0 1rem" }}>You Are Not Broken</h3>
        <p style={{ color: C.muted, maxWidth: 540, margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.75 }}>
          Pornography addiction is a neurological condition, not a moral failing. The same brain plasticity that made you
          vulnerable to addiction is exactly what enables full recovery. Thousands of people achieve lasting freedom every year.
        </p>
      </div>
    </div>
  );
}

function DonatePage() {
  return (
    <div style={{ padding: "clamp(2rem,6vw,4rem)", maxWidth: 700, margin: "0 auto" }}>
      <SectionHead
        title="Support This Work"
        sub="This website is maintained entirely through donations. Every contribution funds awareness campaigns, research compilation, and free resources."
      />
      {[
        { icon: "📢", title: "Fund Awareness Campaigns", desc: "Social media, search advertising, and school partnership programs to reach those who need this information most." },
        { icon: "🔬", title: "Research Compilation", desc: "Curating, translating, and presenting the latest peer-reviewed science in accessible, shareable formats." },
        { icon: "🤝", title: "Support Resources", desc: "Maintaining free guides, recovery tools, and connections to professional help at no cost to users." },
      ].map(({ icon, title, desc }) => (
        <div key={title} style={{
          display: "flex", gap: "1.2rem", padding: "1.2rem",
          background: C.bgCard, borderRadius: 12, marginBottom: "1rem",
          border: `1px solid ${C.border}`, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: "1.7rem", flexShrink: 0 }}>{icon}</span>
          <div>
            <h4 style={{ color: C.text, margin: "0 0 0.3rem", fontWeight: 700 }}>{title}</h4>
            <p style={{ color: C.muted, margin: 0, fontSize: "0.875rem", lineHeight: 1.55 }}>{desc}</p>
          </div>
        </div>
      ))}
      <Card style={{ marginTop: "2rem", textAlign: "center" }}>
        <button onClick={() => window.open("https://d797fa8c-9824-43dc-8778-4603c305267b.paylinks.godaddy.com/2a8db1b6-5fa2-4ca7-9a3a-7f1", "_blank")} style={{
          background: "linear-gradient(135deg,#06d6a0,#3a86ff)", color: "#07090f",
          border: "none", padding: "1rem 2.5rem",
          borderRadius: 10, fontFamily: "inherit",
          fontWeight: 800, fontSize: "1rem", cursor: "pointer",
          width: "100%", maxWidth: 320, letterSpacing: "0.02em",
        }}>Donate Securely →</button>
      </Card>
    </div>
  );
}

// --- MY STORY PAGE ---
function MyStoryPage() {
  return (
    <div style={{ padding: "clamp(2rem,6vw,4rem)", maxWidth: 800, margin: "0 auto" }}>
      <SectionHead title="My Story" sub="A personal account of addiction, recovery, and why this website exists." color={C.warning} />

      {/* Intro banner */}
      <div style={{
        background: "linear-gradient(135deg,rgba(255,190,11,0.1) 0%,rgba(6,214,160,0.08) 100%)",
        border: "1px solid rgba(255,190,11,0.25)", borderRadius: 16,
        padding: "2rem", marginBottom: "2.5rem", display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap",
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg,#06d6a0,#ffbe0b)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2rem", fontWeight: 900, color: "#07090f",
          fontFamily: "'Playfair Display', serif",
        }}>◆</div>
        <div>
          <h3 style={{ color: C.text, margin: "0 0 0.3rem", fontFamily: "'Playfair Display', serif", fontSize: "1.4rem" }}>A Recovered Voice</h3>
          <p style={{ color: C.muted, margin: 0, fontSize: "0.9rem" }}>Recovered &nbsp;·&nbsp; Advocate</p>
        </div>
      </div>

      {/* Story sections */}
      {[
        {
          icon: "🌱", color: C.secondary, title: "How It Started",
          body: `I was 12 when I first saw it. I wasn't even looking for it, honestly, it just popped up one day and I clicked. Didn't think much of it at the time. Nobody around me ever talked about this stuff so I had no idea it would turn into anything.

But I kept going back. A few weeks turned into months and by 13 it was just something I did, almost without thinking about it. I'd stop for a few days, feel okay about myself, then end up back at it again. Happened so many times I started to feel like something was wrong with me.`,
        },
        {
          icon: "🌊", color: C.accent, title: "What It Did To Me",
          body: `I didn't notice the effects right away, they kind of built up slowly. I was more anxious than usual, couldn't focus as well in school, and talking to people started to feel harder than it used to. Eye contact felt like something I had to think about instead of something that just happened.

The worst part honestly was just feeling ashamed all the time. Not one big moment of it, just this background feeling that never really went away. And I never told anyone so I just sat with it by myself for years. I really thought I was the only person my age dealing with this.`,
        },
        {
          icon: "⚡", color: C.warning, title: "The Turning Point",
          body: `What actually helped was reading about the brain stuff. How dopamine works, why it gets harder to stop the more you do it, all of that. Once I understood it wasn't just me being weak or messed up, and that it was just my brain reacting to something it wasn't built to handle, I stopped hating myself over it as much.

That's when I actually started doing something instead of just feeling bad. Put filters on my phone, started running in the mornings, wrote stuff down when I felt like relapsing. Found some people online dealing with the same thing which helped more than I expected. Just knowing it wasn't only me.`,
        },
        {
          icon: "🌟", color: C.primary, title: "Where I Am Now",
          body: `I relapsed a bunch of times along the way, it wasn't some straight line to being fine. But over time it got easier. The urges weren't as strong. I could focus again. I started caring about normal stuff again, school, friends, just being a person without this thing hanging over me constantly.

I made this site because back when things were bad I couldn't find anything that just explained it straight, without being buried in research papers or scattered across random forums. So I put it all here. If any of this sounds like you, it does get better. I'm living proof of that.`,
        },
      ].map(({ icon, color, title, body }, i) => (
        <div key={i} style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{
              width: 38, height: 38, borderRadius: "50%",
              background: `rgba(${color === C.primary ? "6,214,160" : color === C.secondary ? "58,134,255" : color === C.accent ? "255,0,110" : "255,190,11"},0.15)`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0,
            }}>{icon}</div>
            <h3 style={{ color, margin: 0, fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700 }}>{title}</h3>
          </div>
          {body.split("\n\n").map((para, j) => (
            <p key={j} style={{ color: C.muted, lineHeight: 1.85, fontSize: "0.97rem", marginBottom: "1rem" }}>{para}</p>
          ))}
          {i < 3 && <div style={{ borderBottom: `1px solid ${C.border}`, marginTop: "1.5rem" }} />}
        </div>
      ))}
    </div>
  );
}

// --- NEWSLETTER SIGNUP ---
function NewsletterBar() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mykaylze", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{
      background: "linear-gradient(135deg,rgba(6,214,160,0.08) 0%,rgba(58,134,255,0.07) 100%)",
      borderTop: `1px solid rgba(6,214,160,0.15)`,
      borderBottom: `1px solid rgba(6,214,160,0.15)`,
      padding: "2.5rem clamp(2rem,6vw,4rem)",
      textAlign: "center",
    }}>
      <h3 style={{
        color: C.text, fontFamily: "'Playfair Display', serif",
        fontSize: "1.4rem", margin: "0 0 0.5rem",
      }}>Stay in the Loop</h3>
      <p style={{ color: C.muted, fontSize: "0.9rem", margin: "0 0 1.5rem", maxWidth: 460, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
        Get updates on new resources, research, and recovery tools. No spam, just stuff that actually helps.
      </p>

      {status === "success" ? (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.6rem",
          background: "rgba(6,214,160,0.12)", border: "1px solid rgba(6,214,160,0.3)",
          borderRadius: 100, padding: "0.7rem 1.5rem", color: C.primary, fontWeight: 600, fontSize: "0.9rem",
        }}>
          <span>✓</span> You are subscribed. Thanks for joining!
        </div>
      ) : (
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", maxWidth: 480, margin: "0 auto" }}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{
              flex: 1, minWidth: 200,
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${C.border}`,
              borderRadius: 8, padding: "0.75rem 1rem",
              color: C.text, fontFamily: "inherit", fontSize: "0.9rem",
              outline: "none",
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={status === "loading"}
            style={{
              background: C.primary, color: "#07090f",
              border: "none", borderRadius: 8,
              padding: "0.75rem 1.5rem",
              fontFamily: "inherit", fontWeight: 700,
              fontSize: "0.9rem", cursor: "pointer",
              opacity: status === "loading" ? 0.7 : 1,
            }}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </div>
      )}

      {status === "error" && (
        <p style={{ color: C.accent, fontSize: "0.8rem", marginTop: "0.75rem" }}>
          Something went wrong. Try again or email us directly.
        </p>
      )}

      <p style={{ color: C.muted, fontSize: "0.72rem", marginTop: "1rem", opacity: 0.7 }}>
        By subscribing you agree to receive emails from this site. Unsubscribe anytime.
      </p>
    </div>
  );
}

// --- NAVBAR & APP ---
const NAV = [
  { id: "home", label: "Home" },
  { id: "science", label: "The Science" },
  { id: "statistics", label: "Statistics" },
  { id: "relationships", label: "Relationships" },
  { id: "recovery", label: "Recovery" },
  { id: "mystory", label: "My Story" },
  { id: "help", label: "Get Help" },
  { id: "donate", label: "❤️ Donate" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const pages = { home: HomePage, science: SciencePage, statistics: StatisticsPage, relationships: RelationshipsPage, recovery: RecoveryPage, mystory: MyStoryPage, help: HelpPage, donate: DonatePage };
  const PageComponent = pages[page] || HomePage;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#07090f;font-family:'DM Sans',sans-serif;color:#f0f4fc;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#07090f;}
        ::-webkit-scrollbar-thumb{background:#1e2a3a;border-radius:3px;}
      `}</style>
      <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: C.text }}>
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(7,9,15,0.93)", backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${C.border}`,
          padding: "0 clamp(1rem,4vw,3rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 58, gap: "0.5rem",
        }}>
          <button onClick={() => setPage("home")} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.05rem", fontWeight: 700, color: C.text, flexShrink: 0,
          }}>
            <span style={{ color: C.primary }}>◆</span> PornAddictionFacts
          </button>
          <div style={{ display: "flex", gap: "0.15rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {NAV.slice(1).map(({ id, label }) => (
              <button key={id} onClick={() => setPage(id)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: page === id ? C.primary : C.muted,
                fontFamily: "inherit", fontSize: "0.83rem", fontWeight: 500,
                padding: "0.4rem 0.7rem", borderRadius: 6,
                borderBottom: page === id ? `2px solid ${C.primary}` : "2px solid transparent",
                transition: "all 0.15s", letterSpacing: "0.01em",
              }}>{label}</button>
            ))}
          </div>
        </nav>

        <main style={{ maxWidth: 1200, margin: "0 auto" }}>
          <PageComponent setPage={setPage} />
        </main>

        <NewsletterBar />
        <footer style={{ borderTop: `1px solid ${C.border}`, padding: "2rem clamp(2rem,6vw,4rem)", textAlign: "center" }}>
          <p style={{ color: C.muted, fontSize: "0.8rem", lineHeight: 1.65 }}>
            This website is for educational and awareness purposes only. Content is based on peer-reviewed research and clinical literature.<br />
            If you are in crisis, please contact the SAMHSA helpline at <strong style={{ color: C.text }}>1-800-662-4357</strong> or your local emergency services.
          </p>
          <p style={{ color: C.border, fontSize: "0.73rem", marginTop: "0.75rem" }}>
            © 2026 PornAddictionFacts.org · Built for public health awareness · Created by Ben
          </p>
        </footer>
      </div>
    </>
  );
}
