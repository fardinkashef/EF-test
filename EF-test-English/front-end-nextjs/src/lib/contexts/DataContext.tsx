"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getResults } from "../server-actions/results";

type DataContextProviderProps = {
  children: ReactNode;
};

type DataContext = {
  data: any;
  setData: any;
  isLoading: any;
};

const DataContext = createContext<DataContext | null>(null);

function DataContextProvider({ children }: DataContextProviderProps) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  async function getData() {
    setIsLoading(true);
    const res = await getResults();
    setData(res);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData, isLoading }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
export { DataContextProvider };

// Always use a custom hook like this when using context:
export function useDataContext() {
  const dataContext = useContext(DataContext);
  if (!dataContext)
    throw new Error("useDataContext must be used within DataContextProvider ");
  return dataContext;
}
