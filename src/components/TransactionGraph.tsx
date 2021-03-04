import React from "react";
import { Chart } from "react-charts";
import { Transaction } from "../types/models";
import { Decimal } from "decimal.js";
import { Container } from "@material-ui/core";
import styled from "styled-components";

type Props = {
  transactions: Transaction[];
  currentUserAddress: string;
};

const ChartContainer = styled.div`
  height: 500px;
  margin-top: 100px;
  width: 710px;
`;

const TransactionGraph: React.FC<Props> = ({
  transactions,
  currentUserAddress,
}) => {
  let runningTotal = new Decimal(0);

  const data = React.useMemo(
    () => ({
      label: "Series 1",
      data: transactions.map((v) => {
        if (currentUserAddress === v.toAddress) {
          runningTotal = new Decimal(v.amount).plus(runningTotal);
        } else {
          runningTotal = runningTotal.minus(new Decimal(v.amount));
        }

        return {
          primary: new Date(v.timestamp),
          secondary: runningTotal.toNumber(),
        };
      }),
    }),
    [transactions, currentUserAddress]
  );

  const series = React.useMemo(
    () => ({
      showPoints: true,
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "time",
        position: "bottom",
      },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    <ChartContainer>
      {data.data.length && <Chart data={[data]} series={series} axes={axes} />}
    </ChartContainer>
  );
};

export default TransactionGraph;
