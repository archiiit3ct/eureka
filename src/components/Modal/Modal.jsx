import React, { useState, useEffect } from "react";

import styles from "./Modal.module.scss";

import Button from "../common/Button/Button";
import { ReactComponent as Cross } from "../../static/images/cross.svg";
import { useUsersState } from "../../context/users/usersContext";

const Modal = ({
  visible = false,
  remove = false,
  title = "",
  firstButton = "",
  secondButton = "",
  onClose,
  onApply,
  editUser,
}) => {
  const { usersState } = useUsersState();
  const [user, setUser] = useState({
    id: usersState.users.length + 1,
    surname: "",
    name: "",
    patronymic: "",
    email: "",
    login: "",
  });
  const [emptyForm, setEmptyForm] = useState(true);

  useEffect(() => {
    if (
      user.surname &&
      user.name &&
      user.patronymic &&
      user.email &&
      user.login
    ) {
      setEmptyForm(false);
    } else {
      setEmptyForm(true);
    }
  }, [user]);

  useEffect(() => {
    if (editUser) {
      setUser(editUser);
    }
  }, [editUser]);
  const onKeydown = ({ key }) => {
    switch (key) {
      case "Escape":
        onClose();
        break;
    }
  };

  const defaultUser = () => {
    setUser({
      id: usersState.users.length + 1,
      surname: "",
      name: "",
      patronymic: "",
      email: "",
      login: "",
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  if (!visible) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          {title}
          <Cross className={styles.cross} onClick={onClose} />
        </div>
        {remove ? (
          <div className={styles.removeDesc}>
            Удалить выбранного пользователя?
          </div>
        ) : (
          <div className={styles.main}>
            <div className={styles.field}>
              <span className={styles.desc}>Фамилия</span>
              <input
                className={styles.input}
                placeholder="Введите фамилию"
                onChange={(e) =>
                  setUser({
                    ...user,
                    surname: e.target.value,
                  })
                }
                value={user.surname}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.desc}>Имя</span>
              <input
                className={styles.input}
                placeholder="Введите имя"
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: e.target.value,
                  })
                }
                value={user.name}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.desc}>Отчество</span>
              <input
                className={styles.input}
                placeholder="Введите отчество"
                onChange={(e) =>
                  setUser({
                    ...user,
                    patronymic: e.target.value,
                  })
                }
                value={user.patronymic}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.desc}>E-mail</span>
              <input
                className={styles.input}
                placeholder="Введите электронную почту"
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
                value={user.email}
              />
            </div>
            <div className={styles.field}>
              <span className={styles.desc}>Логин</span>
              <input
                className={styles.input}
                placeholder="Введите логин"
                onChange={(e) =>
                  setUser({
                    ...user,
                    login: e.target.value,
                  })
                }
                value={user.login}
              />
            </div>
          </div>
        )}
        <div className={styles.footer}>
        {secondButton && (
            <Button
              className={styles.button__remove}
              onClick={() => {
                onClose();
              }}
            >
              {secondButton}
            </Button>
          )}
          <Button
            className={styles.button}
            onClick={() => {
              onApply(user);
              defaultUser();
              onClose();
            }}
            disabled={emptyForm}
          >
            {firstButton}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
