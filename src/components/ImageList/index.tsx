import { FC, useEffect, useState } from "react";
import {
    FlatList,
    Text,
    View,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useAppNavigation } from "../../hooks";
import { ROUTES } from "../../shared/constants";
import { Error } from "../../shared/components/ui";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageCard } from "../ImageCard";
import { useDebounce } from "../../hooks/useDebouce";
import { ImageFilter } from "../ImageFIlter";
import imagesStore from "../../store/imagesStore";
import appStore from "../../store/appStore";

export const ImageList: FC = observer(() => {
    const navigation = useAppNavigation();
    const {
        getImages,
        getFilterImages,
        images,
        filterImages,
        limit,
        increaseLimit,
        isError,
    } = imagesStore;
    const { switchNumberColumn, twoColumns } = appStore;
    const [value, setValue] = useState("");

    useEffect(() => {
        getImages();
    }, [limit]);

    useEffect(() => {
        getFilterImages(value);
    }, [useDebounce(value)]);

    const handleShowDetail = (id: string) => {
        navigation.navigate(ROUTES.imageDetailed, {
            id: id,
        });
    };

    const handleChangeValue = (v: string) => {
        setValue(v);
    };

    const handleClear = () => {
        setValue("");
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
            <ImageFilter
                value={value}
                onChange={handleChangeValue}
                onClear={handleClear}
            />
            <FlatList
                style={{ flexGrow: 1 }}
                data={!!useDebounce(value) ? filterImages : images}
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
