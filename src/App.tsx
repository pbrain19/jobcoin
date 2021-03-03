import React, { useEffect } from "react";
import styled from "styled-components";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Header } from "./components/Header";
import Login from "./pages/Login";

import { selectCurrentUser } from "./store/selectors";
import { requestCurrentUser } from "./features/user/geese";

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
`;

const MainContent = styled.div`
  height: calc(100vh - 64px);
  flex-direction: column;
  display: flex;
`;

const App: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestCurrentUser());
  }, []);

  return (
    <MainWrapper>
      {currentUser ? (
        <>
          <Header />
          <MainContent></MainContent>
        </>
      ) : (
        <Login />
      )}
    </MainWrapper>
  );
};

export default App;
