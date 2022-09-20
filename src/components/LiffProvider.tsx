import React, { createContext, useEffect, useState } from 'react';
import Liff from '@line/liff';

export const LiffContext = createContext<typeof Liff | null>(null);
const LiffProvider = ({ children }: { children: React.ReactNode }) => {
  const [liff, setLiff] = useState<typeof Liff | null>(null);

  useEffect(() => {
    (async () => {
      const liff = (await import('@line/liff')).default;
      liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! }).then(() => {
        setLiff(liff);
      });
    })();
  }, []);

  return <LiffContext.Provider value={liff}>{children}</LiffContext.Provider>;
};
export default LiffProvider;
