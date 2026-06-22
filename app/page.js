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

// ─── Constants ─────────────────────────────────────────────────────────────────

const ACCENT = '#2E6CF0';
const ACCENT_SOFT = 'rgba(46,108,240,0.14)';

const INITIALS = STUDENT_NAME
  .split(/\s+/)
  .filter(Boolean)
  .map((w) => w[0])
  .slice(0, 2)
  .join('')
  .toUpperCase();

const OVERALL = Math.round(MODULES.reduce((s, m) => s + m.pct, 0) / MODULES.length);

const STATUS_DOT = {
  Graded: '#3A3A3E',
  Submitted: '#6A6A70',
  'In review': '#9A9AA0',
  'Not started': '#D2D2D6',
};

const LEVEL_BG = ['#EFEFF1', '#CFCFD4', '#9A9AA2', '#5C5C63'];

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

// ─── Components ────────────────────────────────────────────────────────────────

const FONT = "var(--font-poppins, 'Poppins'), sans-serif";

function AvatarCircle({ size, fontSize }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#DDDDE0',
        border: '1px solid #D2D2D6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{ fontFamily: FONT, fontWeight: 300, fontSize, lineHeight: 1, color: '#8A8A90' }}>
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
      stroke="#CACAD0"
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

function EditableField({ label, defaultValue }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span
        style={{
          fontFamily: FONT,
          fontWeight: 600,
          fontSize: 9,
          lineHeight: 1,
          letterSpacing: '0.1em',
          color: '#AEAEB4',
        }}
      >
        {label}
      </span>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          ...(focused
            ? {
                border: `1px solid ${ACCENT}`,
                borderRadius: 6,
                padding: '8px 10px',
                boxShadow: `0 0 0 3px ${ACCENT_SOFT}`,
              }
            : { borderBottom: '1px dashed #DCDCE0', paddingBottom: 6 }),
        }}
      >
        <span
          contentEditable
          suppressContentEditableWarning
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            fontFamily: FONT,
            fontWeight: 400,
            fontSize: 13,
            lineHeight: 1.4,
            color: '#3A3A3E',
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
        <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: 13, lineHeight: 1.3, color: '#2A2A2E' }}>
          {name}
        </span>
        <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: 12, lineHeight: 1, color: '#9A9AA0', flexShrink: 0 }}>
          {pct}%
        </span>
      </div>
      <div style={{ height: 8, background: '#ECECEE', borderRadius: 9999, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: '#3A3A3E', borderRadius: 9999 }} />
      </div>
    </div>
  );
}

function HomeworkRow({ title, status, meta }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '11px 0',
        borderBottom: '1px solid #EDEDEF',
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: STATUS_DOT[status] ?? '#D2D2D6',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: 12.5,
            lineHeight: 1.3,
            color: '#2A2A2E',
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
            fontWeight: 400,
            fontSize: 11,
            lineHeight: 1.3,
            color: '#A0A0A6',
            marginTop: 2,
          }}
        >
          {meta}
        </div>
      </div>
      <span
        style={{
          fontFamily: FONT,
          fontWeight: 500,
          fontSize: 9.5,
          lineHeight: 1,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: '#5A5A60',
          background: '#F2F2F4',
          border: '1px solid #E4E4E6',
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
          fontWeight: 400,
          fontSize: 10,
          lineHeight: 1,
          color: '#A8A8AE',
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
        background: '#fff',
        border: '1px solid #EAEAEC',
        borderRadius: 8,
        padding: 22,
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
      <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: 13, lineHeight: 1, color: '#2A2A2E' }}>
        {children}
      </span>
      {right && (
        <span style={{ fontFamily: FONT, fontWeight: 400, fontSize: 11.5, lineHeight: 1, color: '#A0A0A6' }}>
          {right}
        </span>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function UserProfilePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#87CEEB', fontFamily: FONT }}>
      <div style={{ padding: 18 }}>

        {/* ── Mobile: identity + stats cards (hidden ≥ lg) ─────────────────── */}
        <div className="flex flex-col gap-[14px] mb-[14px] lg:hidden">
          {/* Identity */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 13,
              background: '#fff',
              border: '1px solid #EAEAEC',
              borderRadius: 8,
              padding: '14px 16px',
            }}
          >
            <AvatarCircle size={46} fontSize={15} />
            <div>
              <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: 15, lineHeight: 1.2, color: '#1C1C1E' }}>
                {STUDENT_NAME}
              </div>
              <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: 11, lineHeight: 1.3, color: '#8A8A90', marginTop: 2 }}>
                {STUDENT_COHORT}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: 14,
              background: '#fff',
              border: '1px solid #EAEAEC',
              borderRadius: 8,
              padding: '14px 16px',
            }}
          >
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: 22, lineHeight: 1, color: '#1C1C1E' }}>
                {OVERALL}%
              </div>
              <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 7.5, lineHeight: 1, letterSpacing: '0.1em', color: '#AEAEB4', marginTop: 4 }}>
                COMPLETE
              </div>
            </div>
            <div style={{ width: 1, background: '#ECECEE' }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: 22, lineHeight: 1, color: '#1C1C1E' }}>
                {STREAK_DAYS}
              </div>
              <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 7.5, lineHeight: 1, letterSpacing: '0.1em', color: '#AEAEB4', marginTop: 4 }}>
                STREAK
              </div>
            </div>
          </div>
        </div>

        {/* ── Desktop: unified top strip (hidden < lg) ─────────────────────── */}
        <div
          className="hidden lg:flex"
          style={{
            alignItems: 'center',
            gap: 16,
            background: '#fff',
            border: '1px solid #EAEAEC',
            borderRadius: 8,
            padding: '16px 20px',
            marginBottom: 18,
          }}
        >
          <AvatarCircle size={54} fontSize={18} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: 18, lineHeight: 1.2, color: '#1C1C1E' }}>
              {STUDENT_NAME}
            </div>
            <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: 12, lineHeight: 1.4, color: '#8A8A90', marginTop: 2 }}>
              {STUDENT_ROLE} · {STUDENT_COHORT}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: 26, lineHeight: 1, color: '#1C1C1E' }}>
                {OVERALL}%
              </div>
              <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 8, lineHeight: 1, letterSpacing: '0.1em', color: '#AEAEB4', marginTop: 4 }}>
                COMPLETE
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: 26, lineHeight: 1, color: '#1C1C1E' }}>
                {STREAK_DAYS}
              </div>
              <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 8, lineHeight: 1, letterSpacing: '0.1em', color: '#AEAEB4', marginTop: 4 }}>
                DAY STREAK
              </div>
            </div>
            <button
              style={{
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: 11,
                lineHeight: 1,
                color: ACCENT,
                border: `1px solid ${ACCENT}`,
                borderRadius: 9999,
                padding: '8px 16px',
                background: 'none',
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
