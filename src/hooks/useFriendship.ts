import { useContext, useEffect, useState } from 'react';
import { LiffContext } from '@components/LiffProvider';

const useFriendship = () => {
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const liff = useContext(LiffContext);
  useEffect(() => {
    if (!liff?.isInClient()) return;
    liff.getFriendship().then((data) => {
      if (data.friendFlag) {
        setIsFriend(true);
      }
    });
  }, [liff]);
  return { isFriend };
};

export default useFriendship;
