import React from "react";
import styled from "styled-components";

import TransactionForm from "../components/TransactionForm";
import { Card, Typography, Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentWallet } from "../store/selectors";
import TransactionGraph from "../components/TransactionGraph";
import { UserType } from "../types/models";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LeftPanel = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  padding: 20px;
`;
const StyledCard = styled(Card)`
  box-sizing: border-box;
  padding: 25px 0;
  margin-top: 50px;
`;
const RightPanel = styled.div`
  display: flex;
  flex-grow: 1;
`;

const CardHeader = styled(Typography)`
  border-bottom: solid thin black;
  padding-bottom: 25px;
`;

const CardBody = styled(Typography)`
  padding-top: 25px;
`;

const Index: React.FC = () => {
  const currentUserWallet = useSelector(selectCurrentWallet);
  const currentUser = useSelector(selectCurrentUser) as UserType;

  return (
    <Wrapper>
      <LeftPanel>
        <StyledCard>
          <CardHeader variant="h5" align="center">
            Jobcoin Balance
          </CardHeader>
          <CardBody variant="h5" align="center">
            {currentUserWallet.balance}
          </CardBody>
        </StyledCard>

        <StyledCard>
          <CardHeader variant="h5" align="center">
            Send Jobcoin
          </CardHeader>
          <TransactionForm />
        </StyledCard>
      </LeftPanel>
      <RightPanel>
        <Container>
          <TransactionGraph
            transactions={currentUserWallet.transactions}
            currentUserAddress={currentUser.walletAddress}
          />
        </Container>
      </RightPanel>
    </Wrapper>
  );
};

export default Index;
