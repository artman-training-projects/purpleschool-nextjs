import { createContext, ReactNode, useState } from 'react';
import { TopLevelCategory } from '../interfaces/page.interface';
import { MenuItem } from '../interfaces/menu.interface';

export interface IAppContext {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({
  menu: [],
  firstCategory: TopLevelCategory.Courses,
});

export function AppContextProvider({
  menu,
  firstCategory,
  children,
}: IAppContext & { children: ReactNode }): JSX.Element {
  const [menuState, setMenuState] = useState<MenuItem[]>(menu);

  const setMenu = (newMenu: MenuItem[]) => {
    setMenuState(newMenu);
  };

  return (
    <AppContext.Provider
      value={{
        menu: menuState,
        firstCategory,
        setMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
