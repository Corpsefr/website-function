"use client";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
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

// ============================================================
// CATEGORY DATA — one object per topic. All pages read from this.
// ============================================================
const CATEGORIES = {
  porn: {
    id: "porn", label: "Pornography", icon: "🔞", accent: C.accent,
    badge: "Evidence-Based Awareness",
    heroTitle: "Porn Addiction:", heroHighlight: "The Hidden Epidemic",
    heroSub: "Compulsive pornography use is linked to real distress for a meaningful subset of users. This site presents the current science — including where researchers disagree — and a path forward.",
    diagnosisNote: "Compulsive sexual behavior is recognized in the ICD-11, but pornography use itself is not classified as an addiction in the DSM-5. Researchers remain divided on whether an \"addiction model\" or a \"high-desire\" model best explains compulsive use.",
    stats: [
      { number: "11–12", label: "Average age of first exposure", color: C.warning, note: "Common Sense Media, 2022" },
      { number: "56%", label: "Surveyed divorce attorneys citing porn as a factor", color: C.secondary, note: "AAMFT clinician survey (self-reported)" },
      { number: "3–10%", label: "Adults reporting loss of control over use", color: C.purple, note: "Range across clinical studies" },
      { number: "$97B", label: "Estimated global industry revenue/year", color: C.accent, note: "Industry estimate, varies by source" },
    ],
    diagnosticSigns: [
      "Escalating time spent viewing pornography",
      "Repeated, unsuccessful attempts to cut back",
      "Continued use despite negative consequences",
      "Using pornography as a primary coping mechanism for stress",
    ],
    scienceCards: [
      { title: "Dopamine & Tolerance", color: C.primary, body: "Pornography triggers dopamine release in the brain's reward pathway. Some researchers argue repeated, high-novelty exposure can desensitize this system over time, a pattern also seen in substance use." },
      { title: "Prefrontal Cortex Findings", color: C.secondary, body: "Kühn & Gallinat (JAMA Psychiatry, 2014) found more frequent use correlated with less gray matter in reward-related brain regions — a correlational finding, not proof of cause." },
      { title: "Cue Reactivity", color: C.warning, body: "Repeated pairing of pornography with specific cues — devices, time of day, mood — can create strong, automatic urges to use when those cues reappear." },
      { title: "A Contested Framework", color: C.purple, body: "Not all findings support an addiction model. Prause et al. (2015) found no addiction-like EEG response to sexual images in frequent users, fueling ongoing scientific debate." },
    ],
    chart1: {
      title: "Age of First Exposure by Gender",
      note: "% exposed by age bracket. Source: Common Sense Media 2022; Wolak et al. 2007",
      data: [
        { label: "10–12", a: 42, b: 24 },
        { label: "13–15", a: 78, b: 45 },
        { label: "16–18", a: 93, b: 62 },
      ],
      keyA: "Male", keyB: "Female",
    },
    chart2: {
      title: "Regular Use by Age Group",
      note: "% using weekly or daily. Source: Journal of Sex Research, 2022",
      data: [
        { label: "18–24", a: 46, b: 18 },
        { label: "25–34", a: 38, b: 14 },
        { label: "35–44", a: 28, b: 9 },
      ],
      keyA: "Weekly", keyB: "Daily",
    },
    effectsData: [
      { effect: "Anxiety/Depression", pct: 68 },
      { effect: "Relationship Damage", pct: 57 },
      { effect: "Social Isolation", pct: 52 },
      { effect: "Sleep Disruption", pct: 43 },
      { effect: "Work/Study Issues", pct: 38 },
    ],
    researchTable: [
      ["Kühn & Gallinat (JAMA Psychiatry)", "2014", "64 adults", "More use correlated with less gray matter in reward striatum"],
      ["Prause et al. (Biological Psychology)", "2015", "122 adults", "No addiction-like EEG response found to sexual images"],
      ["Perry & Whitehead", "2019", "15,000 adults", "Habitual users 3× more likely to report marital unhappiness"],
      ["Grubbs et al. (Arch. Sex. Behav.)", "2020", "Meta-analysis", "Self-perceived addiction linked to distress even without objective compulsivity"],
    ],
    impactTitle: "Impact on Relationships",
    impactCards: [
      { title: "Unrealistic Expectations", icon: "🎭", color: C.accent, body: "Regular consumption is linked to distorted expectations of sex and body image (Sun et al., 2016), which can make real intimacy feel disappointing by comparison." },
      { title: "Sexual Dysfunction (PIED)", icon: "⚡", color: C.warning, body: "Pornography-Induced Erectile Dysfunction is reported in some otherwise-healthy men under 40, though prevalence and reversibility are still debated in the literature." },
      { title: "Betrayal Trauma", icon: "🔒", color: C.accent, body: "Discovering a partner's hidden use can trigger trauma responses similar to infidelity trauma — this pain is real and clinically recognized." },
      { title: "Relationship Satisfaction Decline", icon: "📉", color: C.primary, body: "Heavier use is associated with lower relationship and sexual satisfaction across several large surveys, though the direction of causality is debated." },
    ],
    impactStats: [
      { stat: "70%", label: "of partners report feeling \"not good enough\"", color: C.accent },
      { stat: "62%", label: "of partners report anxiety or depression", color: C.secondary },
      { stat: "48%", label: "of partners consider or pursue separation", color: C.warning },
    ],
    perspective: "Clinicians who treat compulsive sexual behavior generally agree the shame and secrecy around use often cause more harm than the behavior itself — part of why open, evidence-based information matters.",
    recoveryStages: [
      { timeframe: "Days 1–7", title: "Acute Adjustment", color: C.accent, body: "Irritability, strong urges, and difficulty concentrating are common as routines change." },
      { timeframe: "Weeks 2–4", title: "Early Recovery", color: C.warning, body: "Mood may fluctuate. Building new routines and accountability matters most here." },
      { timeframe: "Months 2–6", title: "Rebuilding", color: C.primary, body: "Real-world motivation and focus often improve. Triggers start to lose their intensity." },
      { timeframe: "6 Months+", title: "Long-Term Stability", color: C.purple, body: "Many report sustained improvement in mood, relationships, and self-image with continued support." },
    ],
    recoveryStrategies: [
      { icon: "🛡️", title: "Content Filtering", color: C.primary, desc: "Device and router-level filters reduce environmental triggers." },
      { icon: "🏥", title: "Therapy (CBT/ACT)", color: C.secondary, desc: "Structured therapy has the strongest evidence base for compulsive sexual behavior." },
      { icon: "🤝", title: "Accountability & Support", color: C.accent, desc: "Structured support — partner, group, or therapist — is consistently linked to better outcomes." },
      { icon: "🧘", title: "Mindfulness & Exercise", color: C.warning, desc: "Both are associated with improved impulse control and mood regulation." },
    ],
    helpResources: [
      { title: "SAA — Sex Addicts Anonymous", url: "saa.org", type: "Peer Support", color: C.primary, desc: "Worldwide fellowship with in-person and online meetings." },
      { title: "Your Brain On Porn (YBOP)", url: "yourbrainonporn.com", type: "Educational", color: C.secondary, desc: "Large repository of research summaries and recovery accounts." },
      { title: "Psychology Today Therapist Finder", url: "psychologytoday.com/us/therapists", type: "Professional Help", color: C.accent, desc: "Search for therapists specializing in compulsive sexual behavior." },
      { title: "SAMHSA Helpline", url: "1-800-662-4357", type: "Crisis Line", color: C.purple, desc: "Free, confidential, 24/7 referral line for mental health and behavioral concerns." },
    ],
    notBrokenTitle: "You Are Not Broken",
    notBrokenBody: "Struggling with compulsive pornography use is not a moral failing. Whatever framework fits your experience best, support and change are both available.",
    hasStory: true,
  },

  nicotine: {
    id: "nicotine", label: "Nicotine", icon: "🚬", accent: C.secondary,
    badge: "Fast-Acting & Highly Addictive",
    heroTitle: "Nicotine Addiction:", heroHighlight: "Why It's So Hard to Quit",
    heroSub: "Nicotine is one of the most addictive substances known, reaching the brain in about 10 seconds. Despite declining cigarette use, nicotine dependence — increasingly through vaping — remains a leading cause of preventable death.",
    diagnosisNote: "Tobacco Use Disorder is a formally recognized DSM-5 diagnosis. Nicotine's addictive potential is well established and considered comparable to, or exceeding, several controlled substances in speed of onset.",
    stats: [
      { number: "28.3M", label: "U.S. adults who currently smoke cigarettes", color: C.secondary, note: "CDC, 2021" },
      { number: "480,000", label: "U.S. deaths per year attributable to smoking", color: C.accent, note: "U.S. Surgeon General" },
      { number: "~9 in 10", label: "adult smokers who started before age 18", color: C.warning, note: "CDC" },
      { number: "2.13M", label: "U.S. middle/high schoolers currently vaping", color: C.purple, note: "FDA/CDC National Youth Tobacco Survey, 2023" },
    ],
    diagnosticSigns: [
      "Smoking or vaping soon after waking",
      "Strong cravings between uses",
      "Continuing despite health warnings or a diagnosis",
      "Repeated failed attempts to quit",
    ],
    scienceCards: [
      { title: "10-Second Dopamine Hit", color: C.secondary, body: "Inhaled nicotine reaches the brain in about 10 seconds, binding nicotinic acetylcholine receptors and triggering dopamine release — faster than most other addictive substances (Benowitz, NEJM 2010)." },
      { title: "Receptor Upregulation", color: C.primary, body: "The brain responds to repeated nicotine exposure by growing more nicotinic receptors — part of why tolerance and dependence build so quickly." },
      { title: "Adolescent Vulnerability", color: C.warning, body: "The prefrontal cortex keeps developing into the mid-20s, making teen brains especially susceptible to nicotine's addictive effects and lasting changes in attention and impulse control." },
      { title: "Withdrawal & Relapse", color: C.purple, body: "Irritability, anxiety, and intense cravings typically peak within the first few days of quitting and are a major driver of relapse." },
    ],
    chart1: {
      title: "Health Recovery After Quitting Smoking",
      note: "Normalized recovery progress at each milestone. Based on CDC / American Cancer Society quit-benefit timelines.",
      data: [
        { label: "20 Min", a: 15, b: 0 },
        { label: "2 Weeks", a: 35, b: 0 },
        { label: "1 Year", a: 65, b: 0 },
        { label: "15 Years", a: 98, b: 0 },
      ],
      keyA: "Cumulative Health Recovery", keyB: "",
    },
    chart2: {
      title: "E-Cigarette Use by Age Group",
      note: "Approximate current-use %. Source: CDC National Youth Tobacco Survey / NHIS",
      data: [
        { label: "Middle School", a: 4.6, b: 0 },
        { label: "High School", a: 10.0, b: 0 },
        { label: "Adults 18–24", a: 11.0, b: 0 },
      ],
      keyA: "Current Use %", keyB: "",
    },
    effectsData: [
      { effect: "Lung Disease/COPD Risk", pct: 64 },
      { effect: "Cardiovascular Disease Risk", pct: 51 },
      { effect: "Cancer Risk Increase", pct: 58 },
      { effect: "Reduced Smell/Taste", pct: 39 },
      { effect: "Financial Cost Burden", pct: 47 },
    ],
    researchTable: [
      ["U.S. Surgeon General Report", "2014", "50-year retrospective", "Smoking causes an estimated 480,000 U.S. deaths annually"],
      ["Benowitz (NEJM)", "2010", "Review", "Nicotine reaches the brain within ~10 seconds of inhalation"],
      ["CDC NYTS", "2023", "U.S. students", "2.13M middle/high schoolers currently use e-cigarettes"],
      ["CDC NHIS", "2020", "National survey", "Adult smoking rate fell to a record low of ~12.5%"],
    ],
    impactTitle: "Impact on Family & Health",
    impactCards: [
      { title: "Secondhand Smoke Exposure", icon: "💨", color: C.secondary, body: "An estimated 58 million nonsmoking Americans are exposed to secondhand smoke, with elevated risk for children in smoking households (CDC)." },
      { title: "Financial Cost", icon: "💸", color: C.warning, body: "A pack-a-day habit can cost well over $2,000 per year at current average U.S. cigarette prices." },
      { title: "Modeling to Children", icon: "👨‍👩‍👧", color: C.accent, body: "Children of smokers are meaningfully more likely to start smoking themselves, research consistently finds." },
      { title: "Social & Workplace Stigma", icon: "🚭", color: C.purple, body: "Shifting social norms around smoking can add isolation and stress on top of the physical effects of dependence." },
    ],
    impactStats: [
      { stat: "58M", label: "nonsmoking Americans exposed to secondhand smoke", color: C.secondary },
      { stat: "~30%", label: "drop in heart disease risk within 1 year of quitting", color: C.primary },
      { stat: "2×", label: "higher odds that a smoker's child will also start smoking", color: C.warning },
    ],
    perspective: "The CDC frames nicotine dependence as a chronic condition that often takes multiple quit attempts — that's expected, not a sign quitting won't eventually work.",
    recoveryStages: [
      { timeframe: "First 72 Hours", title: "Peak Withdrawal", color: C.accent, body: "Physical withdrawal symptoms are typically most intense in the first three days." },
      { timeframe: "Weeks 1–4", title: "Habit Disruption", color: C.warning, body: "Psychological cravings and habit-triggered urges continue as new routines form." },
      { timeframe: "Months 1–6", title: "Measurable Recovery", color: C.primary, body: "Lung function and circulation show measurable improvement during this window." },
      { timeframe: "1 Year+", title: "Long-Term Payoff", color: C.secondary, body: "Heart disease risk drops by roughly half compared to a smoker, and continues falling for years after." },
    ],
    recoveryStrategies: [
      { icon: "🩹", title: "Nicotine Replacement Therapy", color: C.secondary, desc: "Patches, gum, and lozenges roughly double quit success rates versus going without support." },
      { icon: "💊", title: "Prescription Medication", color: C.warning, desc: "Varenicline and bupropion are FDA-approved options — talk to a doctor about fit." },
      { icon: "📞", title: "Counseling & Quitlines", color: C.accent, desc: "Behavioral counseling combined with medication produces the best outcomes." },
      { icon: "🎯", title: "Trigger Identification", color: C.purple, desc: "Identifying and planning around personal triggers reduces relapse risk." },
    ],
    helpResources: [
      { title: "1-800-QUIT-NOW", url: "1-800-784-8669", type: "Quitline", color: C.secondary, desc: "Free national quitline with coaching support." },
      { title: "Smokefree.gov", url: "smokefree.gov", type: "Educational", color: C.warning, desc: "NCI-run resource with quit plans, apps, and text support." },
      { title: "CDC Tips From Former Smokers", url: "cdc.gov/tobacco", type: "Educational", color: C.accent, desc: "Real stories and health information from the CDC's tobacco program." },
      { title: "American Lung Association", url: "lung.org", type: "Support Programs", color: C.purple, desc: "Freedom From Smoking program and additional resources." },
    ],
    notBrokenTitle: "Quitting Gets Easier",
    notBrokenBody: "Most successful quitters needed several attempts before it stuck. Each attempt teaches something — it isn't failure, it's part of the process.",
    hasStory: false,
  },

};

const CATEGORY_ORDER = ["porn", "nicotine"];

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
    <div style={{ fontSize: "1.7rem", fontWeight: 800, color, fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}>{number}</div>
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

const NoteBox = ({ children, color = C.warning }) => (
  <div style={{
    borderLeft: `4px solid ${color}`, background: `${color}14`,
    borderRadius: "0 10px 10px 0", padding: "1.1rem 1.4rem", marginBottom: "2.5rem",
  }}>
    <p style={{ color: C.muted, fontSize: "0.86rem", lineHeight: 1.7, margin: 0 }}>
      <strong style={{ color: C.text }}>A note on the science: </strong>{children}
    </p>
  </div>
);

// --- GENERIC TWO-SERIES BAR CHART ---
const TwoSeriesBarChart = ({ chart }) => (
  <ChartCard title={chart.title} note={chart.note}>
    <ResponsiveContainer width="100%" height={230}>
      <BarChart data={chart.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
        <XAxis dataKey="label" tick={{ fill: C.muted, fontSize: 10 }} />
        <YAxis tick={{ fill: C.muted, fontSize: 10 }} />
        <Tooltip contentStyle={ttStyle} />
        {chart.keyB && <Legend wrapperStyle={{ color: C.muted, fontSize: "0.75rem" }} />}
        <Bar dataKey="a" name={chart.keyA} fill={C.primary} radius={[3, 3, 0, 0]} />
        {chart.keyB && <Bar dataKey="b" name={chart.keyB} fill={C.accent} radius={[3, 3, 0, 0]} />}
      </BarChart>
    </ResponsiveContainer>
  </ChartCard>
);

// --- SIDEBAR ---
function Sidebar({ activeCategory, setActiveCategory, setPage }) {
  return (
    <div style={{
      width: 210, flexShrink: 0, borderRight: `1px solid ${C.border}`,
      padding: "1.5rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.3rem",
    }} className="sidebar-nav">
      <div style={{ color: C.muted, fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 0.75rem", marginBottom: "0.5rem" }}>
        Browse By Topic
      </div>
      {CATEGORY_ORDER.map((id) => {
        const cat = CATEGORIES[id];
        const active = id === activeCategory;
        return (
          <button
            key={id}
            onClick={() => { setActiveCategory(id); setPage("home"); }}
            style={{
              display: "flex", alignItems: "center", gap: "0.7rem",
              background: active ? `${cat.accent}18` : "transparent",
              border: "none", borderLeft: active ? `3px solid ${cat.accent}` : "3px solid transparent",
              borderRadius: 8, padding: "0.7rem 0.75rem", cursor: "pointer",
              color: active ? C.text : C.muted, fontFamily: "inherit",
              fontSize: "0.87rem", fontWeight: active ? 700 : 500, textAlign: "left",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>{cat.icon}</span>
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

// --- GENERIC PAGES (driven by category data) ---

function CategoryHome({ cat, setPage }) {
  return (
    <div>
      <div style={{
        minHeight: "72vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "clamp(2rem,6vw,5rem)", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: `radial-gradient(ellipse 80% 60% at 60% 40%, ${cat.accent}12 0%, transparent 60%)`,
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
          <div style={{
            display: "inline-block", background: `${cat.accent}1f`, color: cat.accent,
            border: `1px solid ${cat.accent}4d`, padding: "0.3rem 1rem",
            borderRadius: 100, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.09em",
            textTransform: "uppercase", marginBottom: "1.5rem",
          }}>{cat.badge}</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 900,
            fontSize: "clamp(2.1rem,6vw,3.8rem)", color: C.text,
            lineHeight: 1.08, margin: "0 0 1.5rem",
          }}>
            {cat.heroTitle}<br />
            <span style={{ color: cat.accent }}>{cat.heroHighlight}</span>
          </h1>
          <p style={{ color: C.muted, fontSize: "clamp(1rem,2.5vw,1.12rem)", lineHeight: 1.75, maxWidth: 580, marginBottom: "2rem" }}>
            {cat.heroSub}
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={() => setPage("science")} style={{
              background: cat.accent, color: "#07090f", padding: "0.85rem 2rem",
              border: "none", borderRadius: 8, fontWeight: 700, fontSize: "0.95rem",
              cursor: "pointer", fontFamily: "inherit",
            }}>Explore The Science</button>
            <button onClick={() => setPage("recovery")} style={{
              background: "transparent", color: C.text, padding: "0.85rem 2rem",
              border: `1px solid ${C.border}`, borderRadius: 8, fontWeight: 600,
              fontSize: "0.95rem", cursor: "pointer", fontFamily: "inherit",
            }}>Path Forward</button>
          </div>
        </div>
      </div>

      <div style={{ padding: "clamp(2rem,6vw,4rem)", borderTop: `1px solid ${C.border}` }}>
        <SectionHead title="The Numbers" sub="Research-backed statistics on scale and impact." color={cat.accent} />
        <NoteBox color={cat.accent}>{cat.diagnosisNote}</NoteBox>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: "1rem" }}>
          {cat.stats.map((s, i) => <StatCard key={i} {...s} />)}
        </div>
      </div>

      <div style={{ padding: "clamp(2rem,6vw,4rem)", borderTop: `1px solid ${C.border}` }}>
        <SectionHead title="Common Signs" color={cat.accent} />
        {cat.diagnosticSigns.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: "0.8rem", marginBottom: "0.6rem", alignItems: "flex-start" }}>
            <Dot color={cat.accent} />
            <span style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.5 }}>{s}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: "clamp(2rem,6vw,4rem)", borderTop: `1px solid ${C.border}` }}>
        <SectionHead title="Explore This Topic" color={cat.accent} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: "1.2rem" }}>
          {[
            { id: "science", title: "The Science", desc: "Brain mechanisms and the research behind them.", icon: "🧠" },
            { id: "statistics", title: "Statistics", desc: "Prevalence, trends, and key studies.", icon: "📊" },
            { id: "impact", title: "Impact", desc: "Effects on relationships, family, and daily life.", icon: "💔" },
            { id: "recovery", title: "Recovery", desc: "Stages, strategies, and what actually helps.", icon: "🌱" },
            ...(cat.hasStory ? [{ id: "mystory", title: "Real Stories", desc: "A personal account of recovery.", icon: "💬" }] : []),
            { id: "help", title: "Get Help", desc: "Verified resources and support lines.", icon: "🤝" },
          ].map(({ id, title, desc, icon }) => (
            <div key={id} onClick={() => setPage(id)} style={{
              background: C.bgCard, border: `1px solid ${C.border}`,
              borderTop: `3px solid ${cat.accent}`, borderRadius: 12,
              padding: "1.4rem", cursor: "pointer",
            }}>
              <div style={{ fontSize: "1.7rem", marginBottom: "0.6rem" }}>{icon}</div>
              <h3 style={{ color: C.text, margin: "0 0 0.4rem", fontSize: "0.98rem", fontWeight: 700 }}>{title}</h3>
              <p style={{ color: C.muted, margin: 0, fontSize: "0.82rem", lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SciencePageGeneric({ cat }) {
  return (
    <div style={{ padding: "clamp(2rem,6vw,4rem)" }}>
      <SectionHead title="The Science" sub="What the current research shows — and where it's still debated." color={cat.accent} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.2rem", marginBottom: "2.5rem" }}>
        {cat.scienceCards.map(({ title, color, body }) => (
          <Card key={title} accent={color}>
            <h3 style={{ color, margin: "0 0 0.7rem", fontSize: "1rem", fontWeight: 700 }}>{title}</h3>
            <p style={{ color: C.muted, margin: 0, fontSize: "0.855rem", lineHeight: 1.7 }}>{body}</p>
          </Card>
        ))}
      </div>
      <TwoSeriesBarChart chart={cat.chart1} />
    </div>
  );
}

function StatisticsPageGeneric({ cat }) {
  return (
    <div style={{ padding: "clamp(2rem,6vw,4rem)" }}>
      <SectionHead title="Statistics & Research Data" sub="Compiled from peer-reviewed journals and national surveys." color={cat.accent} />
      <div style={{ marginBottom: "1.5rem" }}>
        <TwoSeriesBarChart chart={cat.chart2} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <ChartCard title="Self-Reported Negative Effects" note="Among those reporting problematic use; self-report survey data.">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cat.effectsData} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 110 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
              <XAxis type="number" domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fill: C.muted, fontSize: 10 }} unit="%" />
              <YAxis dataKey="effect" type="category" tick={{ fill: C.text, fontSize: 10 }} width={110} />
              <Tooltip contentStyle={ttStyle} formatter={(v) => [`${v}%`, "Reported"]} />
              <Bar dataKey="pct" name="%" radius={[0, 4, 4, 0]} barSize={16}>
                {cat.effectsData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Distribution of Reported Effects" note="Proportional breakdown of primary effects reported.">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Pie
                data={cat.effectsData.map(e => ({ name: e.effect, value: e.pct }))}
                cx="50%" cy="45%" outerRadius={85}
                dataKey="value" nameKey="name"
                label={({ percent }) => `${Math.round(percent * 100)}%`}
                labelLine={false} fontSize={11}
              >
                {cat.effectsData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={ttStyle} formatter={(v) => [`${v}%`, ""]} />
              <Legend layout="horizontal" verticalAlign="bottom" wrapperStyle={{ color: C.muted, fontSize: "0.7rem", paddingTop: "0.5rem" }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Key Research Studies" note="Selected peer-reviewed and government research.">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${C.border}` }}>
                {["Study", "Year", "Sample", "Key Finding"].map(h => (
                  <th key={h} style={{ color: cat.accent, padding: "0.75rem 0.6rem", textAlign: "left", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cat.researchTable.map((row, i) => (
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
  );
}

function ImpactPageGeneric({ cat }) {
  return (
    <div style={{ padding: "clamp(2rem,6vw,4rem)" }}>
      <SectionHead title={cat.impactTitle} color={cat.accent} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.2rem", marginBottom: "2.5rem" }}>
        {cat.impactCards.map(({ title, icon, color, body }) => (
          <Card key={title}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.4rem" }}>{icon}</span>
              <h3 style={{ color, margin: 0, fontSize: "0.96rem", fontWeight: 700 }}>{title}</h3>
            </div>
            <p style={{ color: C.muted, margin: 0, fontSize: "0.86rem", lineHeight: 1.7 }}>{body}</p>
          </Card>
        ))}
      </div>

      <ChartCard title="Reported Impact" note="Survey data; see research table on the Statistics page for sourcing.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: "1rem" }}>
          {cat.impactStats.map(({ stat, label, color }) => (
            <div key={label} style={{
              background: "rgba(255,255,255,0.03)", borderRadius: 10,
              padding: "1.2rem", textAlign: "center", border: `1px solid ${C.border}`,
            }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color, fontFamily: "'Playfair Display', serif" }}>{stat}</div>
              <div style={{ color: C.muted, fontSize: "0.76rem", marginTop: "0.3rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </ChartCard>

      <div style={{
        marginTop: "2rem", borderLeft: `4px solid ${cat.accent}`,
        padding: "1.3rem 1.8rem", background: `${cat.accent}0d`,
        borderRadius: "0 12px 12px 0",
      }}>
        <p style={{ color: C.muted, fontSize: "0.9rem", lineHeight: 1.75, margin: 0 }}>{cat.perspective}</p>
      </div>
    </div>
  );
}

function RecoveryPageGeneric({ cat }) {
  return (
    <div style={{ padding: "clamp(2rem,6vw,4rem)" }}>
      <SectionHead title="The Path Forward" color={cat.accent} />
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
        {cat.recoveryStages.map(({ timeframe, title, color, body }, i) => (
          <div key={i} style={{
            display: "flex", gap: "1.5rem", alignItems: "flex-start",
            background: C.bgCard, borderRadius: 12, padding: "1.3rem",
            border: `1px solid ${C.border}`,
          }}>
            <div style={{ flexShrink: 0, textAlign: "center", width: 60 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: color, color: "#07090f",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, fontSize: "0.82rem", margin: "0 auto 0.3rem",
              }}>{i + 1}</div>
              <div style={{ color: C.muted, fontSize: "0.64rem", lineHeight: 1.3 }}>{timeframe}</div>
            </div>
            <div>
              <h4 style={{ color, margin: "0 0 0.4rem", fontSize: "0.96rem", fontWeight: 700 }}>{title}</h4>
              <p style={{ color: C.muted, margin: 0, fontSize: "0.85rem", lineHeight: 1.65 }}>{body}</p>
            </div>
          </div>
        ))}
      </div>

      <Card>
        <h3 style={{ color: C.text, fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", marginBottom: "1.4rem" }}>What Actually Helps</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1rem" }}>
          {cat.recoveryStrategies.map(({ icon, title, color, desc }) => (
            <div key={title} style={{ padding: "1.1rem", background: "rgba(255,255,255,0.025)", borderRadius: 10, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.15rem" }}>{icon}</span>
                <span style={{ color, fontWeight: 700, fontSize: "0.9rem" }}>{title}</span>
              </div>
              <p style={{ color: C.muted, margin: 0, fontSize: "0.8rem", lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function HelpPageGeneric({ cat }) {
  return (
    <div style={{ padding: "clamp(2rem,6vw,4rem)" }}>
      <SectionHead title="Get Help" sub="Verified resources and support lines." color={cat.accent} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "1.2rem", marginBottom: "2.5rem" }}>
        {cat.helpResources.map(({ title, url, type, color, desc }) => (
          <div key={title} style={{
            background: C.bgCard, borderRadius: 12, padding: "1.4rem",
            border: `1px solid ${C.border}`, borderTop: `3px solid ${color}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem", flexWrap: "wrap", gap: "0.3rem" }}>
              <h3 style={{ color: C.text, margin: 0, fontSize: "0.92rem", fontWeight: 700 }}>{title}</h3>
              <span style={{
                background: "rgba(255,255,255,0.06)", color, padding: "0.15rem 0.6rem",
                borderRadius: 100, fontSize: "0.67rem", fontWeight: 700, whiteSpace: "nowrap",
              }}>{type}</span>
            </div>
            <p style={{ color: C.muted, margin: "0 0 0.7rem", fontSize: "0.83rem", lineHeight: 1.55 }}>{desc}</p>
            <div style={{ color, fontSize: "0.8rem", fontWeight: 500 }}>{url}</div>
          </div>
        ))}
      </div>
      <div style={{
        background: `linear-gradient(135deg,${cat.accent}14 0%, ${C.secondary}10 100%)`,
        borderRadius: 16, padding: "2.3rem",
        border: `1px solid ${cat.accent}33`, textAlign: "center",
      }}>
        <h3 style={{ color: C.text, fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", margin: "0 0 1rem" }}>{cat.notBrokenTitle}</h3>
        <p style={{ color: C.muted, maxWidth: 540, margin: "0 auto", fontSize: "0.93rem", lineHeight: 1.75 }}>{cat.notBrokenBody}</p>
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

// --- REAL STORIES (porn only) ---
function RealStoriesPage() {
  return (
    <div style={{ padding: "clamp(2rem,6vw,4rem)", maxWidth: 800, margin: "0 auto" }}>
      <SectionHead title="Real Stories" sub="A personal account of addiction, recovery, and why this website exists." color={C.warning} />

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
  const [status, setStatus] = useState("idle");

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
export default function App() {
  const [category, setCategory] = useState("porn");
  const [page, setPage] = useState("home");
  const cat = CATEGORIES[category];

  const NAV = [
    { id: "home", label: "Home" },
    { id: "science", label: "The Science" },
    { id: "statistics", label: "Statistics" },
    { id: "impact", label: "Impact" },
    { id: "recovery", label: "Recovery" },
    ...(cat.hasStory ? [{ id: "mystory", label: "Real Stories" }] : []),
    { id: "help", label: "Get Help" },
    { id: "donate", label: "❤️ Donate" },
  ];

  const pages = {
    home: () => <CategoryHome cat={cat} setPage={setPage} />,
    science: () => <SciencePageGeneric cat={cat} />,
    statistics: () => <StatisticsPageGeneric cat={cat} />,
    impact: () => <ImpactPageGeneric cat={cat} />,
    recovery: () => <RecoveryPageGeneric cat={cat} />,
    mystory: () => <RealStoriesPage />,
    help: () => <HelpPageGeneric cat={cat} />,
    donate: () => <DonatePage />,
  };
  const PageComponent = pages[page] || pages.home;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#07090f;font-family:'DM Sans',sans-serif;color:#f0f4fc;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#07090f;}
        ::-webkit-scrollbar-thumb{background:#1e2a3a;border-radius:3px;}
        .layout-shell{display:flex;min-height:100vh;}
        .sidebar-nav{position:sticky;top:58px;height:calc(100vh - 58px);overflow-y:auto;}
        @media (max-width: 780px){
          .layout-shell{flex-direction:column;}
          .sidebar-nav{position:relative;top:0;height:auto;width:100%!important;flex-direction:row!important;overflow-x:auto;overflow-y:hidden;border-right:none!important;border-bottom:1px solid ${C.border};padding:0.75rem!important;}
          .sidebar-nav > div:first-child{display:none;}
          .sidebar-nav button{flex-shrink:0;}
        }
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
            <span style={{ color: cat.accent }}>◆</span> AddictionFacts
          </button>
          <div style={{ display: "flex", gap: "0.15rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {NAV.slice(1).map(({ id, label }) => (
              <button key={id} onClick={() => setPage(id)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: page === id ? cat.accent : C.muted,
                fontFamily: "inherit", fontSize: "0.83rem", fontWeight: 500,
                padding: "0.4rem 0.7rem", borderRadius: 6,
                borderBottom: page === id ? `2px solid ${cat.accent}` : "2px solid transparent",
                transition: "all 0.15s", letterSpacing: "0.01em",
              }}>{label}</button>
            ))}
          </div>
        </nav>

        <div className="layout-shell">
          <Sidebar activeCategory={category} setActiveCategory={setCategory} setPage={setPage} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <main style={{ maxWidth: 1200, margin: "0 auto" }}>
              <PageComponent />
            </main>
            <NewsletterBar />
            <footer style={{ borderTop: `1px solid ${C.border}`, padding: "2rem clamp(2rem,6vw,4rem)", textAlign: "center" }}>
              <p style={{ color: C.muted, fontSize: "0.8rem", lineHeight: 1.65 }}>
                This website is for educational and awareness purposes only. Content is based on peer-reviewed research and clinical literature.<br />
                If you are in crisis, please contact the SAMHSA helpline at <strong style={{ color: C.text }}>1-800-662-4357</strong> or your local emergency services.
              </p>
              <p style={{ color: C.border, fontSize: "0.73rem", marginTop: "0.75rem" }}>
                © 2026 AddictionFacts.org · Built for public health awareness · Created by Ben
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
