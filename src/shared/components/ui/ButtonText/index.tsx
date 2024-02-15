import { FC } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export const ButtonText: FC<TouchableOpacityProps> = ({
    onPress,
    children,
    style,
    ...props
}) => {
    return (
        <TouchableOpacity
            {...props}
            onPress={onPress}
            style={[{
                backgroundColor: "black",
                paddingHorizontal: 20,
                paddingVertical: 10,
            }, style]}
        >
            <Text
                style={{
                    color: "white",
                    fontSize: 18,
                }}
            >
                {children}
            </Text>
        </TouchableOpacity>
    );
};
