import { useState } from 'react';
import data from '../assets/data/new-data.json';

export const useShareTheme = () => {
  const [] = useState();

  function shareToKakao(id: string) {
    const targetItem = data.find((i) => i.id === id);
    console.log(targetItem);
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'Your Title', // 타이틀 설정
        description: 'Your Description', // 설명 설정
        imageUrl: 'https://example.com/your-image.jpg', // 공유할 이미지 URL
        link: {
          mobileWebUrl: 'https://example.com',
          webUrl: 'https://example.com',
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'https://example.com',
            webUrl: 'https://example.com',
          },
        },
      ],
    });
  }

  return { shareToKakao };
};
