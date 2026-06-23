import { Club } from "@/shared/models/club.model";
import { STATUS_STYLES } from "@/shared/const/status-styles";

const APPLY_LABELS: Record<string, string> = {
  full: "Club is Full",
  cancelled: "Cancelled",
};

export function useClubStatus(club: Club) {
  const status = STATUS_STYLES[club.status];
  const canApply = !club.isRegistered && club.status === "active";
  const applyLabel = club.isRegistered
    ? "Already Registered"
    : (APPLY_LABELS[club.status] ?? "Apply to Join");

  return { status, canApply, applyLabel };
}
