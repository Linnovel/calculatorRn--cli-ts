import {Pressable, Text} from 'react-native';
import {colors, styles} from '../../config/theme/app-theme';

type ChildrenProps = {
  label: string;
  color?: string;
  doubleSizee?: boolean;
  blackText?: boolean;
  onPress: () => void;
};

const CalculatorButton = ({
  label,
  color = colors.darkGray,
  doubleSizee = false,
  blackText = false,
  onPress,
}: ChildrenProps) => {
  return (
    <Pressable
      onPress={() => onPress()}
      style={({pressed}) => ({
        ...styles.button,
        backgroundColor: color,
        width: doubleSizee ? 180 : 80,
        opacity: pressed ? 0.8 : 1,
      })}>
      <Text
        style={{
          ...styles.buttonText,
          color: blackText ? 'black' : 'white',
        }}>
        {label}
      </Text>
    </Pressable>
  );
};

export default CalculatorButton;
