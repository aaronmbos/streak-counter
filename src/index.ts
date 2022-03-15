import { buildStreak, formattedDate, Streak, updateStreak } from "./utils";

const KEY = "streak";

function assertStreakExists(streakInLocalStorage: string | null) : streakInLocalStorage is string {
  return streakInLocalStorage !== null && streakInLocalStorage !== "";
}

function shouldIncrementOrResetStreakCount(currentDate: Date, lastLoginDate: string) : "increment" | "reset" | "none" {
  const difference = currentDate.getDate() - parseInt(lastLoginDate.split("/")[1]);
  if (difference === 0) {
    return "none";
  }

  if (difference === 1) {
    return "increment";
  }

  return "reset";
}

export function streakCounter(storage: Storage, date: Date) : Streak {
  const streakInLocalStorage = storage.getItem(KEY);

  if (assertStreakExists(streakInLocalStorage)) {
    try {
      const streak = JSON.parse(streakInLocalStorage) as Streak;
      const state = shouldIncrementOrResetStreakCount(date, streak.lastLoginDate);
      const SHOULD_INCREMENT = state === "increment";
      const SHOULD_RESET = state === "reset";

      if (SHOULD_INCREMENT) {
        const updatedStreak = buildStreak(date, {
          startDate: streak.startDate,
          currentCount: streak.currentCount + 1,
          lastLoginDate: formattedDate(date)
        });
        
        updateStreak(storage, updatedStreak);

        return updatedStreak;
      } 
      
      if (SHOULD_RESET) {
        const updatedStreak = buildStreak(date);
        
        updateStreak(storage, updatedStreak);

        return updatedStreak;
      }

      return streak;
    } catch (error) {
      console.error("Failed to parse streak from localStorage");
    }
  }

  const streak = buildStreak(date);

  updateStreak(storage, streak);

  return streak;
 }