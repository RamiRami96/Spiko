const applied = new Set<string>();

export const clubRegistration = {
  apply: (clubId: string) => applied.add(clubId),
  hasApplied: (clubId: string) => applied.has(clubId),
};
