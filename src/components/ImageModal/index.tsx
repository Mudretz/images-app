import { FC } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import {
    Gesture,
    GestureDetector,
    gestureHandlerRootHOC,
} from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";

interface ImageModalProps {
    onHide: () => void;
    url: string;
}

export const ImageModal = gestureHandlerRootHOC(
    ({ onHide, url }: ImageModalProps) => {
        const scale = useSharedValue(1);
        const savedScale = useSharedValue(1);

        const translateX = useSharedValue(0);
        const translateY = useSharedValue(0);
        const initialTranslateX = useSharedValue(0);
        const initialTranslateY = useSharedValue(0);

        const panGesture = Gesture.Pan()
            .maxPointers(1)
            .onStart(() => {
                initialTranslateX.value = translateX.value;
                initialTranslateY.value = translateY.value;
            })
            .onUpdate((e) => {
                translateX.value = initialTranslateX.value + e.translationX / 2;
                translateY.value = initialTranslateY.value + e.translationY / 2;
            });

        const pinch = Gesture.Pinch()
            .onUpdate((e) => {
                const newScale = savedScale.value * e.scale;
                scale.value = newScale < 1 ? 1 : newScale;
            })
            .onEnd(() => {
                savedScale.value = scale.value;
            });

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [
                { scale: scale.value },
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        }));

        return (
            <>
                <Pressable
                    style={{
                        backgroundColor: "black",
                    }}
                    onPress={onHide}
                >
                    <Text
                        style={{
                            marginTop: 20,
                            marginLeft: 20,
                            color: "white",
                            fontSize: 24,
                        }}
                    >
                        Back
                    </Text>
                </Pressable>
                <GestureDetector gesture={panGesture}>
                    <View>
                        <GestureDetector gesture={pinch}>
                            <Animated.Image
                                style={[
                                    animatedStyle,
                                    {
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: "black",
                                    },
                                ]}
                                resizeMode='contain'
                                source={{
                                    uri: url,
                                }}
                            />
                        </GestureDetector>
                    </View>
                </GestureDetector>
            </>
        );
    },
);
