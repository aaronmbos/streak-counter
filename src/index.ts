import { formattedDate } from "./utils";

interface Streak {
  currentCount: number;
  startDate: string;
  lastLoginDate: string;
}

const KEY = "streak";

function assertStreakExists(streakInLocalStorage: string | null) : streakInLocalStorage is string {
  return streakInLocalStorage !== null && streakInLocalStorage !== "";
}

function shouldIncrementOrResetStreakCount(currentDate: Date, lastLoginDate: string) : "increment" | "reset" {
  const difference = currentDate.getDate() - parseInt(lastLoginDate.split("/")[1]);
  
  if (difference === 1) {
    return "increment";
  }

  return "reset";
}

export function streakCounter(storage: Storage, date: Date) : Streak {
  const streakInLocalStorage = storage.getItem(KEY);

  if (assertStreakExists(streakInLocalStorage)) {
    try {
      const streak = JSON.parse(streakInLocalStorage);
      const state = shouldIncrementOrResetStreakCount(date, streak.lastLoginDate);
      const SHOULD_INCREMENT = state === "increment";
      const SHOULD_RESET = state === "reset";

      if (SHOULD_INCREMENT) {
        const updatedStreak = {
          ...streak,
          currentCount: streak.currentCount + 1,
          lastLoginDate: formattedDate(date)
        };
        
        storage.setItem(KEY, JSON.stringify(updatedStreak));

        return updatedStreak;
      } else {
        const updatedStreak: Streak = {
          currentCount: 1, 
          startDate: formattedDate(date),
          lastLoginDate: formattedDate(date)
        };

        return updatedStreak;
      }

      return streak;
    } catch (error) {
      console.error("Failed to parse streak from localStorage");
    }
  }

  const streak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date)
  };

  storage.setItem(KEY, JSON.stringify(streak));

  return streak;
 }