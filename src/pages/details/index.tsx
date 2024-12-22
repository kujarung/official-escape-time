import { useParams } from 'react-router';
import data from '../../assets/data/new-data.json';
import styled from 'styled-components';
import { Button, Divider, Space } from 'antd';
import { useModalStore } from '../../store/modal-store';
import { formatKoreanCurrency } from '../../utils';
import { useEffect } from 'react';

export const Details = () => {
  const { setIsVisible, setSelectedId } = useModalStore();
  const { id } = useParams();
  const item = data.find((i) => i.id === id);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <Wrap>
      <Inner>
        <ImgContainer>
          <Image src={`/official-escape-time/assets/theme-img/thumb_${id}.jpg`} alt="" />
          <IsHorror>공포 테마</IsHorror>
        </ImgContainer>
        <Location>
          {item?.location} | {item?.branchName}
        </Location>
        <TitleContainer>
          <Title>{item?.title}</Title>
        </TitleContainer>

        <Divider />

        <DescContainer>
          <DescTitle>시놉시스</DescTitle>
          <Description>{item?.description}</Description>
        </DescContainer>

        <Divider />

        <InfoContainer>
          <DescTitle>기타 정보</DescTitle>
          <InfoTitle>시간 : {item?.playtime}분</InfoTitle>
          <InfoTitle>가격 : {formatKoreanCurrency(item?.price || 0)}</InfoTitle>
          <InfoTitle>위치 : {item?.address}</InfoTitle>
          <InfoTitle>지점 이름 : {item?.branchName}</InfoTitle>
          <InfoTitle>전화 : {item?.branchTel}</InfoTitle>

          <div className="" style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <Button onClick={() => window.open(`https://map.naver.com/v5/search/${item?.address}`, '_blank')}>
              위치 보기
            </Button>
          </div>
        </InfoContainer>
        <Divider />
        <ButtonContainer>
          <Space>
            <Button type="primary">
              <a href={`${item?.page}`} target="_blank">
                홈페이지 가기
              </a>
            </Button>

            <Button
              onClick={() => {
                setSelectedId(item?.id || '');
                setIsVisible(true);
              }}
            >
              공유 하기
            </Button>
          </Space>
        </ButtonContainer>
      </Inner>
    </Wrap>
  );
};

const TitleContainer = styled.div`
  width: 100%;
`;

const Title = styled.h4`
  font-size: 34px;
  line-height: 42px;
  text-align: center;
`;

const ImgContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    max-width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const IsHorror = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 5px;
  padding-bottom: 0;
  background-color: #ff1010;
  color: #300000;
  font-size: 12px;
  line-height: 20px;
`;

const Wrap = styled.div`
  overflow: hidden;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  max-width: 400px;
  margin: 0 auto;
`;

const Location = styled.h4`
  font-size: 14px;
  line-height: 20px;
  margin-top: 5px;
  color: #606060;
`;

const DescContainer = styled.div`
  width: 100%;
`;

const DescTitle = styled.h2`
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  margin-bottom: 10px;
`;

const Description = styled.h3`
  white-space: pre-wrap;
  text-align: center;
  font-size: 20px;
  line-height: 26px;
  color: #6e6e73;
`;

const ButtonContainer = styled.div`
  padding-bottom: 20px;
`;

const InfoContainer = styled.div``;

const InfoTitle = styled.h4`
  font-size: 14px;
  line-height: 18px;
  color: #6e6e73;
  text-align: center;
`;
