import { FC, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useAppNavigation } from "../../hooks";
import { ROUTES } from "../../shared/constants";
import { ButtonText, Error } from "../../shared/components/ui";
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
    const { switchNumberColumn, twoColumns, isAuth, logOut } = appStore;
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

    const handleAuth = () => {
        if (!isAuth) {
            navigation.navigate(ROUTES.auth);
        } else {
            logOut();
        }
    };

    if (isError) return <Error />;

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "black",
                }}
            >
                <ButtonText onPress={switchNumberColumn}>Switch</ButtonText>
                {isAuth ? (
                    <ButtonText onPress={handleAuth}>Exit</ButtonText>
                ) : (
                    <ButtonText onPress={handleAuth}>Login</ButtonText>
                )}
            </View>
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
