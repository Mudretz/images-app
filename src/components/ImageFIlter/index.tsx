import { FC } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface ImageFilterProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
}

export const ImageFilter: FC<ImageFilterProps> = ({
    value,
    onChange,
    onClear,
}) => {
    return (
        <View
            style={{
                paddingHorizontal: 20,
                paddingBottom: 10,
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
            />
            <TouchableOpacity onPress={onClear}>
                <Text
                    style={{
                        fontSize: 18,
                    }}
                >
                    Clear
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "black",
        fontSize: 18,
    },
});
