import { Club } from "@/shared/models/club.model";

export const STATUS_STYLES: Record<Club["status"], { bg: string; text: string; label: string }> = {
  active: { bg: "bg-green-500/20", text: "text-green-300", label: "Active" },
  full: { bg: "bg-amber-500/20", text: "text-amber-300", label: "Full" },
  cancelled: { bg: "bg-red-500/20", text: "text-red-300", label: "Cancelled" },
};
