import { Club } from "@/shared/models/club.model";

export const STATUS_STYLES: Record<Club["status"], { bg: string; text: string; label: string }> = {
  active: { bg: "bg-green-100", text: "text-green-700", label: "Active" },
  full: { bg: "bg-amber-100", text: "text-amber-700", label: "Full" },
  cancelled: { bg: "bg-red-100", text: "text-red-600", label: "Cancelled" },
};
