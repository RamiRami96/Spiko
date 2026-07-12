import { ApplicationStatus } from "@/shared/models/application.model";

export const STATUS_STYLE: Record<ApplicationStatus, { label: string; bg: string; text: string }> = {
  waiting:   { label: "Waiting",   bg: "bg-yellow-500/20",  text: "text-yellow-300" },
  approved:  { label: "Approved",  bg: "bg-emerald-500/20", text: "text-emerald-300" },
  rejected:  { label: "Rejected",  bg: "bg-red-500/20",     text: "text-red-300" },
  cancelled: { label: "Cancelled", bg: "bg-white/10",       text: "text-white/40" },
};
