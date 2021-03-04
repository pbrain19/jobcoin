import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/selectors";
import styled from "styled-components";
import { TextField, Button } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { createTransaction } from "../features/crypto/geese";
import { UserType } from "../types/models";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;

  Button {
    margin-top: 30px;
  }
`;

const TransactionForm: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser) as UserType;
  const dispatch = useDispatch();
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = ({ to, amount }: { to: string; amount: string }) => {
    reset();
    dispatch(
      createTransaction({
        toAddress: to,
        amount,
        fromAddress: currentUser.walletAddress,
      })
    );
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={TextField}
        label="Destination Address"
        name="to"
        control={control}
        defaultValue=""
      />
      <Controller
        as={TextField}
        label="Amount to send"
        name="amount"
        control={control}
        defaultValue=""
      />
      <Button variant="contained" color="primary" type="submit">
        Send Jobcoin
      </Button>
    </StyledForm>
  );
};

export default TransactionForm;
