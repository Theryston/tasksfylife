import styled from "styled-components";
import { NextPage } from "next";
import { Dropdown } from "react-bootstrap";
import SquareBlueIcon from "../../../public/icons/square-blue.svg";
import { useState } from "react";
import { ITag } from "../../interfaces/ICard";

interface IProps {
  options: ITag[];
  onChange: (values: ITag[]) => void;
}

const InputTag: NextPage<IProps> = ({ options, onChange }) => {
  const [optionsSelected, setOptionsSelected] = useState<ITag[]>([]);

  const handleSelect = (option: ITag) => {
    const newOption = options.find((o) => o.label === option.label);

    if (!newOption) {
      return;
    }

    const alreadyExistsInSelected = optionsSelected.find(
      (o) => o.label === newOption.label
    );

    if (alreadyExistsInSelected) {
      return;
    }

    setOptionsSelected((oldOptions) => {
      onChange([...oldOptions, newOption]);
      return [...oldOptions, newOption];
    });
  };

  const handleRemoveItemFromSelected = async (index: number) => {
    setOptionsSelected((oldOptions) => {
      const newOptions = [...oldOptions];
      newOptions.splice(index, 1);
      onChange(newOptions);
      return newOptions;
    });
  };

  return (
    <Container>
      {optionsSelected.map((option, index) => (
        <Tag onClick={() => handleRemoveItemFromSelected(index)} key={index}>
          {option.label}
        </Tag>
      ))}
      <DropdownStyled>
        <DropdownToggle id="dropdown-basic">Select tag</DropdownToggle>

        <DropdownMenu>
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSelect(option)}>
              <SquareBlueIcon />
              <span>{option.label}</span>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </DropdownStyled>
    </Container>
  );
};

export const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 10px;
  gap: 5px;
`;

export const Tag = styled.div`
  padding: 4px 10px;
  background-color: ${(props) => props.theme.colors.Orange};
  border-radius: 8px;
  cursor: pointer;
`;

export const DropdownStyled = styled(Dropdown)``;

export const DropdownToggle = styled(DropdownStyled.Toggle)`
  background-color: ${(props) => props.theme.colors.Lavender};
  border: none;
  padding: 4px 10px;
  border-radius: 8px;

  color: ${(props) => props.theme.colors.DarkGrey};

  &:hover {
    background-color: ${(props) => props.theme.colors.Lavender};
    color: ${(props) => props.theme.colors.DarkGrey};
  }

  &:focus {
    background-color: ${(props) => props.theme.colors.Lavender} !important;
    color: ${(props) => props.theme.colors.DarkGrey} !important;
    box-shadow: none !important;
  }

  &::after {
    display: none;
  }
`;

export const DropdownMenu = styled(DropdownStyled.Menu)`
  background: ${(props) => props.theme.colors.DarkBlue};
  width: 270px;
`;

export const DropdownItem = styled(DropdownStyled.Item)`
  color: ${(props) => props.theme.colors.FontColor};
  padding: 14px 24px;
  font-weight: 500;
  display: flex;
  width: inherit;

  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundColor};
    color: ${(props) => props.theme.colors.FontColor};
  }

  span {
    margin-left: 24px;
  }
`;

export default InputTag;
