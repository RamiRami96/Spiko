import { ApplicationStatus } from "@/state/applications/applications.reducer";

export const STATUS_STYLE: Record<ApplicationStatus, { label: string; bg: string; text: string }> = {
  waiting:  { label: "Waiting",  bg: "bg-yellow-500/20", text: "text-yellow-300" },
  approved: { label: "Approved", bg: "bg-emerald-500/20", text: "text-emerald-300" },
  rejected: { label: "Rejected", bg: "bg-red-500/20",    text: "text-red-300" },
};
