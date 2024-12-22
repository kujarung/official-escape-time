// components/DateTimeModal.tsx
import { Modal, DatePicker, TimePicker, Button } from 'antd';
import styled from 'styled-components';
import type { Dayjs } from 'dayjs';
import { useModalStore } from '../../store/modal-store';
import { useShareTheme } from '../../hook/use-shared-theme';

export const CommonModal = () => {
  const { shareToKakao } = useShareTheme();
  const { isVisible, selectedDate, setIsVisible, setTime, selectedTime, selectedId } = useModalStore();

  const handleDateChange = (date: Dayjs) => {
    if (date) {
      setTime(date);
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      title="날짜와 시간 선택"
      open={isVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          취소
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            setIsVisible(false);
            shareToKakao(selectedId);
          }}
        >
          공유하기
        </Button>,
      ]}
    >
      <ModalContent>
        <DatePickerWrapper>
          <label>날짜 선택</label>
          <DatePicker value={selectedDate} inputReadOnly onChange={handleDateChange} format={'YYYY-MM-DD'} />
        </DatePickerWrapper>

        <TimePickerWrapper>
          <label>시간 선택</label>
          <TimePicker inputReadOnly value={selectedTime} onChange={handleDateChange} format="HH:mm" minuteStep={5} />
        </TimePickerWrapper>
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    color: #333;
  }
`;

const TimePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    color: #333;
  }
`;
