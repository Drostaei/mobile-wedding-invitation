import { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import data from 'data.json';
import { onValue, ref } from 'firebase/database';
import { realtimeDb } from 'firebase.ts';
import JSConfetti from 'js-confetti';
import Heart from '@/assets/icons/heart_plus.svg?react';
import Share from '@/assets/icons/share.svg?react';
import Upward from '@/assets/icons/upward.svg?react';
import Button from '@/components/Button.tsx';

const FloatingBar = ({ isVisible }: { isVisible: boolean }) => {
  const { emojis } = data;
  const [count, setCount] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const jsConfettiRef = useRef(new JSConfetti());

  useEffect(() => {
    const dbRef = ref(realtimeDb, 'likes');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setCount(Number(snapshot.val()));
        setDataLoaded(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      setIsVisible(true);
    }
  }, [dataLoaded]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => alert('주소가 복사되었습니다.😉😉'),
      () => alert('주소 복사에 실패했습니다.🥲🥲'),
    );
  };

  const handleCount = () => {
    void jsConfettiRef.current.addConfetti({ emojis });

    // Firebase likes 증가 코드 (주석 해제 시 적용 가능)
    // const dbRef = ref(realtimeDb);
    // void update(dbRef, { likes: increment(1) });
  };

  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Nav isVisible={isVisible}>
      <Button onClick={handleCount}>
        <Heart fill="#e88ca6" />
        {count || ''}
      </Button>
      <Button onClick={handleCopy}>
        <Share fill="#e88ca6" />
        공유
      </Button>
      <Button onClick={handleScroll}>
        <Upward fill="#e88ca6" />
        위로
      </Button>
    </Nav>
  );
};

export default FloatingBar;

const Nav = styled.nav<{ isVisible: boolean }>`
  min-width: 280px;
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  gap: 5px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
  transition: opacity 0.3s ease-in-out;
`;
