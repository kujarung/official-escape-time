import { useParams } from 'react-router';
import data from '../../assets/data/new-data.json';
import styled from 'styled-components';
import { Button, Space } from 'antd';
import { useModalStore } from '../../store/modal-store';

export const Details = () => {
  const { setIsVisible, setSelectedId } = useModalStore();
  const { id } = useParams();
  const item = data.find((i) => i.id === id);

  console.log(item);
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
          <Title>
            {item?.title} ({item?.playtime}분)
          </Title>
        </TitleContainer>

        <DescContainer>
          <DescTitle>시놉시스</DescTitle>
          <Description>{item?.description}</Description>
        </DescContainer>

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
  border-bottom: 1px solid #d2d2d7;
  margin-bottom: 20px;
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
  background-color: #ff2121;
  color: #720303;
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
  border-bottom: 1px solid #d2d2d7;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const DescTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const Description = styled.h3`
  white-space: pre-wrap;
  text-align: center;
  font-size: 20px;
  line-height: 26px;
  color: #6e6e73;
`;

const HomePageButton = styled.button`
  background-color: #d4a373;
  color: #fefae0;
  border-radius: 10px;
  font-size: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ButtonContainer = styled.div`
  padding-bottom: 20px;
`;
