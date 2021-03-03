import { UserType } from "../types/models";

export const loginUser = (walletAddress: string): UserType => {
  localStorage.setItem("walletAddress", walletAddress);

  return {
    walletAddress,
  };
};

export const logoutUser = () => {
  // remove the token from the local storage
  localStorage.removeItem("walletAddress");
};

export const getCurrentUser = (): UserType | null => {
  // get the current token address from the

  const walletAddress = localStorage.getItem("walletAddress");

  return walletAddress ? { walletAddress } : null;
};
