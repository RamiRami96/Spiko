import { useState } from "react";

export function useClubDetailModals() {
  const [successVisible, setSuccessVisible] = useState(false);
  const [warnVisible, setWarnVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  return {
    successVisible,
    warnVisible,
    deleteVisible,
    setSuccessVisible,
    setWarnVisible,
    setDeleteVisible,
  };
}
