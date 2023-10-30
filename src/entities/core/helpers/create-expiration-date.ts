export function createExpirationDate(revalidate: number) {
  const now = new Date();
  const expireDate = new Date(now.getTime() + revalidate);

  return expireDate;
}