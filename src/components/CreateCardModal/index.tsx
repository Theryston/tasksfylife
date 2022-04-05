import { NextPage } from "next";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { ITag, ITask } from "../../interfaces/ICard";
import { ILife } from "../../interfaces/IUser";
import Checkbox from "../Checkbox";
import InputTag from "../InputTag";
import LifeData from "../LifeData";

const CHARACTERS_PER_LINE_IN_CARD_DESCRIPTION = 30;
const INITIAL_CARD_DESCRIPTION_HEIGHT = 100;

interface IProps {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCardModal: NextPage<IProps> = ({ show, setter }) => {
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [textCreateTask, setTextCreateTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const [options, setOptions] = useState<ITag[]>([]);
  const [optionsSelected, setOptionsSelected] = useState<ITag[]>([]);

  const cardDescriptionRef = useRef(null);

  const [cardDescriptionHistory, setCardDescriptionHistory] = useState<
    string[]
  >([""]);

  const { data: session } = useSession();

  useEffect(() => {
    const loadTags = async () => {
      const response = await fetch("/api/tags");
      const { data: tags }: { data: ITag[] } = await response.json();
      setOptions(tags);
    };
    loadTags();
  }, []);

  const handleChangeSelect = useCallback((options: ITag[]) => {
    setOptionsSelected(options);
  }, []);

  useEffect(() => {
    if (!cardDescriptionRef || !cardDescriptionRef.current) {
      return;
    }

    if (
      cardDescription.length % CHARACTERS_PER_LINE_IN_CARD_DESCRIPTION !==
      0
    ) {
      return;
    }

    let height: number = Number(
      (cardDescriptionRef.current as any).clientHeight
    );

    if (
      cardDescription.length <
      cardDescriptionHistory[cardDescriptionHistory.length - 1].length
    ) {
      if (cardDescription.length === 0) {
        height = INITIAL_CARD_DESCRIPTION_HEIGHT;
      } else {
        if (height - 15 >= INITIAL_CARD_DESCRIPTION_HEIGHT) {
          height = height - 15;
        }
      }
    } else {
      height = height + 20;
    }

    if (height < INITIAL_CARD_DESCRIPTION_HEIGHT) {
      return;
    }

    (cardDescriptionRef.current as any).style.height = height + "px";

    cardDescriptionHistory.push(cardDescription);

    setCardDescriptionHistory((oldDescriptionHistory) => [
      ...oldDescriptionHistory,
      cardDescription,
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDescription]);

  const handleHide = useCallback(() => {
    setCardDescription("");
    setCardTitle("");
    setOptionsSelected([]);
    setTasks([]);
    setter(false);
  }, [setter]);

  const createCardObject = useCallback(async () => {
    const tagIds = optionsSelected.map((option) => option._id);
    const taskIds = tasks.map((task) => task._id);

    return {
      title: cardTitle,
      description: cardDescription,
      tags: tagIds,
      tasks: taskIds,
    };
  }, [optionsSelected, tasks, cardTitle, cardDescription]);

  const handleCreateCard = useCallback(async () => {
    const life = await createCardObject();

    await fetch("/api/cards", {
      method: "POST",
      body: JSON.stringify(life),
      headers: {
        "Content-Type": "application/json",
      },
    });

    handleHide();
  }, [handleHide, createCardObject]);

  const handleCreateTask = useCallback(async () => {
    if (!textCreateTask || !textCreateTask.length) {
      return;
    }

    const response = await fetch("/api/tasks", {
      body: JSON.stringify({
        label: textCreateTask,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { data: task } = await response.json();

    setTasks((prevTasks) => [...prevTasks, task]);
  }, [textCreateTask]);

  return (
    <Container
      centered={true}
      show={show}
      setter={setter}
      onHide={() => handleHide()}
      contentClassName="modal-content"
      dialogClassName="modal-dialog"
    >
      <ButtonConfirm onClick={() => handleCreateCard()}>+</ButtonConfirm>
      <ModalBody>
        <LifeData life={session?.life as ILife} />
        <MainInput
          type="text"
          className="mt-3"
          placeholder="Write a title for your card"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
        />
        <InputCardDescription
          ref={cardDescriptionRef}
          className="mt-3"
          placeholder="Write a description"
          value={cardDescription}
          onChange={(e) => setCardDescription(e.target.value)}
        />
        {tasks.map((task) => (
          <>{task && <Checkbox label={task.label} readOnly={true} />}</>
        ))}
        <MainInput
          type="text"
          className="mt-3"
          placeholder="Create a new task"
          value={textCreateTask}
          onChange={(e) => setTextCreateTask(e.target.value)}
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
              handleCreateTask();
              setTextCreateTask("");
            }
          }}
        />
        <InputTag
          options={options}
          onChange={(options) => handleChangeSelect(options)}
        />
      </ModalBody>
    </Container>
  );
};

export const Container = styled(Modal)`
  color: ${(props) => props.theme.colors.DarkGrey} !important;

  .modal-content {
    background: none;
    width: 300px;
    margin: auto;
  }
`;

export const MainInput = styled.input`
  border: 1px solid ${(props) => props.theme.colors.LightGrey};
  padding: 5px;
  box-sizing: border-box;
  border-radius: 3px;
  outline: none;
  font-size: 0.9em;
  width: 100%;
`;

export const InputCardDescription = styled.textarea`
  border: 1px solid ${(props) => props.theme.colors.LightGrey};
  box-sizing: border-box;
  border-radius: 3px;
  outline: none;
  font-size: 0.8em;
  padding: 5px;
  height: ${INITIAL_CARD_DESCRIPTION_HEIGHT}px;
  width: 100%;
`;

export const ModalBody = styled(Container.Body)`
  margin-top: 10px;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.FontColor};
  border-radius: 8px;
`;

export const ButtonConfirm = styled.button`
  margin-left: auto;
  border: none;
  outline: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.LightGrey};
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.5em;
`;

export default CreateCardModal;
