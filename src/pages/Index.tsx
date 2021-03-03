import {
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/selectors";
import styled from "styled-components";
import logo from "../logo.png";

interface indexProps {}

const StyledCard = styled(Card)`
  width: 300px;
  margin: 50px auto;
`;
const StyledMedia = styled(CardMedia)`
  height: 300px;
`;
const Index: React.FC<indexProps> = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Container maxWidth="sm">
      <StyledCard>
        <StyledMedia image={logo} title="Pueblo logo" />
        <CardContent>
          <Typography align="center" variant="h5">
            Enter Beta
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            href={`${process.env.REACT_APP_API_URL}/auth/google`}
            variant="contained"
            color="primary"
            fullWidth
          >
            Login with Google
          </Button>
        </CardActions>
      </StyledCard>
    </Container>
  );
};

export default Index;
