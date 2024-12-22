import { BottomSheet } from 'react-spring-bottom-sheet';
import { ITEM_TYPE } from '../../type';
import 'react-spring-bottom-sheet/dist/style.css';
import styled from 'styled-components';
import { useShareTheme } from '../../hook/use-shared-theme';

export const DetailBottomSheet = ({
  open,
  close,
  item,
}: {
  open: boolean;
  item: ITEM_TYPE | undefined;
  close: () => void;
}) => {
  const { shareToKakao } = useShareTheme();
  if (!item) return <></>;
  return (
    <BottomSheet
      expandOnContentDrag={false}
      maxHeight={window.innerHeight * 0.9}
      onDismiss={close}
      open={open}
      scrollLocking={true}
      snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight]}
    >
      <ItemInner>
        <h2>{item.title}</h2>
        <ItemImg src={`/assets/theme-img/thumb_${item.id}.jpg`} alt="" />
        <h2>{item.description}</h2>
        <ButtonContainer onClick={() => shareToKakao(item.id)}>
          <KakaoSharedButton>공유하기</KakaoSharedButton>
        </ButtonContainer>
      </ItemInner>
    </BottomSheet>
  );
};

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
`;

const KakaoSharedButton = styled.button`
  height: 50px;
  background-color: yellow;
  border: none;
`;

const ItemInner = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 50px;
  flex-direction: column;
`;

const ItemImg = styled.img`
  height: 150px;
  border-radius: 20px;
`;
