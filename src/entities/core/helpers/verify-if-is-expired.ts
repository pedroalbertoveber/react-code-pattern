export function verifyIfIsExpired(expireDate: Date) {
  const now = new Date();
  return now > new Date(expireDate);
}