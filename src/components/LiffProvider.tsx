import React, { useEffect } from 'react';
import Liff from '@line/liff';
import { makeVar } from '@apollo/client';

export const liffVar = makeVar<typeof Liff | null>(null);

const LiffProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    (async () => {
      const liff = (await import('@line/liff')).default;
      liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! }).then(() => {
        liffVar(liff);
      });
    })();
  }, []);
  return <>{children}</>;
};
export default LiffProvider;
