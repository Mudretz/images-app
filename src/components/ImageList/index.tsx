import { FC, useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import imagesStore from "../../store/imagesStore";
import { Images } from "../../shared/types";
import { observer } from "mobx-react-lite";

export const ImageList: FC = observer(() => {
    const { getImages, images, limit, increaseLimit } = imagesStore;
    useEffect(() => {
        getImages();
    }, [limit]);

    const renderItem = ({ item }: { item: Images }) => {
        return (
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
        );
    };

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "black",
            }}
        >
            <Text>Текст</Text>
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
