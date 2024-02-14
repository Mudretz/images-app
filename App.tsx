import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { Navigation } from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function App(): React.JSX.Element {
    return (
        <GestureHandlerRootView
            style={{
                flex: 1,
            }}
        >
            <NavigationContainer>
                <SafeAreaView
                    style={{
                        flex: 1,
                    }}
                >
                    <StatusBar />

                    <Navigation />
                </SafeAreaView>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export default App;
