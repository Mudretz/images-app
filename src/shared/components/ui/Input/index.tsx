import { forwardRef } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export const Input = forwardRef<TextInput, TextInputProps>(
    ({ style, ...props }, ref) => {
        return <TextInput {...props} ref={ref} style={[style, styles.input]} />;
    },
);

const styles = StyleSheet.create({
    input: {
        padding: 5,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
    },
});
