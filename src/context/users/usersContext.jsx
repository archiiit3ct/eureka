import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import { ADD_USER, EDIT_USER, REMOVE_USER } from "./usersActions";

export const UsersContext = createContext(undefined);

const initialState = {
  users: [
    {
      id: 1,
      surname: "Иванов",
      name: "Иван",
      patronymic: "Иванович",
      email: "mail1@mail.com",
      login: "user1",
    },
    {
      id: 2,
      surname: "Петров",
      name: "Петр",
      patronymic: "Сергеевич",
      email: "mail2@mail.com",
      login: "user2",
    },
    {
      id: 3,
      surname: "Сергеев",
      name: "Григорий",
      patronymic: "Викторович",
      email: "mail3@mail.com",
      login: "user3",
    },
    {
      id: 4,
      surname: "Федоров",
      name: "Виктор",
      patronymic: "Федорович",
      email: "mail4@mail.com",
      login: "user4",
    },
    {
      id: 5,
      surname: "Хвастунов",
      name: "Сергей",
      patronymic: "Петрович",
      email: "mail5@mail.com",
      login: "user5",
    },
    {
      id: 6,
      surname: "Григорьев",
      name: "Федор",
      patronymic: "Григорьевич",
      email: "mail6@mail.com",
      login: "user6",
    },
  ],
};

const addUser = (state, user) => ({
  ...state,
  users: [user, ...state.users],
});

const editUser = (state, user) => {
  let usersNew = [];
  state.users.forEach((item) => {
    if(item.id === user.id) {
      usersNew.unshift(item = user);
      
    } else {
      usersNew.push(item)
    }
  })

  return {
    ...state,
    users: usersNew,
  };
};

const removeUser = (state, user) => {
  let remove = state.users.filter((item) => user.id !== item.id)
  return {
    ...state,
    users: [...remove],
  };
};

const stateReducer = (state, action) => {
  const { user } = action.payload;

  switch (action.type) {
    case ADD_USER:
      return addUser(state, user);
    case EDIT_USER:
      return editUser(state, user);
    case REMOVE_USER:
      return removeUser(state, user);
    default:
      return initialState;
  }
};

const StateProvider = ({ children }) => {
  const [usersState, usersDispatch] = useReducer(stateReducer, initialState);

  return (
    <UsersContext.Provider value={{ usersState, usersDispatch }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersState = () => {
  const context = useContext(UsersContext);

  if (!context)
    throw new Error("useUsersState must be used in a cashout state provider");

  return context;
};

StateProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default StateProvider;
