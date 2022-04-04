import { NextPage } from "next";
import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { ITask } from "../../interfaces/ICard";
import { ILife } from "../../interfaces/IUser";
import LifeData from "../LifeData";

interface IProps {
  show: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCardModal: NextPage<IProps> = ({ show, setter }) => {
  const [cardName, setCardName] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [textCreateTask, setTextCreateTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const { data: session } = useSession();

  const handleHide = useCallback(() => {
    setCardDescription("");
    setCardName("");
    setTasks([]);
    setter(false);
  }, [setter]);

  const handleCreateCard = useCallback(() => {
    console.log(cardName, cardDescription, tasks);

    handleHide();
  }, [cardName, cardDescription, tasks, handleHide]);

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
          placeholder="Write a name for your card"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />
        <InputCardDescription
          className="mt-3"
          placeholder="Write a description"
          value={cardDescription}
          onChange={(e) => setCardDescription(e.target.value)}
        />
        {tasks.map((task) => (
          <>
            {task && (
              <div className="d-flex align-items-center">
                <input
                  id={task._id}
                  type="checkbox"
                  onClick={(e) => {
                    (e.target as any).checked = task.done;
                  }}
                />
                <ParagraphTask htmlFor={task._id} key={task._id}>
                  {task.label}
                </ParagraphTask>
              </div>
            )}
          </>
        ))}
        <MainInput
          type="text"
          className="mt-3"
          placeholder="Create a new task"
          value={textCreateTask}
          onChange={(e) => setTextCreateTask(e.target.value)}
          onBlur={() => {
            handleCreateTask();
            setTextCreateTask("");
          }}
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
              handleCreateTask();
              setTextCreateTask("");
            }
          }}
        />
      </ModalBody>
    </Container>
  );
};

export const ParagraphTask = styled.label`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  margin: 4px;
`;

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
  height: 100px;
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
