import React, { useState } from "react";

import styles from "./Row.module.scss";

import Modal from "../../Modal/Modal";

import { ReactComponent as Pencil } from "../../../static/images/pencil.svg";
import { ReactComponent as Trash } from "../../../static/images/trash.svg";

import { useUsersState } from "../../../context/users/usersContext";
import { EDIT_USER, REMOVE_USER } from "../../../context/users/usersActions";
const Row = ({
  item,
  id,
}) => {
  const { usersDispatch } = useUsersState();
  const [isEditModal, setEditModal] = useState(false);
  const [isRemoveModal, setRemoveModal] = useState(false);

  const onClose = () => {
    setEditModal(false);
    setRemoveModal(false);
  };

  const handleEditUser = (user) => {
    usersDispatch({ type: EDIT_USER, payload: {
      user: user
    }})
  }

  const handleRemoveUser = (user) => {
    usersDispatch({ type: REMOVE_USER, payload: {
      user: user
    }})
  }

  return (
    <div key={id} className={styles.item}>
      <div>{item.surname}</div>
      <div>{item.name}</div>
      <div>{item.patronymic}</div>
      <div>{item.email}</div>
      <div>{item.login}</div>
      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={() => setEditModal(true)}
        >
          <Pencil />
        </button>
        <button
          className={styles.button}
          onClick={() => setRemoveModal(true)}
        >
          <Trash />
        </button>
      </div>
      <Modal
        visible={isEditModal}
        title="Редактирование пользователя"
        firstButton="Сохранить"
        onClose={onClose}
        onApply={handleEditUser}
        editUser={item}
      />
      <Modal
        visible={isRemoveModal}
        title="Удаление пользователя"
        firstButton="Удалить"
        secondButton="Отменить"
        onClose={onClose}
        onApply={handleRemoveUser}
        editUser={item}
        remove
      />
    </div>
  );
};

export default Row;
