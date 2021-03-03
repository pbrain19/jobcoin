import React, { useEffect } from "react";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/user/geese";
import Avatar from "@material-ui/core/Avatar";

const AppBarContainer = styled.div`
  flex-grow: 1;
`;

const BarSpacer = styled.div`
  flex-grow: 1;
`;

export const Header: React.FC = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <AppBarContainer>
      <AppBar position="static">
        <Toolbar>
          <Avatar>J</Avatar>
          <Typography variant="h6">Jobcoin</Typography>
          <BarSpacer />
          <Button onClick={logout} variant="outlined" color="secondary">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </AppBarContainer>
  );
};
