import { FC, useEffect } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { Images } from "../../shared/types";
import { observer } from "mobx-react-lite";
import { useAppNavigation } from "../../hooks";
import { ROUTES } from "../../shared/constants";
import { Error } from "../../shared/components/ui";
import { TouchableOpacity } from "react-native-gesture-handler";
import imagesStore from "../../store/imagesStore";
import appStore from "../../store/appStore";
import { ImageCard } from "../ImageCard";

export const ImageList: FC = observer(() => {
    const navigation = useAppNavigation();
    const { getImages, images, limit, increaseLimit, isError } = imagesStore;
    const { switchNumberColumn, twoColumns } = appStore;
    
    useEffect(() => {
        getImages();
    }, [limit]);

    const handleShowDetail = (id: string) => {
        navigation.navigate(ROUTES.imageDetailed, {
            id: id,
        });
    };

    if (isError) return <Error />;

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <TouchableOpacity
                onPress={switchNumberColumn}
                style={{
                    backgroundColor: "black",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontSize: 18,
                    }}
                >
                    Switch
                </Text>
            </TouchableOpacity>
            <FlatList
                style={{ flexGrow: 1 }}
                data={images}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ImageCard
                        item={item}
                        onClick={handleShowDetail}
                        switchState={twoColumns}
                    />
                )}
                initialNumToRender={twoColumns ? 6 : 3}
                maxToRenderPerBatch={twoColumns ? 10 : 5}
                windowSize={twoColumns ? 10 : 5}
                onEndReached={() => increaseLimit()}
                numColumns={twoColumns ? 2 : 1}
                key={twoColumns ? "two-columns" : "one-columns"}
            />
        </View>
    );
});
