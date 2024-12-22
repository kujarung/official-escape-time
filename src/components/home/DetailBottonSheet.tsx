import { BottomSheet } from 'react-spring-bottom-sheet';
import { ITEM_TYPE } from '../../type';
import 'react-spring-bottom-sheet/dist/style.css';
import styled from 'styled-components';
import { Link } from 'react-router';
import { useModalStore } from '../../store/modal-store';

export const DetailBottomSheet = ({
  open,
  close,
  item,
}: {
  open: boolean;
  item: ITEM_TYPE | undefined;
  close: () => void;
}) => {
  const { setIsVisible, setSelectedId } = useModalStore();

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
        <Inner>
          <ItemImg src={`/official-escape-time/assets/theme-img/thumb_${item.id}.jpg`} alt="" />
          <Desc>
            <Title>{item.title}</Title>
            <h2>{item.description}</h2>
          </Desc>
        </Inner>

        <ButtonContainer>
          <KakaoSharedButton
            onClick={() => {
              close();
              setSelectedId(item.id);
              setIsVisible(true);
            }}
          >
            공유하기
          </KakaoSharedButton>
          <DetailButton to={`/details/${item.id}`}>자세히 보기</DetailButton>
        </ButtonContainer>
      </ItemInner>
    </BottomSheet>
  );
};

const Title = styled.h2`
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
`;

const KakaoSharedButton = styled.button`
  height: 50px;
  background-color: yellow;
  border: none;
`;

const DetailButton = styled(Link)``;

const ItemInner = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 70px;
  flex-direction: column;
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Desc = styled.div``;

const ItemImg = styled.img`
  height: 200px;
  border-radius: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
`;
