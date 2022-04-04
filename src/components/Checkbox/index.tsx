import { NextPage } from "next";
import { useCallback, useState } from "react";
import styled from "styled-components";

interface IProps {
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  readOnly?: boolean;
}

const Checkbox: NextPage<IProps> = ({
  defaultChecked,
  onChange,
  label,
  readOnly,
}) => {
  const [check, setCheck] = useState<boolean>(defaultChecked || false);
  const id = Date.now().toString();

  const handleCheck = useCallback(() => {
    if (readOnly) {
      return;
    }

    setCheck((oldCheck) => {
      if (onChange) {
        onChange(!oldCheck);
      }
      return !oldCheck;
    });
  }, [onChange, readOnly]);

  return (
    <Container>
      <InputCheck
        id={id}
        type="checkbox"
        onClick={(e) => {
          handleCheck();
        }}
        checked={check}
      />
      <CheckboxContent onClick={(e) => handleCheck()} checked={check}>
        <CheckedIcon show={check} viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </CheckedIcon>
      </CheckboxContent>
      <Label htmlFor={id} id={id + "-label"} className={id + "-label"} key={id}>
        {label}
      </Label>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InputCheck = styled.input`
  position: absolute;
  left: -9999px;
`;

export const CheckboxContent = styled.div<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  padding: 2px;
  background: #e1e4e8;
  border-radius: 4px;
  transition: all 150ms;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckedIcon = styled.svg<{ show: boolean }>`
  ${(props) => (props.show ? "" : "display: none;")}
  fill: none;
  stroke: #79807d;
  stroke-width: 2px;
`;

export const Label = styled.label`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
`;

export default Checkbox;
