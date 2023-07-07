import React, { createContext, useEffect, useState } from "react";

interface RouterContextType {
  pathName: string | URL;
}

interface RouterProps {
  children: React.ReactNode;
}

export const RouterContext = createContext<RouterContextType | null>(null);

const Router = ({ children }: RouterProps) => {
  const [pathName, setPathName] = useState<string>(window.location.pathname);

  useEffect(() => {
    setPathName(window.location.pathname);

    window.addEventListener("popstate", (e: PopStateEvent) => {
      setPathName(window.location.pathname);
    });
  }, []);

  return (
    <RouterContext.Provider value={{ pathName }}>
      {children}
    </RouterContext.Provider>
  );
};

export default Router;
