import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { observer } from "mobx-react-lite";
import { FormInput } from "../../shared/components/common/FormInput";
import { StyleSheet, View } from "react-native";
import { ButtonText } from "../../shared/components/ui";
import { FormValuesAuth, ROUTES, authSchema } from "../../shared/constants";
import { useAppNavigation } from "../../hooks";
import appStore from "../../store/appStore";

export const Auth: FC = observer(() => {
    const { inLogin, setToken } = appStore;
    const navigation = useAppNavigation();
    const form = useForm<FormValuesAuth>({
        resolver: yupResolver(authSchema),
        mode: "onSubmit",
    });
    const {
        handleSubmit,
        setError,
        formState: { errors },
    } = form;

    const onSubmit = (data: FormValuesAuth) => {
        const res = inLogin(data);
        if (res.status === 200 && res.accessToken) {
            setToken(res.accessToken);
            navigation.navigate(ROUTES.imageList);
            return;
        }
        if (res.status === 400) {
            setError("email", {
                type: "custom",
                message: res.message,
            });
            setError("password", {
                type: "custom",
                message: res.message,
            });
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <FormProvider {...form}>
            <ButtonText onPress={handleBack} style={{
                width: 100,
            }}>Back</ButtonText>
            <View style={styles.container}>
                <View style={styles.form}>
                    <FormInput name='email' label='Email' errors={errors} />
                    <FormInput
                        name='password'
                        secureTextEntry={true}
                        label='Password'
                        errors={errors}
                    />
                    <ButtonText
                        style={{
                            width: "100%",
                        }}
                        onPress={handleSubmit(onSubmit)}
                    >
                        Login
                    </ButtonText>
                </View>
            </View>
        </FormProvider>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        width: "60%",
        rowGap: 20,
    },
});
