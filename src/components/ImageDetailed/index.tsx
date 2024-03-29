import { FC, useEffect, useState } from "react";
import {
    Image,
    Pressable,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { ROUTES } from "../../shared/constants";
import { ImageModal } from "../ImageModal";
import { useAppNavigation } from "../../hooks";
import { Error, Loader } from "../../shared/components/ui";
import imagesStore from "../../store/imagesStore";
import userStore from "../../store/userStore";

type RootStackParamList = {
    [ROUTES.imageDetailed]: { id: string };
};

export const ImageDetailed: FC = observer(() => {
    const navigation = useAppNavigation();
    const { params } =
        useRoute<RouteProp<RootStackParamList, "ImageDetailed">>();
    const {
        getImage,
        image,
        isLoading: isLoadingImage,
        isError: isErrorImage,
    } = imagesStore;
    const { getUser, user, isLoading, isError } = userStore;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getImage(params.id);
    }, []);

    useEffect(() => {
        if (image?.user) {
            getUser(image.user);
        }
    }, [image]);

    const onHide = () => {
        setOpen(!open);
    };

    const handleBack = () => {
        navigation.goBack();
    };

    if (isLoading || isLoadingImage) return <Loader />;
    if (isErrorImage || isError) return <Error />;
    if (!image || !user) return null;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBack}>
                <Text style={styles.text}>Back</Text>
            </TouchableOpacity>
            <Pressable onPress={onHide}>
                <Image
                    height={250}
                    style={{
                        width: "100%",
                        borderRadius: 10,
                    }}
                    source={{
                        uri: image.url,
                    }}
                />
            </Pressable>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 10,
                }}
            >
                <Image
                    height={50}
                    width={50}
                    borderRadius={50}
                    source={{
                        uri: user.profile_picture,
                    }}
                />
                <View
                    style={{
                        rowGap: 10,
                        width: "80%",
                    }}
                >
                    <Text style={styles.title}>{image.title}</Text>
                    <Text
                        style={styles.text}
                    >{`by ${user.first_name} ${user.last_name}`}</Text>
                </View>
            </View>
            <Text style={styles.text}>{image.description}</Text>
            <Modal visible={open} onRequestClose={onHide}>
                <ImageModal onHide={onHide} url={image.url} />
            </Modal>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
        rowGap: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "black",
    },
    text: {
        fontSize: 18,
        color: "black",
    },
    button: {
        backgroundColor: "black",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 30,
    },
});
