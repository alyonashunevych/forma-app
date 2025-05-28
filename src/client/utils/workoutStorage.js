const STORAGE_KEY = "workoutDays";

export function getWorkoutDays() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function getWorkoutDay(dateStr) {
  const days = getWorkoutDays();
  return days[dateStr] || null;
}

export function getWorkoutNumber(dateStr) {
  const days = getWorkoutDays();
  const sorted = Object.entries(days)
    .sort(([a], [b]) => new Date(a) - new Date(b));
  const idx = sorted.findIndex(([date]) => date === dateStr);
  return idx !== -1 ? idx + 1 : null;
}

export function setWorkoutDays(workoutDays) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workoutDays));
}

export function addWorkoutDay(dateStr, workout) {
  const days = getWorkoutDays();

  if (days[dateStr]) {
    return false;
  }

  days[dateStr] = workout;
  setWorkoutDays(days);
  return true;
}

export function changeWorkoutDay(dateStr, changes) {
  const days = getWorkoutDays();
  if (days[dateStr]) {
    days[dateStr] = { ...days[dateStr], ...changes };
    setWorkoutDays(days);
  }
}

export function deleteWorkoutDay(dateStr) {
  const days = getWorkoutDays();
  if (days[dateStr]) {
    delete days[dateStr];
    setWorkoutDays(days);
    return true;
  }
  return false;
}

export function autoMarkMissedWorkouts() {
  const days = getWorkoutDays();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let changed = false;

  Object.entries(days).forEach(([dateStr, workout]) => {
    const workoutDate = new Date(dateStr);
    workoutDate.setHours(0, 0, 0, 0);
    if (
      workout.state === "scheduled" &&
      workoutDate.getTime() < today.getTime()
    ) {
      days[dateStr] = { ...workout, state: "missed" };
      changed = true;
    }
  });

  if (changed) {
    setWorkoutDays(days);
  }
}

export function getNextWorkout() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const workoutDays = getWorkoutDays();
  const sorted = Object.entries(workoutDays)
    .map(([dateStr, workout]) => ({
      date: new Date(dateStr),
      ...workout,
      dateStr,
    }))
    .sort((a, b) => a.date - b.date);

  return (
    sorted.find(
      w => w.date.getTime() >= today.getTime() && w.state === "scheduled"
    ) || null
  );
}