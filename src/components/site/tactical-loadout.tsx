"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Input, Switch } from "@/components/ui";

const loadouts = [
  {
    id: "actions",
    number: "01",
    title: "Action controls",
    slug: "button",
    description: "Clear primary, secondary, and destructive actions with physical press feedback.",
    version: "BTN.04",
  },
  {
    id: "fields",
    number: "02",
    title: "Field systems",
    slug: "field",
    description: "Label, input, guidance, and validation assembled into one predictable structure.",
    version: "FLD.07",
  },
  {
    id: "command",
    number: "03",
    title: "Command menu",
    slug: "command",
    description: "Fast searchable navigation built for keyboard-led product workflows.",
    version: "CMD.02",
  },
  {
    id: "feedback",
    number: "04",
    title: "Focused feedback",
    slug: "modal",
    description: "Interrupt only when the decision matters, with managed focus and clear exits.",
    version: "MDL.05",
  },
] as const;

type LoadoutId = (typeof loadouts)[number]["id"];

function Preview({ active }: { active: LoadoutId }) {
  if (active === "fields") {
    return (
      <div className="tactical-preview-form">
        <label htmlFor="callsign">Operator callsign</label>
        <Input id="callsign" defaultValue="MAYA-07" aria-describedby="callsign-hint" />
        <p id="callsign-hint">Visible to members of this deployment.</p>
        <div className="tactical-preview-setting">
          <div>
            <strong>Secure notifications</strong>
            <span>Receive verified status reports only.</span>
          </div>
          <Switch defaultChecked aria-label="Secure notifications" size="sm" />
        </div>
      </div>
    );
  }

  if (active === "command") {
    return (
      <div className="tactical-command-demo">
        <div className="tactical-command-input">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m14.5 14.5 5 5" /></svg>
          <span>Search operations...</span>
          <kbd>⌘ K</kbd>
        </div>
        <div className="tactical-command-group">
          <span>Quick access</span>
          <button type="button" className="is-selected"><b>01</b> Open component catalog <i>↵</i></button>
          <button type="button"><b>02</b> Read installation guide <i>↵</i></button>
          <button type="button"><b>03</b> Inspect design tokens <i>↵</i></button>
        </div>
      </div>
    );
  }

  if (active === "feedback") {
    return (
      <div className="tactical-dialog-demo">
        <div className="tactical-dialog-topline">
          <span>Confirmation required</span>
          <b>×</b>
        </div>
        <div className="tactical-dialog-body">
          <span className="tactical-dialog-code">ACTION / 04</span>
          <h3>Deploy component changes?</h3>
          <p>This operation updates the selected interface package. You can revert from source control.</p>
        </div>
        <div className="tactical-dialog-actions">
          <Button variant="ghost">Stand down</Button>
          <Button variant="primary">Confirm deploy</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="tactical-action-demo">
      <span className="tactical-preview-label">Primary action</span>
      <Button variant="primary" size="lg">Initialize system</Button>
      <span className="tactical-preview-label">Secondary action</span>
      <Button variant="outline" size="lg">Inspect manifest</Button>
      <span className="tactical-preview-label">Destructive action</span>
      <Button variant="danger" size="lg">Abort deployment</Button>
    </div>
  );
}

export function TacticalLoadout() {
  const [active, setActive] = useState<LoadoutId>("actions");
  const selected = loadouts.find((loadout) => loadout.id === active) ?? loadouts[0];

  return (
    <div className="tactical-loadout">
      <div className="tactical-loadout-list" role="tablist" aria-label="Essential component loadout">
        {loadouts.map((loadout) => {
          const isActive = loadout.id === active;
          return (
            <button
              key={loadout.id}
              type="button"
              role="tab"
              id={`loadout-tab-${loadout.id}`}
              aria-selected={isActive}
              aria-controls="loadout-preview"
              tabIndex={isActive ? 0 : -1}
              className={isActive ? "is-active" : ""}
              onClick={() => setActive(loadout.id)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
                event.preventDefault();
                const currentIndex = loadouts.findIndex((item) => item.id === active);
                const direction = event.key === "ArrowDown" ? 1 : -1;
                const nextIndex = (currentIndex + direction + loadouts.length) % loadouts.length;
                setActive(loadouts[nextIndex].id);
                document.getElementById(`loadout-tab-${loadouts[nextIndex].id}`)?.focus();
              }}
            >
              <span>{loadout.number}</span>
              <div>
                <strong>{loadout.title}</strong>
                <small>{loadout.description}</small>
              </div>
              <b aria-hidden="true">{isActive ? "SELECTED" : "+"}</b>
            </button>
          );
        })}
      </div>

      <div
        id="loadout-preview"
        role="tabpanel"
        aria-labelledby={`loadout-tab-${active}`}
        className="tactical-preview"
      >
        <div className="tactical-preview-bar">
          <span>LIVE PRIMITIVE</span>
          <span>{selected.version}</span>
          <i><b /> OPERATIONAL</i>
        </div>
        <div className="tactical-preview-stage">
          <div className="tactical-preview-grid" />
          <div className="tactical-preview-content">
            <p>{selected.number} / {selected.title}</p>
            <Preview active={active} />
          </div>
          <span className="tactical-corner tactical-corner-a" />
          <span className="tactical-corner tactical-corner-b" />
          <span className="tactical-corner tactical-corner-c" />
          <span className="tactical-corner tactical-corner-d" />
        </div>
        <div className="tactical-preview-footer">
          <span>Source reviewed / Keyboard ready</span>
          <Link href={`/docs/components/${selected.slug}`}>Open specification →</Link>
        </div>
      </div>
    </div>
  );
}
