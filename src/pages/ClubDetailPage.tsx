import { ClubDetailContainer } from "@/modules/club-detail";

type Props = {
  id: string;
  onBack: () => void;
};

export function ClubDetailPage({ id, onBack }: Props) {
  return <ClubDetailContainer id={id} onBack={onBack} />;
}
