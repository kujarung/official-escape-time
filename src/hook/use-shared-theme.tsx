import { useState } from 'react';
import data from '../assets/data/new-data.json';

export const useShareTheme = () => {
  const [] = useState();

  function shareToKakao(id: string) {
    const targetItem = data.find((i) => i.id === id);
    console.log(targetItem);
    if (!targetItem) return;

    // 주소 인코딩
    const encodedAddress = encodeURIComponent(targetItem.address);

    // 이미지 전체 URL 확인 (개발자 도구에서 실제 URL 확인 필요)
    const imageUrl = `https://kujarung.github.io/official-escape-time/assets/theme-img/thumb_${targetItem.id}.jpg`; // 실제 이미지 경로에 맞게 수정

    console.log(imageUrl);
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `방탈출 ${targetItem.title} 어때?`,
        description: `${targetItem.branchName}${targetItem.location} 4시`,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: `https://kujarung.github.io/official-escape-time/#/details/${targetItem.id}`,
          webUrl: `https://kujarung.github.io/official-escape-time/#/details/${targetItem.id}`,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: `https://kujarung.github.io/official-escape-time/#/details/${targetItem.id}`,
            webUrl: `https://kujarung.github.io/official-escape-time/#/details/${targetItem.id}`,
          },
        },
        {
          title: '위치 보기',
          link: {
            mobileWebUrl: `https://map.naver.com/p/search/${encodedAddress}`,
            webUrl: `https://map.naver.com/p/search/${encodedAddress}`,
          },
        },
      ],
    });
  }

  return { shareToKakao };
};
