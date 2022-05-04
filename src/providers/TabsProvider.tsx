import { SetState } from '../utils/utils';
import React, { createContext, ReactNode, useState } from 'react';
import noop from 'lodash/noop';

export type ITabsContext = {
  tab: number;
  setTab: SetState<number>;
};

export const TabsContext = createContext<ITabsContext>({
  tab: 0,
  setTab: noop,
});

export default ({ children }: { children: ReactNode }) => {
  const [tab, setTab] = useState(0);
  return (
    <TabsContext.Provider
      value={{
        tab,
        setTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};
