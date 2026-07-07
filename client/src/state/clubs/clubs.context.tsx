import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from "react";

import { Club } from "@/shared/models/club.model";
import { clubsService } from "@/shared/services";

import { ClubsAction, clubsReducer } from "./clubs.reducer";

const ClubsStateContext = createContext<Club[]>([]);
const ClubsDispatchContext = createContext<Dispatch<ClubsAction>>(() => {});

export function ClubsProvider({ children }: { children: ReactNode }) {
  const [clubs, dispatch] = useReducer(clubsReducer, []);

  useEffect(() => {
    clubsService.getAll().then((data) => {
      dispatch({ type: "SET", clubs: data });
    });
  }, []);

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
