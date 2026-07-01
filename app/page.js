'use client';

import { useState } from 'react';

// ─── Data ──────────────────────────────────────────────────────────────────────

const STUDENT_NAME = 'Maya Okonkwo';
const STUDENT_ROLE = 'Product Designer';
const STUDENT_COHORT = 'Cohort 04 · S/S 25';
const STREAK_DAYS = 12;

const MODULES = [
  { name: 'Foundations of AI Prototyping', pct: 100 },
  { name: 'Prompting & Iteration', pct: 100 },
  { name: 'Working with Components', pct: 72 },
  { name: 'Data, State & Logic', pct: 40 },
  { name: 'Interaction & Motion', pct: 0 },
  { name: 'Shipping a Prototype', pct: 0 },
];

const HOMEWORK = [
  { title: 'M1 — Concept brief', status: 'Graded', meta: 'Submitted May 2 · A' },
  { title: 'M2 — Prompt set', status: 'Graded', meta: 'Submitted May 14 · A−' },
  { title: 'M3 — Component kit', status: 'In review', meta: 'Submitted May 28' },
  { title: 'M4 — State demo', status: 'Not started', meta: 'Due Jun 20' },
];

const FIELDS = [
  { id: 'email', label: 'EMAIL', value: 'maya.okonkwo@studio.co' },
  { id: 'location', label: 'LOCATION', value: 'Lisbon, PT' },
  { id: 'role', label: 'ROLE', value: 'Product Designer' },
  { id: 'timezone', label: 'TIMEZONE', value: 'WET · UTC+1' },
];

// ─── Design tokens (see DESIGN.md) ───────────────────────────────────────────────

const C = {
  primary: '#533afd',
  primaryDeep: '#4434d4',
  primaryPress: '#2e2b8c',
  primarySoft: '#665efd',
  primarySubdued: '#b9b9f9',
  brandDark: '#1c1e54',
  ruby: '#ea2261',
  canvas: '#ffffff',
  canvasSoft: '#f6f9fc',
  hairline: '#e3e8ee',
  hairlineInput: '#a8c3de',
  ink: '#0d253d',
  inkSecondary: '#273951',
  inkMute: '#64748d',
  onPrimary: '#ffffff',
};

const FONT = "var(--font-inter), 'SF Pro Display', system-ui, -apple-system, sans-serif";
const TNUM = '"tnum"';
const SHADOW_1 = 'rgba(0,55,112,0.08) 0 1px 3px';
const SHADOW_2 = 'rgba(0,55,112,0.08) 0 8px 24px, rgba(0,55,112,0.04) 0 2px 6px';

// Indigo heatmap ramp — light → primary (DESIGN.md: ruby/indigo are accent, never buttons).
const LEVEL_BG = ['#eef0fb', '#c9c6fb', '#8b84fc', C.primary];

const INITIALS = STUDENT_NAME
  .split(/\s+/)
  .filter(Boolean)
  .map((w) => w[0])
  .slice(0, 2)
  .join('')
  .toUpperCase();

const OVERALL = Math.round(MODULES.reduce((s, m) => s + m.pct, 0) / MODULES.length);

// Status → indigo/navy scale dot.
const STATUS_DOT = {
  Graded: C.primary,
  Submitted: C.primarySoft,
  'In review': C.primarySubdued,
  'Not started': C.hairline,
};

const STATUS_ACTIVE = new Set(['Graded', 'Submitted', 'In review']);

function buildCells(weeks, seed) {
  const cells = [];
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < 7; d++) {
      const v = Math.sin((w * 7 + d + seed) * 12.9898) * 43758.5453;
      const f = v - Math.floor(v);
      cells.push(LEVEL_BG[f < 0.46 ? 0 : f < 0.72 ? 1 : f < 0.9 ? 2 : 3]);
    }
  }
  return cells;
}

const CELLS_FULL = buildCells(17, 3);
const CELLS_MINI = buildCells(8, 9);

// Signature gradient mesh — cream / sherbet / lavender / indigo / ruby washed
// horizontally across the upper third of the page (DESIGN.md). Approximated with
// layered radial gradients.
const MESH = `
  radial-gradient(60% 140% at 8% -10%, #f5e9d4 0%, rgba(245,233,212,0) 55%),
  radial-gradient(55% 150% at 34% -20%, rgba(249,107,238,0.30) 0%, rgba(249,107,238,0) 55%),
  radial-gradient(55% 150% at 58% -25%, rgba(185,185,249,0.65) 0%, rgba(185,185,249,0) 58%),
  radial-gradient(55% 160% at 80% -25%, rgba(83,58,253,0.38) 0%, rgba(83,58,253,0) 58%),
  radial-gradient(55% 150% at 102% -15%, rgba(234,34,97,0.28) 0%, rgba(234,34,97,0) 55%)
`;

// ─── Components ────────────────────────────────────────────────────────────────

function AvatarCircle({ size, fontSize }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: C.primarySubdued,
        border: `1px solid ${C.primarySoft}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{ fontFamily: FONT, fontWeight: 400, fontSize, lineHeight: 1, color: C.primaryDeep }}>
        {INITIALS}
      </span>
    </div>
  );
}

function PencilIcon() {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke={C.hairlineInput}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

// Eyebrow / all-caps micro label (typography.micro-cap).
function Eyebrow({ children, style }) {
  return (
    <span
      style={{
        fontFamily: FONT,
        fontWeight: 400,
        fontSize: 10,
        lineHeight: 1.15,
        letterSpacing: '0.1px',
        textTransform: 'uppercase',
        color: C.inkMute,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function EditableField({ label, defaultValue }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Eyebrow>{label}</Eyebrow>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          ...(focused
            ? {
                border: `1px solid ${C.primary}`,
                borderRadius: 6,
                padding: '8px 12px',
                boxShadow: `0 0 0 3px rgba(83,58,253,0.14)`,
              }
            : { borderBottom: `1px dashed ${C.hairline}`, paddingBottom: 6 }),
        }}
      >
        <span
          contentEditable
          suppressContentEditableWarning
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            fontFamily: FONT,
            fontWeight: 300,
            fontSize: 15,
            lineHeight: 1.4,
            color: C.ink,
            outline: 'none',
            flex: 1,
            minWidth: 0,
          }}
        >
          {defaultValue}
        </span>
        {!focused && <PencilIcon />}
      </div>
    </div>
  );
}

function ModuleRow({ name, pct }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <span style={{ fontFamily: FONT, fontWeight: 300, fontSize: 14, lineHeight: 1.3, color: C.ink }}>
          {name}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: 13,
            lineHeight: 1,
            letterSpacing: '-0.39px',
            color: C.inkMute,
            flexShrink: 0,
            fontFeatureSettings: TNUM,
          }}
        >
          {pct}%
        </span>
      </div>
      <div style={{ height: 8, background: C.hairline, borderRadius: 9999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: C.primary, borderRadius: 9999 }} />
      </div>
    </div>
  );
}

function HomeworkRow({ title, status, meta }) {
  const active = STATUS_ACTIVE.has(status);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '11px 0',
        borderBottom: `1px solid ${C.hairline}`,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: STATUS_DOT[status] ?? C.hairline,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 300,
            fontSize: 14,
            lineHeight: 1.3,
            color: C.ink,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 300,
            fontSize: 12,
            lineHeight: 1.3,
            color: C.inkMute,
            marginTop: 2,
            fontFeatureSettings: TNUM,
          }}
        >
          {meta}
        </div>
      </div>
      <span
        style={{
          fontFamily: FONT,
          fontWeight: 400,
          fontSize: 10,
          lineHeight: 1.15,
          letterSpacing: '0.1px',
          textTransform: 'uppercase',
          color: active ? C.primaryDeep : C.inkMute,
          background: active ? C.primarySubdued : C.canvasSoft,
          border: active ? 'none' : `1px solid ${C.hairline}`,
          borderRadius: 9999,
          padding: '5px 9px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        {status}
      </span>
    </div>
  );
}

function ActivityGrid({ cells }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(7, 11px)',
          gridAutoFlow: 'column',
          gridAutoColumns: '11px',
          gap: 3,
          width: 'max-content',
        }}
      >
        {cells.map((bg, i) => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: 2, background: bg }} />
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: FONT,
          fontWeight: 300,
          fontSize: 11,
          lineHeight: 1,
          color: C.inkMute,
        }}
      >
        <span>Less</span>
        {LEVEL_BG.map((bg, i) => (
          <div key={i} style={{ width: 9, height: 9, borderRadius: 2, background: bg }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: C.canvas,
        border: `1px solid ${C.hairline}`,
        borderRadius: 12,
        padding: 24,
        boxShadow: SHADOW_1,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CardHeading({ children, right, mb = 16 }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: mb,
      }}
    >
      <span style={{ fontFamily: FONT, fontWeight: 300, fontSize: 18, lineHeight: 1.1, letterSpacing: '-0.18px', color: C.ink }}>
        {children}
      </span>
      {right && (
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 300,
            fontSize: 13,
            lineHeight: 1,
            letterSpacing: '-0.39px',
            color: C.inkMute,
            fontFeatureSettings: TNUM,
          }}
        >
          {right}
        </span>
      )}
    </div>
  );
}

// Big numeric stat (display-md, weight 300, negative tracking, tabular figures).
function Stat({ value, label, align = 'right' }) {
  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 300,
          fontSize: 26,
          lineHeight: 1,
          letterSpacing: '-0.26px',
          color: C.ink,
          fontFeatureSettings: TNUM,
        }}
      >
        {value}
      </div>
      <Eyebrow style={{ display: 'block', marginTop: 4 }}>{label}</Eyebrow>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function UserProfilePage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: C.canvasSoft, fontFamily: FONT }}>
      {/* Signature gradient mesh band across the upper third. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 320,
          background: MESH,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', padding: 18, maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Mobile: identity + stats cards (hidden ≥ lg) ─────────────────── */}
        <div className="flex flex-col gap-[14px] mb-[14px] lg:hidden">
          {/* Identity */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 13,
              background: C.canvas,
              border: `1px solid ${C.hairline}`,
              borderRadius: 12,
              padding: '14px 16px',
              boxShadow: SHADOW_1,
            }}
          >
            <AvatarCircle size={46} fontSize={15} />
            <div>
              <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: 18, lineHeight: 1.2, letterSpacing: '-0.18px', color: C.ink }}>
                {STUDENT_NAME}
              </div>
              <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: 12, lineHeight: 1.3, color: C.inkMute, marginTop: 2 }}>
                {STUDENT_COHORT}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: 14,
              background: C.canvas,
              border: `1px solid ${C.hairline}`,
              borderRadius: 12,
              padding: '14px 16px',
              boxShadow: SHADOW_1,
            }}
          >
            <div style={{ flex: 1 }}>
              <Stat value={`${OVERALL}%`} label="Complete" align="center" />
            </div>
            <div style={{ width: 1, background: C.hairline }} />
            <div style={{ flex: 1 }}>
              <Stat value={STREAK_DAYS} label="Streak" align="center" />
            </div>
          </div>
        </div>

        {/* ── Desktop: unified top strip (hidden < lg) ─────────────────────── */}
        <div
          className="hidden lg:flex"
          style={{
            alignItems: 'center',
            gap: 16,
            background: C.canvas,
            border: `1px solid ${C.hairline}`,
            borderRadius: 12,
            padding: '16px 20px',
            marginBottom: 18,
            boxShadow: SHADOW_2,
          }}
        >
          <AvatarCircle size={54} fontSize={18} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: 22, lineHeight: 1.1, letterSpacing: '-0.22px', color: C.ink }}>
              {STUDENT_NAME}
            </div>
            <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: 13, lineHeight: 1.4, color: C.inkMute, marginTop: 2 }}>
              {STUDENT_ROLE} · {STUDENT_COHORT}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Stat value={`${OVERALL}%`} label="Complete" />
            <Stat value={STREAK_DAYS} label="Day streak" />
            <button
              style={{
                fontFamily: FONT,
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1,
                color: C.onPrimary,
                border: 'none',
                borderRadius: 9999,
                padding: '8px 16px',
                background: C.primary,
                cursor: 'pointer',
              }}
            >
              Edit profile
            </button>
          </div>
        </div>

        {/* ── Main bento grid (desktop) / stacked (mobile) ─────────────────── */}
        <div className="flex flex-col gap-[14px] lg:grid lg:grid-cols-[336px_1fr] lg:gap-[18px] lg:items-start">

          {/* ── Personal Information ── */}
          <Card>
            <CardHeading>Personal information</CardHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              {FIELDS.map((f) => (
                <EditableField key={f.id} label={f.label} defaultValue={f.value} />
              ))}
            </div>
          </Card>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-[14px] lg:gap-[18px]">

            {/* Module Progress */}
            <Card>
              <CardHeading right={`${OVERALL}% overall`}>Module progress</CardHeading>

              {/* Mobile: all 6 stacked */}
              <div className="flex flex-col gap-[13px] lg:hidden">
                {MODULES.map((m) => (
                  <ModuleRow key={m.name} name={m.name} pct={m.pct} />
                ))}
              </div>

              {/* Desktop: 2-column split (3 left, 3 right) */}
              <div className="hidden lg:grid lg:grid-cols-2 lg:gap-x-[36px] lg:gap-y-[13px]">
                <div className="flex flex-col gap-[13px]">
                  {MODULES.slice(0, 3).map((m) => (
                    <ModuleRow key={m.name} name={m.name} pct={m.pct} />
                  ))}
                </div>
                <div className="flex flex-col gap-[13px]">
                  {MODULES.slice(3).map((m) => (
                    <ModuleRow key={m.name} name={m.name} pct={m.pct} />
                  ))}
                </div>
              </div>
            </Card>

            {/* Homework + Activity */}
            <div className="flex flex-col gap-[14px] lg:grid lg:grid-cols-[1.3fr_1fr] lg:gap-[18px]">

              <Card>
                <CardHeading mb={6}>Homework</CardHeading>
                {HOMEWORK.map((h) => (
                  <HomeworkRow key={h.title} title={h.title} status={h.status} meta={h.meta} />
                ))}
              </Card>

              <Card>
                <CardHeading>Activity</CardHeading>
                <div className="hidden lg:block">
                  <ActivityGrid cells={CELLS_FULL} />
                </div>
                <div className="lg:hidden">
                  <ActivityGrid cells={CELLS_MINI} />
                </div>
              </Card>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
