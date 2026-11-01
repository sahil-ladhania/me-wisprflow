"use client";

import { useState } from "react";
import { cx } from "@/lib/cx";
import type { Exhaust } from "@/lib/ride/engine-sound";
import { Icon } from "./Icon";
import styles from "./ExhaustControl.module.css";

const caption: Record<Exhaust, string> = {
  stock: "factory settings",
  loud: "the whole lane knows",
  silent: "library mode",
};

type ExhaustControlProps = {
  /** The exhaust fitted now. */
  mode: Exhaust;
  /** Fit the next one: stock → loud → silent → stock. */
  onChange: () => void;
  className?: string;
};

/**
 * "Change the exhaust": the ride's sound switch, a small chip with a silencer on it. Each tap fits
 * the next exhaust and the pipe puffs (except into silence). Shows the mode in hand, with its caption.
 */
export function ExhaustControl({ mode, onChange, className }: ExhaustControlProps) {
  const [puffs, setPuffs] = useState(0);

  return (
    <div className={cx(styles.root, className)} data-mode={mode}>
      <button
        type="button"
        className={styles.button}
        onClick={() => {
          setPuffs((n) => n + 1);
          onChange();
        }}
      >
        <span className={styles.pipe}>
          <Icon name="exhaust" size={26} />
          {/* A new key replays the puff on every change. */}
          {puffs > 0 && mode !== "silent" ? <span key={puffs} className={styles.puff} aria-hidden="true" /> : null}
        </span>
        <span className={styles.text}>
          <span className={styles.label}>Change the exhaust</span>{" "}
          <span className={styles.mode}>
            <span className={styles.name}>{mode}</span> · {caption[mode]}
          </span>
        </span>
      </button>
      <p className="sr-only" aria-live="polite">
        {puffs > 0 ? `Exhaust: ${mode}, ${caption[mode]}.` : ""}
      </p>
    </div>
  );
}
