import styled from "styled-components/native";

interface IError {
  error?: boolean;
}

export const CustomInput = styled.TextInput<IError>`
  background-color: white;
  color: ${({ error }) => (error ? "red" : "#000")};
  font-family: "helvetica-bold-italic";
  font-size: 17px;
  padding-left: 30px;
  padding-top: 34px;
  padding-bottom: 26.5px;
  border-bottom-color: ${({ error }) => (error ? "red" : "#ebebeb")};
  border-bottom-width: ${({ error }) => (error ? "2px" : "1px")}  ;
`;
