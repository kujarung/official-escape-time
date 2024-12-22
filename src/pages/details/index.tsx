import { useParams } from 'react-router';
import data from '../../assets/data/new-data.json';
import styled from 'styled-components';

export const Details = () => {
  const { id } = useParams();
  const item = data.find((i) => i.id === id);

  return (
    <Wrap>
      <Inner>
        <ImgContainer>
          <Image src={`/assets/theme-img/thumb_${id}.jpg`} alt="" />
        </ImgContainer>
        <Location>
          {item?.area} {item?.location}
        </Location>
        <Title>
          {item?.title}({item?.playtime}분)
        </Title>
        <Description>{item?.description}</Description>
      </Inner>
    </Wrap>
  );
};

const Title = styled.h4`
  font-size: 28px;
`;

const ImgContainer = styled.div``;

const Image = styled.img``;

const Wrap = styled.div``;
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  max-width: 500px;
  margin: 0 auto;
`;

const Location = styled.h4``;

const Description = styled.h3`
  white-space: pre;
  text-align: center;
  font-size: 18px;
  line-height: 22px;
`;
