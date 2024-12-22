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
      (filters.area === '' || item.area === filters.area)
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

  const getUniqueValues = (key) => {
    return Array.from(new Set(itemDataList.map((item) => item[key]))).filter(Boolean);
  };
  return (
    <>
      <DetailBottomSheet open={open} item={detailItem} close={() => setOpen(false)} />
      <FilterContainer>
        <select name="area" value={filters.area} onChange={handleFilterChange}>
          <option value="">Select Area</option>
          <option value={'서울'}>서울</option>
          <option value={'경기/인천'}>경기도 / 인천</option>
          <option value={'충청'}>충청도</option>
          <option value={'경상'}>경상도</option>
          <option value={'전라'}>전라도</option>
          <option value={'강원'}>강원</option>
          <option value={'제주'}>제주</option>
        </select>

        <select name="location" value={filters.location} onChange={handleFilterChange}>
          <option value="">Select Location</option>
          {getUniqueValues('location').map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </FilterContainer>

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
