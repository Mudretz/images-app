import { FC } from "react";
import { StyleSheet, Text, TextInputProps, View } from "react-native";
import { Input } from "../../ui";
import {
    Controller,
    FieldErrors,
    FieldValues,
    useFormContext,
} from "react-hook-form";

interface FormInputProps extends TextInputProps {
    name: string;
    label?: string;
    errors: FieldErrors<FieldValues>;
}

export const FormInput: FC<FormInputProps> = ({
    name,
    label,
    errors,
    ...props
}) => {
    const { control } = useFormContext();

    const getErrorMessage = (name: string): string | undefined => {
        if (errors[name]) {
            return errors[name]?.message as string | undefined; // Приведение типа, предполагая, что message является строкой
        }
        return undefined;
    };

    return (
        <View
            style={{
                rowGap: 5,
            }}
        >
            {label && <Text style={styles.label}>{label}</Text>}
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value, ...rest } }) => (
                    <Input
                        {...props}
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                )}
            />
            {getErrorMessage(name) && (
                <Text style={styles.error}>{getErrorMessage(name)}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        color: "black",
    },
    error: {
        fontSize: 16,
        color: "red",
    },
});
