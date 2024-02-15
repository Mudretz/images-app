import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ImageList } from "../components/ImageList";
import { ROUTES } from "../shared/constants";
import { ImageDetailed } from "../components/ImageDetailed";
import { Auth } from "../components/Auth";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: "slide_from_right",
                animationTypeForReplace: "push",
                headerShown: false,
            }}
        >
            <Stack.Screen name={ROUTES.imageList} component={ImageList} />
            <Stack.Screen
                name={ROUTES.imageDetailed}
                component={ImageDetailed}
            />
            <Stack.Screen name={ROUTES.auth} component={Auth} />
        </Stack.Navigator>
    );
};
