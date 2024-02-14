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
import imagesStore from "../../store/imagesStore";
import userStore from "../../store/userStore";

type RootStackParamList = {
    [ROUTES.imageDetailed]: { id: string };
};

export const ImageDetailed: FC = observer(() => {
    const { params } =
        useRoute<RouteProp<RootStackParamList, "ImageDetailed">>();
    const { getImage, image } = imagesStore;
    const { getUser, user } = userStore;
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

    if (!image || !user) return null;

    return (
        <View style={styles.container}>
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
                    width: "90%",
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
                    }}
                >
                    <Text style={styles.title}>{image.title}</Text>
                    <Text
                        style={styles.text}
                    >{`by ${user.first_name} ${user.last_name}`}</Text>
                </View>
            </View>
            <Text style={styles.text}>{image.description}</Text>
            <TouchableOpacity style={styles.button}>
                <Text
                    style={{
                        color: "white",
                    }}
                >
                    Show other work
                </Text>
            </TouchableOpacity>
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
