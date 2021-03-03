import React from "react";
import {
  Container,
  Avatar,
  TextField,
  Button,
  Card,
  createStyles,
  makeStyles,
} from "@material-ui/core";
import styled from "styled-components";
import { loginUser } from "../features/user/geese";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
interface indexProps {}

const StyledCard = styled(Card)`
  width: 300px;
  margin: 150px auto;
`;

const ImageContainer = styled.div`
  margin: 20px auto;
`;

const StyledAvatar = styled(Avatar)`
  margin: auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  Button {
    margin-top: 30px;
  }
`;

// cant change avatar using styled components
const useStyles = makeStyles(() =>
  createStyles({
    large: {
      width: "150px",
      height: "150px",
    },
  })
);

const Index: React.FC<indexProps> = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const classes = useStyles();
  const onSubmit = (data: { walletAddress: string }) => {
    dispatch(loginUser(data.walletAddress));
  };

  return (
    <Container maxWidth="sm">
      <StyledCard>
        <ImageContainer>
          <StyledAvatar className={classes.large}>J</StyledAvatar>
        </ImageContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Controller
            as={TextField}
            label="Wallet Address"
            name="walletAddress"
            control={control}
            defaultValue=""
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </StyledForm>
      </StyledCard>
    </Container>
  );
};

export default Index;
