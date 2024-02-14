import { FC } from "react";
import { Text, View } from "react-native";

export const Error: FC = () => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>Произошла ошибка, попробуйте позже</Text>
        </View>
    );
};
