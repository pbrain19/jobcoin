import React, { useEffect } from "react";

import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/user/geese";
import Avatar from "@material-ui/core/Avatar";
import { selectCurrentUser } from "../store/selectors";
import { UserType } from "../types/models";

const AppBarContainer = styled.div`
  flex-grow: 1;
`;

const BarSpacer = styled.div`
  flex-grow: 1;
`;
const StyledTypography = styled(Typography)`
  padding-left: 20px;
`;
export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser) as UserType;

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <AppBarContainer>
      <AppBar position="static">
        <Toolbar>
          <Avatar>J</Avatar>
          <StyledTypography variant="h6">
            {currentUser.walletAddress}'s Wallet
          </StyledTypography>
          <BarSpacer />
          <Button onClick={logout} variant="outlined" color="secondary">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </AppBarContainer>
  );
};
