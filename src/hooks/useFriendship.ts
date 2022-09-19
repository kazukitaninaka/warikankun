import { useEffect, useState } from 'react';
import { liffVar } from '../components/LiffProvider';

const useFriendship = () => {
  const [isFriend, setIsFriend] = useState<boolean>(false);
  const liff = liffVar();
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
