"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { PROGRESS_EVENT } from "./progression";
import type { MouseEvent, ReactNode } from "react";

const LESSON_KEY = "cr-guide-completed-lessons";

export function LockedNavLink({
  href,
  required,
  children,
  className,
  current,
}: {
  href: string;
  required?: number;
  children: ReactNode;
  className?: string;
  current?: boolean;
}) {
  const completed = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener(PROGRESS_EVENT, onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener(PROGRESS_EVENT, onStoreChange);
      };
    },
    () => {
      try {
        const value = JSON.parse(window.localStorage.getItem(LESSON_KEY) || "[]");
        return Array.isArray(value) ? value.length : 0;
      } catch {
        return 0;
      }
    },
    () => 0,
  );

  const locked = required !== undefined && completed < required;
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!locked) return;
    event.preventDefault();
    window.alert(`Complete ${required} lessons on the learning road to unlock this feature.`);
  };

  return (
    <Link
      className={className}
      href={href}
      aria-current={current ? "page" : undefined}
      aria-disabled={locked || undefined}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
