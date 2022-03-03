import { View, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { ModalView, ModalButton, ButtonView } from "./styles";
import { Text } from "@textComponents";

const CustomModal: React.FC<{
  isVisible: boolean;
  text: string;
  onModalHideHandler?: () => void;
  secondButton?: {
    title: string;
    color: string;
    buttonHandler: () => void;
  };
  setModalVisible: () => void;
}> = (props) => {
  const { isVisible, text, setModalVisible, secondButton, onModalHideHandler } =
    props;
  const width = Dimensions.get("window").width * 0.8;
  const height = Dimensions.get("window").height * 0.3;

  return (
    <View>
      <Modal
        isVisible={isVisible}
        onBackdropPress={setModalVisible}
        onModalHide={onModalHideHandler ? onModalHideHandler : undefined}
        backdropOpacity={0.35}
        coverScreen={true}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <ModalView width={width} height={height} style={{ elevation: 5 }}>
          <Text size={20} style={{ textAlign: "center", marginTop: "auto" }}>
            {text}
          </Text>
          <ButtonView doubleButton={!!secondButton}>
            <ModalButton activeOpacity={0.4} onPress={setModalVisible}>
              <Text style={{ textAlign: "center" }}>OK</Text>
            </ModalButton>
            {secondButton && (
              <ModalButton
                activeOpacity={0.4}
                onPress={secondButton.buttonHandler}
              >
                <Text>{secondButton.title}</Text>
              </ModalButton>
            )}
          </ButtonView>
        </ModalView>
      </Modal>
    </View>
  );
};

export default CustomModal;
