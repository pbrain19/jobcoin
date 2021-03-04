import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "./components/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SnackBar from "./components/SnackBar";

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
`;

const App: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestCurrentUser());
  }, []);

  return (
    <MainWrapper>
      <SnackBar />
      {currentUser ? (
        <>
          <Header />
          <MainContent>
            <Dashboard />
          </MainContent>
        </>
      ) : (
        <Login />
      )}
    </MainWrapper>
  );
};

export default App;
