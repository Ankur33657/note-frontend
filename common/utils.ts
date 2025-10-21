const getTimeDifference = (createdAt: string): string => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const diffMs = currentDate.getTime() - createdDate.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  if (diffHours < 1) {
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    if (diffMinutes < 1) return "just Now";
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  }
  if (diffHours <= 24) {
    return `${Math.floor(diffHours)} hours ago`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  }
};

export default {
  getTimeDifference,
};
