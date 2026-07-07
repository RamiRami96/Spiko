import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

import { Club } from "@/shared/models/club.model";
import { MOCK_CLUBS } from "@/modules/clubs/const/mock-clubs";

import { ClubsAction, clubsReducer } from "./clubs.reducer";

const ClubsStateContext = createContext<Club[]>([]);
const ClubsDispatchContext = createContext<Dispatch<ClubsAction>>(() => {});

export function ClubsProvider({ children }: { children: ReactNode }) {
  const [clubs, dispatch] = useReducer(clubsReducer, [...MOCK_CLUBS]);

  return (
    <ClubsDispatchContext.Provider value={dispatch}>
      <ClubsStateContext.Provider value={clubs}>
        {children}
      </ClubsStateContext.Provider>
    </ClubsDispatchContext.Provider>
  );
}

export const useClubsState = () => useContext(ClubsStateContext);
export const useClubsDispatch = () => useContext(ClubsDispatchContext);
