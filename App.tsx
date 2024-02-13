/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { ImageList } from "./src/components/ImageList";

function App(): React.JSX.Element {
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <StatusBar />
            <ImageList />
        </SafeAreaView>
    );
}

export default App;
