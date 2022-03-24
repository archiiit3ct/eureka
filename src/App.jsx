import React, { useState } from "react";

import styles from "./App.module.scss";

import Button from "./components/common/Button/Button";
import Modal from "./components/Modal/Modal";
import Row from "./components/common/Row/Row";

import { ReactComponent as Plus } from "./static/images/plus.svg";

import { useUsersState } from "./context/users/usersContext";
import {
  ADD_USER
} from './context/users/usersActions';

function App() {
  const { usersState, usersDispatch } = useUsersState();
  const [isModal, setModal] = useState(false);
  const onClose = () => setModal(false);

  const addNewUser = (user) => {
    usersDispatch({ type: ADD_USER, payload: {
      user: user
    }})
  }

  return (
    <div className="App">
      <header className={styles.header} />
      <main className={styles.container}>
        <div className={styles.menu}></div>
        <div className={styles.main}>
          <div className={styles.main__header}>
            <h1 className={styles.main__title}>Пользователи</h1>
            <Button onClick={() => setModal(true)}>
              <Plus />
              Добавить
            </Button>
          </div>
          <div className={styles.content}>
            <div className={styles.content__header}>
              <div>Фамилия</div>
              <div>Имя</div>
              <div>Отчество</div>
              <div>E-mail</div>
              <div>Логин</div>
              <div></div>
            </div>
            <div className={styles.content__main}>
              {usersState.users.map((item) => {
                return (
                  <Row item={item} key={item.id} />
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Modal
        visible={isModal}
        title="Создание пользователя"
        firstButton="Создать"
        onClose={onClose}
        onApply={addNewUser}
      />
    </div>
  );
}

export default App;
