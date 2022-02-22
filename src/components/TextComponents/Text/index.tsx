import { TextProps } from "react-native";
import styled from "styled-components/native";

interface IText {
  size?: number;
  color?: string;
}

interface CustomProps extends TextProps {
  size?: number;
  color?: string;
}

const CustomText = styled.Text<IText>`
  font-family: "helvetica";
  font-size: ${({ size }) => (size !== undefined ? size + "px" : "16px")};
  color: ${({ color }) => (color !== undefined ? color : "black")};
`;

const Text: React.FC<CustomProps> = (props) => {
  const { size, color, style } = props;
  return (
    <CustomText size={size} color={color} style={style}>
      {props.children}
    </CustomText>
  );
};

export default Text;
