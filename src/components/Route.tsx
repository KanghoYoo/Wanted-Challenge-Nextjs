import React, { useContext } from "react";
import { RouterContext } from "./Router";

interface RouteProps {
  path: string | URL;
  component: React.ReactNode;
}

const Route = ({ path, component }: RouteProps) => {
  const currentPath = useContext(RouterContext)?.pathName;

  return path === currentPath ? component : null;
};

export default Route;
