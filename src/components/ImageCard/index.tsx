import { FC, memo } from "react";
import { Image, Pressable } from "react-native";
import { Images } from "../../shared/types";

interface ImageCardProps {
    item: Images;
    switchState: boolean;
    onClick: (id: string) => void;
}

export const ImageCard: FC<ImageCardProps> = memo(
    ({ item, switchState, onClick }) => {
        return (
            <Pressable
                onPress={() => onClick(item.id)}
                style={{
                    width: switchState ? "50%" : "100%",
                }}
            >
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
    },
);
