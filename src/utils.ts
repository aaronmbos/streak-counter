export function formattedDate(date: Date) : string {
  return date.toLocaleDateString("en-US").split(",")[0];
}

export interface Streak {
  currentCount: number;
  startDate: string;
  lastLoginDate: string;
}

export function buildStreak(date: Date, overrideDefaults?: Partial<Streak>): Streak {
  const defaultStreak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date)
  };

  return {
    ...defaultStreak,
    ...overrideDefaults
  };
}

export const KEY = "streak";

export function updateStreak(storage: Storage, streak: Streak): void {
  storage.setItem(KEY, JSON.stringify(streak));
}