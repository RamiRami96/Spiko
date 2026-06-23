export type Applicant = {
  id: string;
  name: string;
};

type ApplicantsStore = {
  [clubId: string]: Applicant[];
};

const store: ApplicantsStore = {
  "1": [
    { id: "u1", name: "Aizat Bekova" },
    { id: "u2", name: "Daniyar Seitkali" },
    { id: "u3", name: "Moldir Akhmetova" },
  ],
};

export const mockApplicants = {
  getByClubId: (clubId: string): Applicant[] => store[clubId] ?? [],
  add: (clubId: string, applicant: Applicant) => {
    if (!store[clubId]) store[clubId] = [];
    if (!store[clubId].some((a) => a.id === applicant.id)) {
      store[clubId] = [...store[clubId], applicant];
    }
  },
  accept: (clubId: string, userId: string) => {
    if (store[clubId]) store[clubId] = store[clubId].filter((a) => a.id !== userId);
  },
  reject: (clubId: string, userId: string) => {
    if (store[clubId]) store[clubId] = store[clubId].filter((a) => a.id !== userId);
  },
};
