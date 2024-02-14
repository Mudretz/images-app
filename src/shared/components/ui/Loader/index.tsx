import { FC } from "react";
import { ActivityIndicator, View } from "react-native";

export const Loader: FC = () => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <ActivityIndicator size={"large"}/>
        </View>
    );
};
