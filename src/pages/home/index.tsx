import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import data from '../../assets/data/new-data.json';
import { Card } from '../../components/home/Card';
import { ITEM_TYPE } from '../../type';
import { DetailBottomSheet } from '../../components/home/DetailBottonSheet';

const ITEMS_PER_PAGE = 60;

export const App = () => {
  const [open, setOpen] = useState(false);
  const [detailItem, setDetailItem] = useState<ITEM_TYPE>();
  const itemDataList = data as ITEM_TYPE[];
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [filters, setFilters] = useState({
    location: '',
    area: '',
    searchTerm: '',
  });
  const loader = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setVisibleItems(ITEMS_PER_PAGE);
  }, [filters]);

  const filteredData = itemDataList.filter((item) => {
    return (
      (filters.location === '' || item.location === filters.location) &&
      (filters.area === '' || item.area === filters.area) &&
      // 검색어 필터 추가 (대소문자 구분 없이)
      (filters.searchTerm === '' || (item.title + '').includes(filters.searchTerm))
    );
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          if (visibleItems < filteredData.length) {
            setVisibleItems((prevItems) => prevItems + ITEMS_PER_PAGE);
          }
        }
      },
      {
        root: null,
        rootMargin: '20px', // 여유 공간 추가
        threshold: 0.7, // 70% 이상 보일 때 트리거
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader, visibleItems, filteredData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <>
      <DetailBottomSheet open={open} item={detailItem} close={() => setOpen(false)} />
      <FilterContainer>
        <select name="area" value={filters.area} onChange={handleFilterChange}>
          <option value="">전체</option>
          <option value={'서울'}>서울</option>
          <option value={'경기/인천'}>경기도 / 인천</option>
          <option value={'충청'}>충청도</option>
          <option value={'경상'}>경상도</option>
          <option value={'전라'}>전라도</option>
          <option value={'강원'}>강원</option>
          <option value={'제주'}>제주</option>
        </select>
        <SearchInput
          type="text"
          placeholder="테마 검색..."
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleFilterChange}
        />
      </FilterContainer>
      {filteredData.length === 0 && <NoResults>검색 결과가 없습니다.</NoResults>}

      <Wrap>
        <Inner>
          {filteredData.slice(0, visibleItems).map((item: ITEM_TYPE) => (
            <Card
              item={item}
              key={item.id}
              onClick={() => {
                setOpen(true);
                setDetailItem(item);
              }}
            />
          ))}
        </Inner>
        <LoaderDiv ref={loader} />
      </Wrap>
    </>
  );
};
const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
  &::placeholder {
    color: #999;
  }
  &:focus {
    outline: none;
    border-color: #666;
  }
`;

const LoaderDiv = styled.div`
  height: 20px;
  margin: 20px 0;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Wrap = styled.div``;

const Inner = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
`;
