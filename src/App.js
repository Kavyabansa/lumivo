import { useState, useRef } from "react";

/* ── THEME ── */
const T = "#2DD4BF"; // teal accent
const BG = "#000";
const CARD = "#111";
const CARD2 = "#181818";
const BORDER = "rgba(255,255,255,0.07)";
const DIM = "#6b7280";
const WHITE = "#f1f5f9";

/* ── DATA ── */
const MOODS = [
  { emoji:"😁", label:"Great",   val:5, color:"#22c55e" },
  { emoji:"🙂", label:"Good",    val:4, color:"#84cc16" },
  { emoji:"😐", label:"Okay",    val:3, color:"#eab308" },
  { emoji:"😕", label:"Bad",     val:2, color:"#f97316" },
  { emoji:"😢", label:"Awful",   val:1, color:"#ef4444" },
];

const BADGES = { BRONZE:"#cd7f32", SILVER:"#94a3b8", GOLD:"#eab308", ELITE:"#a855f7" };

const ALL_ACHIEVEMENTS = [
  // Habits
  { id:1,  cat:"Habits",  icon:"✅", tier:"BRONZE", name:"First Completion", desc:"Complete your first habit",  progress:0, target:1  },
  { id:2,  cat:"Habits",  icon:"🔥", tier:"SILVER", name:"Habit Week",       desc:"7 day streak on any habit",  progress:0, target:7  },
  { id:3,  cat:"Habits",  icon:"🏅", tier:"GOLD",   name:"Habit Month",      desc:"30 day streak",              progress:0, target:30 },
  { id:4,  cat:"Habits",  icon:"⭐", tier:"GOLD",   name:"Multi Master",     desc:"5 habits in one day",        progress:0, target:5  },
  { id:5,  cat:"Habits",  icon:"🛡️", tier:"ELITE",  name:"Iron Will",        desc:"90 day streak",              progress:0, target:90 },
  // Journal
  { id:6,  cat:"Journal", icon:"📝", tier:"BRONZE", name:"First Entry",      desc:"Write your first journal",   progress:0, target:1  },
  { id:7,  cat:"Journal", icon:"🔥", tier:"SILVER", name:"Week Streak",      desc:"Journal 7 days in a row",    progress:0, target:7  },
  { id:8,  cat:"Journal", icon:"✨", tier:"GOLD",   name:"Month Streak",     desc:"Journal 30 days",            progress:0, target:30 },
  { id:9,  cat:"Journal", icon:"📖", tier:"GOLD",   name:"Century",          desc:"100 journal entries",        progress:0, target:100},
  { id:10, cat:"Journal", icon:"🧠", tier:"ELITE",  name:"Deep Reflector",   desc:"365 journal entries",        progress:0, target:365},
  // Planner
  { id:11, cat:"Planner", icon:"💡", tier:"BRONZE", name:"First Plan",       desc:"Create your first plan",     progress:0, target:1  },
  { id:12, cat:"Planner", icon:"⚡", tier:"SILVER", name:"Strategist",       desc:"Create 5 plans",             progress:0, target:5  },
  { id:13, cat:"Planner", icon:"🚀", tier:"GOLD",   name:"Innovator",        desc:"Create 20 plans",            progress:0, target:20 },
  { id:14, cat:"Planner", icon:"✔️", tier:"GOLD",   name:"Plan Completer",   desc:"Complete 10 plans",          progress:0, target:10 },
  { id:15, cat:"Planner", icon:"💜", tier:"ELITE",  name:"Master Planner",   desc:"Complete 50 plans",          progress:0, target:50 },
  // Vision
  { id:16, cat:"Vision",  icon:"🔲", tier:"BRONZE", name:"First Vision",     desc:"Create a vision board",      progress:0, target:1  },
  { id:17, cat:"Vision",  icon:"🖼️", tier:"SILVER", name:"Detailed Vision",  desc:"Add 5 images",               progress:0, target:5  },
  { id:18, cat:"Vision",  icon:"🔲", tier:"GOLD",   name:"Multi-Section",    desc:"Create 3 sections",          progress:0, target:3  },
  // Cross
  { id:19, cat:"Cross",   icon:"🔗", tier:"BRONZE", name:"First Link",       desc:"Link a habit to a plan",     progress:0, target:1  },
  { id:20, cat:"Cross",   icon:"🕸️", tier:"SILVER", name:"Connector",        desc:"5 cross-links",              progress:0, target:5  },
  { id:21, cat:"Cross",   icon:"🌐", tier:"GOLD",   name:"Web Weaver",       desc:"20 cross-links",             progress:0, target:20 },
  { id:22, cat:"Cross",   icon:"♾️", tier:"ELITE",  name:"Synergist",        desc:"50 cross-links",             progress:0, target:50 },
  // Consistency
  { id:23, cat:"Consistency",icon:"📈",tier:"BRONZE",name:"3-Day Streak",    desc:"3 day streak",               progress:0, target:3  },
  { id:24, cat:"Consistency",icon:"🔥",tier:"SILVER",name:"Week Streak",     desc:"7 day streak",               progress:0, target:7  },
  { id:25, cat:"Consistency",icon:"🔥",tier:"GOLD",  name:"Month Streak",    desc:"30 day streak",              progress:0, target:30 },
  { id:26, cat:"Consistency",icon:"💎",tier:"ELITE", name:"Quarter Streak",  desc:"90 day streak",              progress:0, target:90 },
  // Exploration
  { id:27, cat:"Exploration",icon:"🧭",tier:"BRONZE",name:"Explorer",        desc:"Try all features",           progress:1, target:4  },
  { id:28, cat:"Exploration",icon:"🏷️",tier:"SILVER",name:"Tag Master",      desc:"Create 10 tags",             progress:0, target:10 },
  { id:29, cat:"Exploration",icon:"⭐",tier:"GOLD",  name:"Well-Rounded",    desc:"Use all 5 sections",         progress:0, target:5  },
];

const INIT_HABITS = [
  { id:1, name:"Morning Workout", icon:"💪", color:"#ef4444", streak:5,  done:false, total:14, xp:20 },
  { id:2, name:"Read 30 mins",    icon:"📚", color:T,          streak:3,  done:false, total:9,  xp:15 },
  { id:3, name:"Drink 8 Glasses", icon:"💧", color:"#06b6d4", streak:7,  done:true,  total:21, xp:10 },
  { id:4, name:"Meditate",        icon:"🧘", color:"#8b5cf6", streak:2,  done:false, total:6,  xp:15 },
  { id:5, name:"Study Python",    icon:"💻", color:"#10b981", streak:1,  done:false, total:3,  xp:25 },
];

const INIT_PLANS = [
  { id:1, name:"Learn AI/ML",     status:"Active",   linked:2, progress:40 },
  { id:2, name:"Get Fit by July", status:"Active",   linked:1, progress:65 },
  { id:3, name:"Read 12 Books",   status:"Someday",  linked:0, progress:0  },
];

const SETTINGS_SECTIONS = [
  { section:"Account", icon:"👥", items:[
    { label:"Sign Out",          sub:"Signed in as kavya@gmail.com", arrow:true, red:false },
    { label:"Subscription",      sub:"Buy or manage your subscription", arrow:true },
    { label:"Restore Purchase",  sub:"Restore a previous purchase",    arrow:true },
    { label:"Delete Account",    sub:"Permanently delete your account and all data", arrow:true, red:true },
  ]},
  { section:"Profile", icon:"👤", items:[
    { label:"Add Name",   sub:"", edit:true },
    { label:"Theme",      sub:"Midnight", arrow:true },
  ]},
  { section:"Appearance", icon:"🎨", items:[
    { label:"Enable Vibration Feedback", toggle:true, val:true },
    { label:"Reduce Motion",  sub:"Minimize animations and transitions", toggle:true, val:false },
    { label:"Font Size",      sub:"Medium",  arrow:true },
    { label:"Language",       sub:"English", arrow:true },
  ]},
  { section:"Security", icon:"🛡️", items:[
    { label:"Off",            sub:"No lock screen — app opens directly", radio:true, selected:true },
    { label:"App Passcode",   sub:"Secure your app with a passcode",     radio:true, selected:false },
    { label:"Biometric Lock", sub:"Use fingerprint or face recognition", radio:true, selected:false },
  ]},
  { section:"Planner", icon:"💡", items:[
    { label:"Delete User-Defined Types", sub:"Reset custom types to General",   arrow:true, red:true },
    { label:"Delete All Plans",          sub:"Permanently remove all plans",    arrow:true, red:true },
  ]},
  { section:"Data & Storage", icon:"📋", items:[
    { label:"Database Size",   sub:"200.0 KB" },
    { label:"Total Entries",   sub:"Journal 0 | Plans 0 | Habits 0" },
    { label:"Manage Tags",     sub:"View, search, and delete your tags", arrow:true },
    { label:"Export Data",     sub:"Download your data",    arrow:true },
    { label:"Import Data",     sub:"Import data from backup", arrow:true },
    { label:"Clear All Data",  sub:"Permanently delete all data", arrow:true, red:true },
  ]},
  { section:"On-Device AI", icon:"🤖", items:[
    { label:"Processed entirely on your device. No data leaves.", italic:true },
    { label:"On-Device AI Features", sub:"Not available on this device", toggle:true, val:false, disabled:true },
  ]},
  { section:"Support", icon:"❓", items:[
    { label:"Send Feedback", sub:"Report a bug or suggest a feature", arrow:true },
  ]},
  { section:"About", icon:"ℹ️", items:[
    { label:"Version",          sub:"1.0.0" },
    { label:"Build",            sub:"Sprint 2" },
    { label:"Share Lumivo",     sub:"Invite someone to try the app", arrow:true },
    { label:"Rate Lumivo",      sub:"Leave a rating or review in the store", arrow:true },
    { label:"Replay walkthrough",sub:"Show the Home screen guide again", arrow:true },
  ]},
];

/* ── SMALL COMPONENTS ── */
const s = { // shared styles
  card:  { background:CARD,  border:`1px solid ${BORDER}`, borderRadius:14, padding:"16px" },
  card2: { background:CARD2, border:`1px solid ${BORDER}`, borderRadius:14, padding:"14px" },
  teal:  { color:T, fontWeight:700 },
  dim:   { color:DIM },
  label: { fontSize:11, color:DIM, fontWeight:700, letterSpacing:.8, margin:"0 0 8px" },
};

function NavIcon({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"4px 12px", flex:1 }}>
      <span style={{ fontSize:22, opacity: active ? 1 : 0.35 }}>{icon}</span>
      <span style={{ fontSize:10, fontWeight:700, color: active ? T : DIM }}>{label}</span>
      {active && <div style={{ width:20, height:2.5, borderRadius:2, background:T, marginTop:1 }} />}
    </button>
  );
}

function PageHeader({ icon, title, sub, onBack }) {
  return (
    <div style={{ padding:"48px 20px 16px", display:"flex", alignItems:"center", gap:16, background:`linear-gradient(180deg,rgba(45,212,191,.06) 0%,transparent 100%)` }}>
      {onBack && (
        <button onClick={onBack} style={{ background:"rgba(255,255,255,.08)", border:"none", borderRadius:12, width:40, height:40, fontSize:20, cursor:"pointer", color:WHITE, flexShrink:0 }}>‹</button>
      )}
      <div style={{ width:52, height:52, borderRadius:"50%", background:`rgba(45,212,191,.15)`, border:`1.5px solid rgba(45,212,191,.35)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0, boxShadow:`0 0 18px rgba(45,212,191,.2)` }}>{icon}</div>
      <div>
        <h1 style={{ margin:0, fontSize:24, fontWeight:900, color:T }}>{title}</h1>
        {sub && <div style={{ marginTop:4 }}>{sub}</div>}
      </div>
    </div>
  );
}

function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display:"flex", borderBottom:`1px solid ${BORDER}`, margin:"0 16px 16px", overflowX:"auto" }}>
      {tabs.map(t => (
        <button key={t} onClick={() => onChange(t)} style={{
          background:"none", border:"none", cursor:"pointer", padding:"10px 16px",
          color: active===t ? T : DIM, fontWeight:700, fontSize:14, whiteSpace:"nowrap",
          borderBottom: active===t ? `2px solid ${T}` : "2px solid transparent",
          marginBottom:-1,
        }}>{t}</button>
      ))}
    </div>
  );
}

function StatBox({ icon, val, label }) {
  return (
    <div style={{ ...s.card, flex:1, textAlign:"center", padding:"18px 8px" }}>
      <div style={{ fontSize:22, color:T, marginBottom:6 }}>{icon}</div>
      <div style={{ fontSize:22, fontWeight:900, color:WHITE, marginBottom:4 }}>{val}</div>
      <div style={{ fontSize:11, color:DIM, fontWeight:600 }}>{label}</div>
    </div>
  );
}

function AchievementCard({ a }) {
  const bc = BADGES[a.tier];
  const pct = Math.round((a.progress / a.target) * 100);
  return (
    <div style={{ background:CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:"16px", position:"relative", overflow:"hidden" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
        <div style={{ width:40, height:40, borderRadius:12, background:`${bc}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{a.icon}</div>
        <div style={{ background:`${bc}22`, border:`1.5px solid ${bc}`, borderRadius:8, padding:"3px 10px", fontSize:11, fontWeight:800, color:bc }}>{a.tier}</div>
      </div>
      <div style={{ fontSize:15, fontWeight:700, color:WHITE, marginBottom:10 }}>{a.name}</div>
      <div style={{ background:"rgba(255,255,255,.07)", borderRadius:6, height:4, overflow:"hidden" }}>
        <div style={{ width:`${pct}%`, height:"100%", background:bc, borderRadius:6 }} />
      </div>
      <div style={{ fontSize:12, color:DIM, marginTop:6 }}>{pct}%</div>
    </div>
  );
}

function Toast({ t }) {
  if (!t) return null;
  return <div style={{ position:"fixed", top:66, left:"50%", transform:"translateX(-50%)", background:t.color||T, color:"#000", fontWeight:800, fontSize:14, padding:"10px 22px", borderRadius:40, zIndex:9999, boxShadow:`0 4px 24px ${t.color||T}88`, whiteSpace:"nowrap", animation:"tIn .3s ease" }}>{t.msg}</div>;
}

function Sheet({ open, onClose, children }) {
  return (
    <>
      {open && <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.75)", zIndex:900, backdropFilter:"blur(4px)" }} />}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:`translateX(-50%) translateY(${open?0:110}%)`, width:"100%", maxWidth:430, background:"#111", borderRadius:"24px 24px 0 0", padding:"0 20px 44px", zIndex:901, transition:"transform .38s cubic-bezier(.32,1.1,.65,1)", maxHeight:"88vh", overflowY:"auto" }}>
        <div style={{ width:44, height:4, background:"#2a2a2a", borderRadius:4, margin:"14px auto 20px" }} />
        {children}
      </div>
    </>
  );
}

const inp = { width:"100%", background:"rgba(255,255,255,.06)", border:`1.5px solid ${BORDER}`, borderRadius:12, padding:"12px 14px", color:WHITE, fontSize:14, marginBottom:14, boxSizing:"border-box", fontFamily:"inherit" };

/* ══════════════════════════════════════════
   SCREENS
══════════════════════════════════════════ */

/* ── HOME ── */
function HomeScreen({ habits, journal, plans, onTabChange }) {
  const done = habits.filter(h => h.done).length;
  const total = habits.length;
  const pct = total ? Math.round((done/total)*100) : 0;
  const today = new Date();
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const todayIdx = today.getDay();
  const weekDays = Array.from({length:7}, (_,i) => ({ label: days[i][0], past: i < todayIdx, today: i === todayIdx }));
  const moods = [
    {emoji:"😢",label:"Awful"},{emoji:"😕",label:"Bad"},{emoji:"😐",label:"Okay"},{emoji:"🙂",label:"Good"},{emoji:"😁",label:"Great"},
  ];
  const [todayMood, setTodayMood] = useState(null);

  return (
    <div style={{ padding:"0 16px 100px" }}>
      {/* greeting */}
      <div style={{ padding:"52px 0 16px" }}>
        <p style={{ margin:0, fontSize:13, color:DIM, fontWeight:600 }}>Thursday, June 18</p>
        <h1 style={{ margin:"4px 0 0", fontSize:28, fontWeight:900, letterSpacing:-1, color:WHITE }}>Good Morning, Kavya 👋</h1>
      </div>

      {/* mood */}
      <div style={{ ...s.card, marginBottom:14 }}>
        <p style={{ margin:"0 0 12px", fontSize:13, color:WHITE, fontWeight:700 }}>How are you feeling?</p>
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          {moods.map((m,i) => (
            <button key={i} onClick={() => setTodayMood(i)} style={{
              background: todayMood===i ? `${T}22` : "rgba(255,255,255,.04)",
              border: todayMood===i ? `1.5px solid ${T}` : `1.5px solid ${BORDER}`,
              borderRadius:12, padding:"10px 6px", cursor:"pointer", flex:1, margin:"0 3px", textAlign:"center",
            }}>
              <div style={{ fontSize:22 }}>{m.emoji}</div>
              <div style={{ fontSize:10, color: todayMood===i ? T : DIM, marginTop:4, fontWeight:600 }}>{m.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* week strip */}
      <div style={{ ...s.card, marginBottom:14 }}>
        <p style={{ ...s.label, margin:"0 0 10px" }}>THIS WEEK</p>
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          {weekDays.map((d,i) => (
            <div key={i} style={{ textAlign:"center" }}>
              <div style={{ fontSize:10, color:DIM, marginBottom:6, fontWeight:600 }}>{d.label}</div>
              <div style={{
                width:34, height:34, borderRadius:10,
                background: d.today ? T : d.past ? `${T}33` : "rgba(255,255,255,.05)",
                border: d.today ? `2px solid ${T}` : "2px solid transparent",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:14, color: d.today ? "#000" : d.past ? T : "#334155", fontWeight:900,
                boxShadow: d.today ? `0 0 14px ${T}66` : "none",
              }}>{d.past ? "✓" : d.today ? "★" : d.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* today's habits progress */}
      <div style={{
        background:`linear-gradient(135deg,${T}22,rgba(6,182,212,.1))`,
        border:`1.5px solid ${T}44`, borderRadius:18, padding:"20px", marginBottom:14,
        display:"flex", alignItems:"center", gap:18,
        boxShadow:`0 8px 32px ${T}22`,
      }}>
        <div style={{ position:"relative", width:80, height:80, flexShrink:0 }}>
          <svg width={80} height={80} style={{ transform:"rotate(-90deg)" }}>
            <circle cx={40} cy={40} r={32} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth={8} />
            <circle cx={40} cy={40} r={32} fill="none" stroke={T} strokeWidth={8}
              strokeDasharray={2*Math.PI*32} strokeDashoffset={2*Math.PI*32*(1-pct/100)}
              strokeLinecap="round" style={{ transition:"stroke-dashoffset 1s ease" }} />
          </svg>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:900, color:T }}>{pct}%</div>
        </div>
        <div>
          <p style={{ margin:"0 0 4px", fontSize:13, color:DIM }}>Today's Habits</p>
          <p style={{ margin:0, fontSize:36, fontWeight:900, color:WHITE, letterSpacing:-1 }}>{done}<span style={{ fontSize:18, color:DIM }}>/{total}</span></p>
          <p style={{ margin:"5px 0 0", fontSize:12, color:done===total&&total>0?T:DIM }}>{done===total&&total>0?"🎉 All done!":done===0?"Start a habit!":"Keep going!"}</p>
        </div>
      </div>

      {/* pending habits */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", margin:"0 0 10px" }}>
        <p style={{ ...s.label, margin:0 }}>PENDING TODAY</p>
        <button onClick={() => onTabChange("Habits")} style={{ background:"none", border:"none", color:T, fontSize:12, fontWeight:700, cursor:"pointer" }}>See all →</button>
      </div>
      {habits.filter(h=>!h.done).slice(0,3).map(h => (
        <div key={h.id} style={{ ...s.card, marginBottom:9, display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:44, height:44, borderRadius:13, background:`${h.color}22`, border:`1.5px solid ${h.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{h.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:700, color:WHITE }}>{h.name}</div>
            <div style={{ fontSize:12, color:"#fbbf24", marginTop:2 }}>🔥 {h.streak} day streak</div>
          </div>
          <div style={{ fontSize:12, color:T, fontWeight:700 }}>+{h.xp} XP</div>
        </div>
      ))}

      {/* plans preview */}
      <p style={{ ...s.label, margin:"16px 0 10px" }}>ACTIVE PLANS</p>
      {plans.filter(p=>p.status==="Active").slice(0,2).map(p => (
        <div key={p.id} style={{ ...s.card, marginBottom:9 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:14, fontWeight:700, color:WHITE }}>💡 {p.name}</span>
            <span style={{ fontSize:12, color:T, fontWeight:700 }}>{p.progress}%</span>
          </div>
          <div style={{ background:"rgba(255,255,255,.08)", borderRadius:6, height:6, overflow:"hidden" }}>
            <div style={{ width:`${p.progress}%`, height:"100%", background:T, borderRadius:6, transition:"width .8s", boxShadow:`0 0 8px ${T}66` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── JOURNAL ── */
function JournalScreen() {
  const [entries, setEntries] = useState([]);
  const [writing, setWriting] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState(null);
  const [tag, setTag] = useState("");

  const save = () => {
    if (!body.trim() && !title.trim()) return;
    const now = new Date();
    setEntries(p => [{
      id: Date.now(), title: title||"Untitled", body, mood,
      date: now.toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),
      words: body.split(" ").filter(Boolean).length,
    }, ...p]);
    setWriting(false); setTitle(""); setBody(""); setMood(null); setTag("");
  };

  if (writing) return (
    <div style={{ minHeight:"100vh", background:BG, color:WHITE, fontFamily:"inherit" }}>
      <div style={{ padding:"48px 20px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <button onClick={() => setWriting(false)} style={{ background:"none", border:"none", color:WHITE, fontSize:22, cursor:"pointer" }}>‹</button>
        <h2 style={{ margin:0, fontSize:18, fontWeight:800 }}>New Entry</h2>
        <button onClick={save} style={{ background:`${T}22`, border:`1.5px solid ${T}`, borderRadius:10, padding:"7px 18px", color:T, fontWeight:800, fontSize:13, cursor:"pointer" }}>Save</button>
      </div>
      {/* mood row */}
      <div style={{ display:"flex", gap:8, padding:"0 20px 14px", overflowX:"auto" }}>
        {MOODS.map(m => (
          <button key={m.val} onClick={() => setMood(m.val)} style={{ background: mood===m.val ? `${m.color}22` : "rgba(255,255,255,.05)", border: mood===m.val ? `1.5px solid ${m.color}` : `1.5px solid ${BORDER}`, borderRadius:12, padding:"8px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
            <span style={{ fontSize:20 }}>{m.emoji}</span>
            <span style={{ fontSize:12, color: mood===m.val ? m.color : DIM, fontWeight:700 }}>{m.label}</span>
          </button>
        ))}
      </div>
      <div style={{ padding:"0 20px" }}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Entry title..." style={{ ...inp, fontSize:18, fontWeight:700, background:"none", border:"none", borderBottom:`1px solid ${BORDER}`, borderRadius:0, paddingLeft:0 }} />
        <p style={{ margin:"0 0 12px", fontSize:12, color:DIM }}>📅 {new Date().toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})} · {body.split(" ").filter(Boolean).length} words</p>
        <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Write your thoughts..." rows={12}
          style={{ ...inp, resize:"none", lineHeight:1.7, fontSize:15 }} />
        <p style={{ margin:"0 0 8px", fontSize:14, color:T, fontWeight:700 }}>Tags</p>
        <input value={tag} onChange={e=>setTag(e.target.value)} placeholder="Add a tag..." style={inp} />
      </div>
    </div>
  );

  return (
    <div style={{ padding:"0 16px 100px" }}>
      <div style={{ padding:"52px 0 16px", display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
        <div>
          <p style={{ margin:0, fontSize:12, color:DIM, fontWeight:700, letterSpacing:.7 }}>JOURNAL</p>
          <h1 style={{ margin:"4px 0 0", fontSize:26, fontWeight:900, color:WHITE }}>My Entries</h1>
        </div>
        <button onClick={() => setWriting(true)} style={{ background:T, border:"none", borderRadius:14, padding:"10px 20px", color:"#000", fontWeight:800, fontSize:14, cursor:"pointer", boxShadow:`0 4px 16px ${T}55` }}>+ New</button>
      </div>

      {entries.length === 0 ? (
        <div style={{ textAlign:"center", padding:"60px 0", color:DIM }}>
          <div style={{ fontSize:50, marginBottom:14 }}>📖</div>
          <div style={{ fontSize:16, fontWeight:700, color:WHITE }}>No entries yet</div>
          <div style={{ fontSize:13, marginTop:6 }}>Start writing your first journal entry</div>
          <button onClick={() => setWriting(true)} style={{ marginTop:20, background:`${T}22`, border:`1.5px solid ${T}`, borderRadius:14, padding:"12px 28px", color:T, fontWeight:800, fontSize:14, cursor:"pointer" }}>Write Now</button>
        </div>
      ) : entries.map(e => {
        const m = MOODS.find(x => x.val === e.mood);
        return (
          <div key={e.id} style={{ ...s.card, marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
              <span style={{ fontSize:15, fontWeight:800, color:WHITE }}>{m ? m.emoji : "📝"} {e.title}</span>
              {m && <span style={{ fontSize:12, color:m.color, fontWeight:700 }}>{m.label}</span>}
            </div>
            <p style={{ margin:"0 0 8px", fontSize:12, color:DIM }}>{e.date} · {e.words} words</p>
            <p style={{ margin:0, fontSize:13, color:"#94a3b8", lineHeight:1.6 }}>{e.body.slice(0,120)}{e.body.length>120?"…":""}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ── HABITS ── */
function HabitsScreen({ habits, setHabits, showToast }) {
  const [sheet, setSheet] = useState(false);
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({ name:"", icon:"💪", color:T, xp:15 });
  const ICONS2 = ["💪","📚","🧘","💧","🍎","😴","✍️","🎯","🏃","🥗","💻","🎵","🌅","🚴","🧠","💊"];
  const COLS   = [T,"#ef4444","#f97316","#eab308","#10b981","#06b6d4","#6366f1","#8b5cf6","#ec4899","#f43f5e"];

  const openAdd  = () => { setEdit(null);  setForm({name:"",icon:"💪",color:T,xp:15}); setSheet(true); };
  const openEdit = (h) => { setEdit(h);    setForm({name:h.name,icon:h.icon,color:h.color,xp:h.xp}); setSheet(true); };
  const save = () => {
    if (!form.name.trim()) return;
    if (edit) { setHabits(p=>p.map(h=>h.id===edit.id?{...h,...form}:h)); showToast("Habit updated ✏️"); }
    else       { setHabits(p=>[...p,{id:Date.now(),...form,streak:0,done:false,total:0}]); showToast("Habit created! 🚀"); }
    setSheet(false);
  };
  const del = (id) => { setHabits(p=>p.filter(h=>h.id!==id)); setSheet(false); showToast("Removed"); };
  const toggle = (h) => {
    if (h.done) return;
    setHabits(p=>p.map(x=>x.id===h.id?{...x,done:true,streak:x.streak+1,total:x.total+1}:x));
    showToast(`+${h.xp} XP ✅`);
  };

  const done = habits.filter(h=>h.done).length;
  const total = habits.length;

  return (
    <div style={{ padding:"0 16px 100px" }}>
      <div style={{ padding:"52px 0 16px", display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
        <div>
          <p style={{ margin:0, fontSize:12, color:DIM, fontWeight:700, letterSpacing:.7 }}>HABITS</p>
          <h1 style={{ margin:"4px 0 0", fontSize:26, fontWeight:900, color:WHITE }}>My Habits</h1>
        </div>
        <button onClick={openAdd} style={{ background:T, border:"none", borderRadius:14, padding:"10px 20px", color:"#000", fontWeight:800, fontSize:14, cursor:"pointer", boxShadow:`0 4px 16px ${T}55` }}>+ New</button>
      </div>

      {/* stats row */}
      <div style={{ display:"flex", gap:9, marginBottom:16 }}>
        <StatBox icon="✅" val={done}        label="DONE TODAY" />
        <StatBox icon="⏳" val={total-done}  label="PENDING" />
        <StatBox icon="🔥" val={`${Math.max(0,...habits.map(h=>h.streak))}d`} label="BEST STREAK" />
      </div>

      {habits.length===0 && (
        <div style={{ textAlign:"center", padding:"50px 0", color:DIM }}>
          <div style={{ fontSize:48, marginBottom:14 }}>⚡</div>
          <div style={{ fontSize:16, fontWeight:700, color:WHITE }}>No habits yet</div>
          <div style={{ fontSize:13, marginTop:6 }}>Add your first habit above</div>
        </div>
      )}

      {habits.map(h => (
        <div key={h.id} style={{
          ...s.card, marginBottom:10, display:"flex", alignItems:"center", gap:13,
          background: h.done ? `${h.color}12` : CARD,
          border: h.done ? `1px solid ${h.color}33` : `1px solid ${BORDER}`,
        }}>
          <div onClick={() => toggle(h)} style={{ width:50, height:50, borderRadius:14, background:`${h.color}22`, border:`1.5px solid ${h.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, cursor:"pointer", flexShrink:0, transition:"all .25s" }}>
            {h.done ? "✅" : h.icon}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:700, color:h.done?"#475569":WHITE, textDecoration:h.done?"line-through":"none" }}>{h.name}</div>
            <div style={{ display:"flex", gap:10, marginTop:4 }}>
              <span style={{ fontSize:12, color:"#fbbf24" }}>🔥 {h.streak}d</span>
              <span style={{ fontSize:12, color:DIM }}>✓ {h.total} done</span>
              <span style={{ fontSize:12, color:h.color, fontWeight:700 }}>+{h.xp} XP</span>
            </div>
            <div style={{ background:"rgba(255,255,255,.06)", borderRadius:4, height:3, marginTop:7, width:"75%", overflow:"hidden" }}>
              <div style={{ width:`${Math.min((h.streak/30)*100,100)}%`, height:"100%", background:h.color }} />
            </div>
          </div>
          <button onClick={() => openEdit(h)} style={{ background:"rgba(255,255,255,.05)", border:`1px solid ${BORDER}`, borderRadius:10, width:34, height:34, cursor:"pointer", fontSize:15 }}>✏️</button>
        </div>
      ))}

      <Sheet open={sheet} onClose={() => setSheet(false)}>
        <h3 style={{ margin:"0 0 18px", fontSize:18, fontWeight:900, color:WHITE }}>{edit?"Edit Habit":"New Habit"}</h3>
        <input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Habit name..." style={inp} />
        <p style={s.label}>ICON</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:16 }}>
          {ICONS2.map(ic=><button key={ic} onClick={()=>setForm(p=>({...p,icon:ic}))} style={{ width:42,height:42,borderRadius:12,fontSize:20,cursor:"pointer",background:form.icon===ic?`${T}33`:"rgba(255,255,255,.05)",border:form.icon===ic?`2px solid ${T}`:`2px solid ${BORDER}` }}>{ic}</button>)}
        </div>
        <p style={s.label}>COLOR</p>
        <div style={{ display:"flex", gap:9, marginBottom:16 }}>
          {COLS.map(c=><button key={c} onClick={()=>setForm(p=>({...p,color:c}))} style={{ width:32,height:32,borderRadius:"50%",background:c,cursor:"pointer",border:"none",outline:form.color===c?"3px solid #fff":"3px solid transparent",outlineOffset:2 }}/>)}
        </div>
        <p style={s.label}>XP REWARD</p>
        <div style={{ display:"flex", gap:8, marginBottom:22 }}>
          {[5,10,15,20,25,30].map(v=><button key={v} onClick={()=>setForm(p=>({...p,xp:v}))} style={{ flex:1,padding:"9px 0",borderRadius:10,cursor:"pointer",fontWeight:800,fontSize:12,background:form.xp===v?T:"rgba(255,255,255,.05)",border:"none",color:form.xp===v?"#000":DIM }}>+{v}</button>)}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          {edit && <button onClick={()=>del(edit.id)} style={{ flex:1,padding:"14px",borderRadius:14,border:"none",background:"rgba(239,68,68,.15)",color:"#ef4444",fontWeight:800,fontSize:14,cursor:"pointer" }}>Delete</button>}
          <button onClick={save} style={{ flex:2,padding:"14px",borderRadius:14,border:"none",background:T,color:"#000",fontWeight:900,fontSize:15,cursor:"pointer" }}>{edit?"Save Changes":"Create Habit"}</button>
        </div>
      </Sheet>
    </div>
  );
}

/* ── PLANNER ── */
function PlannerScreen({ plans, setPlans, showToast }) {
  const [sheet, setSheet] = useState(false);
  const [form, setForm] = useState({ name:"", status:"Active", progress:0 });
  const statuses = ["Active","Draft","Someday","Archived"];
  const statusColors = { Active:T, Draft:"#94a3b8", Someday:"#f59e0b", Archived:"#475569" };

  const save = () => {
    if (!form.name.trim()) return;
    setPlans(p=>[...p,{id:Date.now(),...form,linked:0}]); showToast("Plan created! 💡"); setSheet(false);
    setForm({name:"",status:"Active",progress:0});
  };

  const total   = plans.length;
  const active  = plans.filter(p=>p.status==="Active").length;
  const done    = plans.filter(p=>p.progress>=100).length;

  return (
    <div style={{ padding:"0 16px 100px" }}>
      <div style={{ padding:"52px 0 16px", display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
        <div>
          <p style={{ margin:0, fontSize:12, color:DIM, fontWeight:700, letterSpacing:.7 }}>PLANNER</p>
          <h1 style={{ margin:"4px 0 0", fontSize:26, fontWeight:900, color:WHITE }}>My Plans</h1>
        </div>
        <button onClick={() => setSheet(true)} style={{ background:T, border:"none", borderRadius:14, padding:"10px 20px", color:"#000", fontWeight:800, fontSize:14, cursor:"pointer", boxShadow:`0 4px 16px ${T}55` }}>+ Plan</button>
      </div>

      <div style={{ display:"flex", gap:9, marginBottom:16 }}>
        <StatBox icon="💡" val={total}  label="TOTAL PLANS" />
        <StatBox icon="⚡" val={active} label="ACTIVE" />
        <StatBox icon="✅" val={done}   label="COMPLETED" />
      </div>

      {plans.length===0 && (
        <div style={{ textAlign:"center", padding:"50px 0", color:DIM }}>
          <div style={{ fontSize:48, marginBottom:14 }}>💡</div>
          <div style={{ fontSize:16, fontWeight:700, color:WHITE }}>No plans yet</div>
          <div style={{ fontSize:13, marginTop:6 }}>Create your first plan to get started</div>
        </div>
      )}

      {plans.map(p => {
        const sc = statusColors[p.status]||DIM;
        return (
          <div key={p.id} style={{ ...s.card, marginBottom:12 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <div style={{ fontSize:15, fontWeight:800, color:WHITE, flex:1 }}>💡 {p.name}</div>
              <div style={{ background:`${sc}22`, border:`1px solid ${sc}44`, borderRadius:8, padding:"3px 10px", fontSize:11, fontWeight:800, color:sc, flexShrink:0, marginLeft:10 }}>{p.status}</div>
            </div>
            {p.linked > 0 && <div style={{ fontSize:12, color:DIM, marginBottom:8 }}>🔗 {p.linked} habit{p.linked>1?"s":""} linked</div>}
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ flex:1, background:"rgba(255,255,255,.07)", borderRadius:6, height:8, overflow:"hidden" }}>
                <div style={{ width:`${p.progress}%`, height:"100%", background:T, borderRadius:6, boxShadow:`0 0 8px ${T}66` }} />
              </div>
              <span style={{ fontSize:13, color:T, fontWeight:800, minWidth:36 }}>{p.progress}%</span>
            </div>
          </div>
        );
      })}

      <Sheet open={sheet} onClose={() => setSheet(false)}>
        <h3 style={{ margin:"0 0 18px", fontSize:18, fontWeight:900, color:WHITE }}>New Plan</h3>
        <input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Plan name..." style={inp} />
        <p style={s.label}>STATUS</p>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
          {statuses.map(st=>(
            <button key={st} onClick={()=>setForm(p=>({...p,status:st}))} style={{ background:form.status===st?`${T}22`:"rgba(255,255,255,.05)", border:form.status===st?`1.5px solid ${T}`:`1.5px solid ${BORDER}`, borderRadius:10, padding:"8px 16px", color:form.status===st?T:DIM, fontWeight:700, fontSize:13, cursor:"pointer" }}>{st}</button>
          ))}
        </div>
        <button onClick={save} style={{ width:"100%", padding:"14px", borderRadius:14, border:"none", background:T, color:"#000", fontWeight:900, fontSize:15, cursor:"pointer" }}>Create Plan</button>
      </Sheet>
    </div>
  );
}

/* ── VISION ── */
function VisionScreen() {
  const [visions, setVisions] = useState([
    { id:1, title:"Dream Workspace", emoji:"💻", color:T },
    { id:2, title:"Fitness Goal",    emoji:"💪", color:"#ef4444" },
  ]);
  const [sheet, setSheet] = useState(false);
  const [form, setForm] = useState({title:"", emoji:"🌟"});
  const EMOJIS = ["🌟","💻","💪","🏠","🌍","🎓","💰","❤️","🎵","🌿","🚀","🏆"];

  const save = () => {
    if (!form.title.trim()) return;
    setVisions(p=>[...p,{id:Date.now(),...form,color:T}]); setSheet(false); setForm({title:"",emoji:"🌟"});
  };

  return (
    <div style={{ padding:"0 16px 100px" }}>
      <div style={{ padding:"52px 0 16px", display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
        <div>
          <p style={{ margin:0, fontSize:12, color:DIM, fontWeight:700, letterSpacing:.7 }}>VISION</p>
          <h1 style={{ margin:"4px 0 0", fontSize:26, fontWeight:900, color:WHITE }}>Vision Board</h1>
        </div>
        <button onClick={() => setSheet(true)} style={{ background:T, border:"none", borderRadius:14, padding:"10px 20px", color:"#000", fontWeight:800, fontSize:14, cursor:"pointer", boxShadow:`0 4px 16px ${T}55` }}>+ Vision</button>
      </div>
      <p style={{ margin:"0 0 16px", fontSize:13, color:DIM, lineHeight:1.6 }}>Visualise your future. Add images and goals to your vision board to stay motivated.</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {visions.map(v => (
          <div key={v.id} style={{ background:`${v.color}18`, border:`1.5px solid ${v.color}44`, borderRadius:18, padding:"24px 16px", textAlign:"center", aspectRatio:"1", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
            <div style={{ fontSize:42, marginBottom:12 }}>{v.emoji}</div>
            <div style={{ fontSize:14, fontWeight:800, color:WHITE }}>{v.title}</div>
          </div>
        ))}
        <button onClick={() => setSheet(true)} style={{ background:"rgba(255,255,255,.03)", border:`1.5px dashed ${BORDER}`, borderRadius:18, padding:"24px 16px", textAlign:"center", aspectRatio:"1", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
          <div style={{ fontSize:32, color:DIM }}>+</div>
          <div style={{ fontSize:13, color:DIM, marginTop:8, fontWeight:600 }}>Add Vision</div>
        </button>
      </div>
      <Sheet open={sheet} onClose={() => setSheet(false)}>
        <h3 style={{ margin:"0 0 18px", fontSize:18, fontWeight:900, color:WHITE }}>New Vision</h3>
        <input value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="Vision title..." style={inp} />
        <p style={s.label}>ICON</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
          {EMOJIS.map(ic=><button key={ic} onClick={()=>setForm(p=>({...p,emoji:ic}))} style={{ width:46,height:46,borderRadius:13,fontSize:22,cursor:"pointer",background:form.emoji===ic?`${T}33`:"rgba(255,255,255,.05)",border:form.emoji===ic?`2px solid ${T}`:`2px solid ${BORDER}` }}>{ic}</button>)}
        </div>
        <button onClick={save} style={{ width:"100%", padding:"14px", borderRadius:14, border:"none", background:T, color:"#000", fontWeight:900, fontSize:15, cursor:"pointer" }}>Create Vision</button>
      </Sheet>
    </div>
  );
}

/* ── ACHIEVEMENTS ── */
function AchievementsScreen({ onBack }) {
  const CATS = ["All","Journal","Habits","Planner","Vision","Cross","Consistency","Exploration"];
  const [cat, setCat] = useState("All");
  const unlocked = 1;
  const total = ALL_ACHIEVEMENTS.length;
  const filtered = cat==="All" ? ALL_ACHIEVEMENTS : ALL_ACHIEVEMENTS.filter(a=>a.cat===cat);

  return (
    <div style={{ minHeight:"100vh", background:BG, color:WHITE, fontFamily:"inherit" }}>
      <div style={{ padding:"48px 20px 0", display:"flex", alignItems:"center", gap:14 }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:WHITE, fontSize:24, cursor:"pointer" }}>‹</button>
        <h1 style={{ margin:0, fontSize:24, fontWeight:900, color:WHITE }}>Achievements</h1>
      </div>
      <TabBar tabs={CATS} active={cat} onChange={setCat} />

      {/* progress banner */}
      <div style={{ margin:"0 16px 16px", background:CARD, border:`1px solid ${BORDER}`, borderRadius:16, padding:"16px", display:"flex", alignItems:"center", gap:16, borderLeft:`3px solid ${T}` }}>
        <div style={{ fontSize:32 }}>🔥</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:18, fontWeight:900, color:WHITE }}>{unlocked} of {total} unlocked</div>
          <div style={{ fontSize:12, color:DIM, marginTop:2 }}>Start a streak!</div>
          <div style={{ background:"rgba(255,255,255,.07)", borderRadius:6, height:5, marginTop:8, overflow:"hidden" }}>
            <div style={{ width:`${(unlocked/total)*100}%`, height:"100%", background:T, borderRadius:6 }} />
          </div>
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:12, color:T, fontWeight:700 }}>🏅 New User</div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, padding:"0 16px 100px" }}>
        {filtered.map(a => <AchievementCard key={a.id} a={a} />)}
      </div>
    </div>
  );
}

/* ── ANALYTICS ── */
function AnalyticsScreen({ onBack, habits }) {
  const [mainTab, setMainTab] = useState("Habits");
  const [subTab, setSubTab] = useState("Overview");

  const done  = habits.filter(h=>h.done).length;
  const total = habits.length;
  const best  = Math.max(0,...habits.map(h=>h.streak));

  return (
    <div style={{ minHeight:"100vh", background:BG, color:WHITE, fontFamily:"inherit" }}>
      <PageHeader icon="📊" title="Analytics" onBack={onBack}
        sub={<button style={{ background:`${T}22`, border:`1.5px solid ${T}55`, borderRadius:20, padding:"5px 14px", color:T, fontWeight:700, fontSize:12, cursor:"pointer" }}>📈 INSIGHTS 0</button>}
      />
      <TabBar tabs={["Habits","Plans","Correlations"]} active={mainTab} onChange={t=>{setMainTab(t);setSubTab("Overview");}} />

      {mainTab==="Habits" && (
        <>
          <TabBar tabs={["Overview","Journal","Mood"]} active={subTab} onChange={setSubTab} />
          <div style={{ padding:"0 16px 100px" }}>
            {subTab==="Overview" && (<>
              <div style={{ fontSize:22, fontWeight:900, color:WHITE, margin:"0 0 4px" }}>Overview <span style={{ fontSize:14, color:DIM, fontWeight:600 }}>Last 30 days</span></div>
              <p style={{ color:DIM, fontSize:13, margin:"4px 0 16px" }}>Add a few entries to see your analytics.</p>
              <div style={{ display:"flex", gap:9, marginBottom:16 }}>
                <StatBox icon="📋" val={total} label="TOTAL ENTRIES" />
                <StatBox icon="📅" val={done}  label="ACTIVE DAYS" />
                <StatBox icon="🔥" val={best}  label="CURR. STREAK" />
              </div>
              <div style={{ ...s.card, marginBottom:14 }}>
                <div style={{ fontSize:14, fontWeight:800, color:T, marginBottom:8 }}>📈 Insights</div>
                <div style={{ color:DIM, fontSize:13 }}>Keep logging to unlock insights.</div>
              </div>
              <div style={{ ...s.card }}>
                <div style={{ fontSize:14, fontWeight:800, color:WHITE, marginBottom:8 }}>Activity mix</div>
                <div style={{ color:DIM, fontSize:13 }}>Add a few activities to see your mix.</div>
              </div>
            </>)}
            {subTab==="Journal" && (<>
              <div style={{ display:"flex", gap:9, marginBottom:14 }}>
                <StatBox icon="📝" val={0} label="TOTAL ENTRIES" />
                <StatBox icon="📅" val={0} label="ACTIVE DAYS" />
                <StatBox icon="🔥" val={0} label="CURR. STREAK" />
              </div>
              <div style={{ ...s.card, marginBottom:14 }}>
                <div style={{ fontSize:14, fontWeight:800, color:T, textAlign:"center", marginBottom:8 }}>🏆 Streak Information</div>
                <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:12 }}>
                  {[["Longest Streak","0 days"],["Current Streak","0 days"],["Average Gap","0.0 days"]].map(([l,v])=>(
                    <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${BORDER}` }}>
                      <span style={{ fontSize:14, color:WHITE }}>{l}</span>
                      <span style={{ fontSize:14, color:DIM }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...s.card, marginBottom:14 }}>
                <div style={{ fontSize:14, fontWeight:800, color:T, textAlign:"center", marginBottom:10 }}>📈 Frequency Trend</div>
                <div style={{ textAlign:"center", color:DIM, fontSize:13 }}>→ Stable</div>
              </div>
              <div style={{ ...s.card, marginBottom:14 }}>
                <div style={{ fontSize:14, fontWeight:800, color:T, textAlign:"center", marginBottom:10 }}>📊 Weekly trend</div>
                <div style={{ color:DIM, fontSize:13 }}>Not enough data to chart yet.</div>
              </div>
            </>)}
            {subTab==="Mood" && (<>
              <div style={{ display:"flex", gap:9, marginBottom:14 }}>
                <StatBox icon="😊" val={0}      label="MOOD ENTRIES" />
                <StatBox icon="⭐" val="None"   label="DOMINANT MOOD" />
                <StatBox icon="〰️" val="0%"     label="VOLATILITY" />
              </div>
              <div style={{ ...s.card, marginBottom:14 }}>
                <div style={{ fontSize:14, fontWeight:800, color:T, textAlign:"center", marginBottom:12 }}>→ Trend & Stability</div>
                <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:12 }}>
                  {[["Trend Direction","→ Stable"],["Consecutive Same Mood","0"]].map(([l,v])=>(
                    <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${BORDER}` }}>
                      <span style={{ fontSize:14, color:WHITE }}>{l}</span>
                      <span style={{ fontSize:14, color:DIM }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...s.card }}>
                <div style={{ fontSize:14, fontWeight:800, color:T, textAlign:"center", marginBottom:10 }}>📊 Mood distribution</div>
                <div style={{ color:DIM, fontSize:13 }}>Not enough data to chart yet.</div>
              </div>
            </>)}
          </div>
        </>
      )}

      {mainTab==="Plans" && (
        <>
          <TabBar tabs={["Overview","Journal","Mood"]} active={subTab} onChange={setSubTab}/>
          <div style={{ padding:"0 16px 100px" }}>
            <div style={{ display:"flex", gap:9, marginBottom:14 }}>
              <StatBox icon="💡" val={0} label="TOTAL PLANS" />
              <StatBox icon="⚡" val={0} label="ACTIVE" />
              <StatBox icon="✅" val={0} label="COMPLETED" />
            </div>
            <div style={{ ...s.card, marginBottom:14 }}>
              <div style={{ fontSize:14, fontWeight:800, color:T, textAlign:"center", marginBottom:12 }}>📈 Plan Lifecycle</div>
              <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:12 }}>
                {[["Completed","0 (0%)"],["Active","0"],["Inbox","0"],["Draft","0"],["Someday","0"],["Archived","0"]].map(([l,v])=>(
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${BORDER}` }}>
                    <span style={{ fontSize:14, color:WHITE }}>{l}</span>
                    <span style={{ fontSize:14, color:DIM }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ ...s.card }}>
              <div style={{ fontSize:14, fontWeight:800, color:T, textAlign:"center", marginBottom:12 }}>✏️ Engagement</div>
              <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:12 }}>
                {[["Plans Edited","0"],["Never Edited","0"],["Maturity Score","0%"]].map(([l,v])=>(
                  <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${BORDER}` }}>
                    <span style={{ fontSize:14, color:WHITE }}>{l}</span>
                    <span style={{ fontSize:14, color:DIM }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {mainTab==="Correlations" && (
        <div style={{ padding:"0 16px 100px" }}>
          <div style={{ ...s.card, marginBottom:14 }}>
            <div style={{ fontSize:14, fontWeight:800, color:T, textAlign:"center", marginBottom:12 }}>↔️ Journal ↔ Habits</div>
            <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:12 }}>
              {[["Habit completion on journal days","0%"],["Journal frequency on habit days","0%"]].map(([l,v])=>(
                <div key={l} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontSize:13, color:WHITE }}>{l}</span>
                    <span style={{ fontSize:13, color:T, fontWeight:700 }}>{v}</span>
                  </div>
                  <div style={{ background:"rgba(255,255,255,.07)", borderRadius:4, height:5 }}/>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...s.card }}>
            <div style={{ fontSize:14, fontWeight:800, color:T, textAlign:"center", marginBottom:12 }}>🕸️ Plans → Outcomes</div>
            <div style={{ borderTop:`1px solid ${BORDER}`, paddingTop:12 }}>
              {[["Plans → Habits","0 (0%)"],["Plans → Vision","0 (0%)"],["Linked Habit Success Boost","0.0"]].map(([l,v])=>(
                <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${BORDER}` }}>
                  <span style={{ fontSize:14, color:WHITE }}>{l}</span>
                  <span style={{ fontSize:14, color:DIM }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── SETTINGS ── */
function SettingsScreen({ onBack }) {
  return (
    <div style={{ minHeight:"100vh", background:BG, color:WHITE, fontFamily:"inherit" }}>
      <PageHeader icon="⚙️" title="Settings" onBack={onBack} />
      <div style={{ padding:"0 16px 100px" }}>
        {SETTINGS_SECTIONS.map(sec => (
          <div key={sec.section} style={{ ...s.card, marginBottom:14 }}>
            {/* section header */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14, paddingBottom:12, borderBottom:`1px solid ${BORDER}` }}>
              <div style={{ width:36, height:36, borderRadius:10, background:`${T}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{sec.icon}</div>
              <span style={{ fontSize:16, fontWeight:800, color:WHITE }}>{sec.section}</span>
            </div>
            {sec.items.map((item, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 0", borderBottom: i<sec.items.length-1 ? `1px solid ${BORDER}` : "none" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:600, color: item.red ? "#ef4444" : item.italic ? DIM : WHITE, fontStyle: item.italic ? "italic" : "normal" }}>{item.label}</div>
                  {item.sub && <div style={{ fontSize:12, color:DIM, marginTop:2 }}>{item.sub}</div>}
                </div>
                {item.arrow  && <span style={{ color:DIM, fontSize:18 }}>›</span>}
                {item.edit   && <span style={{ color:T,   fontSize:18 }}>✏</span>}
                {item.toggle && <div style={{ width:44, height:26, borderRadius:13, background: item.val ? T : "#333", position:"relative", cursor:"pointer", opacity: item.disabled ? .4 : 1 }}><div style={{ position:"absolute", top:3, left: item.val ? 21 : 3, width:20, height:20, borderRadius:"50%", background:"#fff", transition:"left .2s" }}/></div>}
                {item.radio  && <div style={{ width:22, height:22, borderRadius:"50%", border: item.selected ? `6px solid ${T}` : `2px solid ${DIM}` }} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ROOT
══════════════════════════════════════════ */
export default function LumivoApp() {
  const [tab, setTab]         = useState("Home");
  const [overlay, setOverlay] = useState(null); // "achievements" | "analytics" | "settings"
  const [habits, setHabits]   = useState(INIT_HABITS);
  const [plans,  setPlans]    = useState(INIT_PLANS);
  const [toast,  setToast]    = useState(null);
  const tRef = useRef(null);

  const showToast = (msg, color=T) => {
    clearTimeout(tRef.current);
    setToast({ msg, color });
    tRef.current = setTimeout(() => setToast(null), 2400);
  };

  const TABS = [
    { id:"Home",    icon:"🏠", label:"Home"    },
    { id:"Journal", icon:"📖", label:"Journal"  },
    { id:"Habits",  icon:"✅", label:"Habits"   },
    { id:"Planner", icon:"💡", label:"Planner"  },
    { id:"Vision",  icon:"🔲", label:"Vision"   },
  ];

  if (overlay === "achievements") return <AchievementsScreen onBack={() => setOverlay(null)} />;
  if (overlay === "analytics")    return <AnalyticsScreen    onBack={() => setOverlay(null)} habits={habits} />;
  if (overlay === "settings")     return <SettingsScreen     onBack={() => setOverlay(null)} />;

  return (
    <div style={{ minHeight:"100vh", background:BG, fontFamily:"'Inter',system-ui,sans-serif", color:WHITE, maxWidth:430, margin:"0 auto", position:"relative" }}>
      <Toast t={toast} />

      {/* top-right actions */}
      <div style={{ position:"fixed", top:14, right:16, display:"flex", gap:8, zIndex:50 }}>
        <button onClick={() => setOverlay("analytics")} style={{ background:"rgba(45,212,191,.12)", border:`1px solid ${T}33`, borderRadius:10, width:36, height:36, cursor:"pointer", fontSize:16, color:T }}>📊</button>
        <button onClick={() => setOverlay("achievements")} style={{ background:"rgba(45,212,191,.12)", border:`1px solid ${T}33`, borderRadius:10, width:36, height:36, cursor:"pointer", fontSize:16, color:T }}>🏆</button>
        <button onClick={() => setOverlay("settings")} style={{ background:"rgba(45,212,191,.12)", border:`1px solid ${T}33`, borderRadius:10, width:36, height:36, cursor:"pointer", fontSize:16, color:T }}>⚙️</button>
      </div>

      {/* content */}
      {tab==="Home"    && <HomeScreen    habits={habits} journal={[]} plans={plans}  onTabChange={setTab} />}
      {tab==="Journal" && <JournalScreen />}
      {tab==="Habits"  && <HabitsScreen  habits={habits}  setHabits={setHabits}  showToast={showToast} />}
      {tab==="Planner" && <PlannerScreen plans={plans}    setPlans={setPlans}    showToast={showToast} />}
      {tab==="Vision"  && <VisionScreen />}

      {/* bottom nav */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"rgba(0,0,0,.97)", backdropFilter:"blur(24px)", borderTop:`1px solid ${BORDER}`, padding:"10px 0 24px", display:"flex" }}>
        {TABS.map(t => <NavIcon key={t.id} icon={t.icon} label={t.label} active={tab===t.id} onClick={() => setTab(t.id)} />)}
      </div>

      <style>{`
        @keyframes tIn { from{opacity:0;transform:translateX(-50%) translateY(-12px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
        *{-webkit-tap-highlight-color:transparent;box-sizing:border-box;}
        input,button,textarea{font-family:inherit;}
        input::placeholder,textarea::placeholder{color:#334155;}
        input:focus,textarea:focus{outline:none;border-color:${T}!important;}
        ::-webkit-scrollbar{width:0;height:0;}
      `}</style>
    </div>
  );
}
