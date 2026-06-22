import { ClubDetail } from "@/modules/club-detail";

type Props = {
  id: string;
  onBack: () => void;
};

export function ClubDetailPage({ id, onBack }: Props) {
  return <ClubDetail id={id} onBack={onBack} />;
}
