import React, { useEffect, useState } from 'react';
import type Liff from '@line/liff';

const useLiff = () => {
  const [liff, setLiff] = useState<typeof Liff | null>(null);
  useEffect(() => {
    (async () => {
      const liff = (await import('@line/liff')).default;
      liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! }).then(() => {
        setLiff(liff);
      });
    })();
  }, []);
  return { liff };
};

export default useLiff;
