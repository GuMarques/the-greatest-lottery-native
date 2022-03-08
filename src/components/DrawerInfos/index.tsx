import { TextBoldItalic, TextItalic } from "@textComponents";
import { CustomView } from "./styles";

const DrawerInfos: React.FC<{ name: string; email: string }> = (props) => {
  const { name, email } = props;
  return (
    <CustomView>
      <TextBoldItalic size={18} color="#656566" style={{ marginBottom: 5 }}>
        {name}
      </TextBoldItalic>
      <TextItalic color="#656566" style={{ marginLeft: 5 }} >{email}</TextItalic>
    </CustomView>
  );
};

export default DrawerInfos;
