import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

import { Application, ApplicationsAction, applicationsReducer } from "./applications.reducer";

const ApplicationsStateContext = createContext<Application[]>([]);
const ApplicationsDispatchContext = createContext<Dispatch<ApplicationsAction>>(() => {});

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const [applications, dispatch] = useReducer(applicationsReducer, []);

  return (
    <ApplicationsDispatchContext.Provider value={dispatch}>
      <ApplicationsStateContext.Provider value={applications}>
        {children}
      </ApplicationsStateContext.Provider>
    </ApplicationsDispatchContext.Provider>
  );
}

export const useApplicationsState = () => useContext(ApplicationsStateContext);
export const useApplicationsDispatch = () => useContext(ApplicationsDispatchContext);
