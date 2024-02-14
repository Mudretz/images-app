import { FC, useEffect } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import imagesStore from "../../store/imagesStore";
import { Images } from "../../shared/types";
import { observer } from "mobx-react-lite";
import { useAppNavigation } from "../../hooks";
import { ROUTES } from "../../shared/constants";

export const ImageList: FC = observer(() => {
    const navigation = useAppNavigation();
    const { getImages, images, limit, increaseLimit } = imagesStore;

    useEffect(() => {
        getImages();
    }, [limit]);

    const handleShowDetail = (id: string) => {
        navigation.navigate(ROUTES.imageDetailed, {
            id: id,
        });
    };

    const renderItem = ({ item }: { item: Images }) => {
        return (
            <Pressable onPress={() => handleShowDetail(item.id)}>
                <Image
                    key={item.id}
                    height={250}
                    style={{
                        width: "100%",
                    }}
                    source={{
                        uri: item.url,
                    }}
                />
            </Pressable>
        );
    };

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <FlatList
                style={{ flexGrow: 1 }}
                data={images}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                initialNumToRender={3}
                maxToRenderPerBatch={5}
                windowSize={5}
                onEndReached={() => increaseLimit()}
            />
        </View>
    );
});
