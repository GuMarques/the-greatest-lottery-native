import { TextBoldItalic } from "@textComponents";
import CustomColors from "@constants/CustomColors";
import { CustomView, ForContainer } from "./styles";

const Title: React.FC<{}> = (props) => {
  return (
    <CustomView>
      <TextBoldItalic
        size={50}
        color={CustomColors.secondary}
        style={{ textAlign: "center" }}
      >
        The Greatest App
      </TextBoldItalic>
      <ForContainer>
        <TextBoldItalic
          size={18}
          color={"#FFFFFF"}
          style={{ textAlign: "center" }}
        >
          for
        </TextBoldItalic>
      </ForContainer>
      <TextBoldItalic
        size={54}
        color={CustomColors.secondary}
        style={{ textAlign: "center" }}
      >
        {" "}
        LOTTERY{" "}
      </TextBoldItalic>
    </CustomView>
  );
};

export default Title;
