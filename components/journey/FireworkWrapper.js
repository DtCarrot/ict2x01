import React from "react"
import { View } from "react-native"
import FireworkComponent from "./FireworksSvg"

const FireworkWrapper = ({ position }) => {
    const styleKeys = {
        "top-right": {
            top: -10,
            right: -10,
            transform: [
                {
                    rotateZ: "45deg",
                },
            ],
        },
        "top-left": {
            top: -10,
            left: -10,
            transform: [
                {
                    rotateZ: "-45deg",
                },
            ],
        },
        "bottom-left": {
            bottom: -10,
            left: -10,
            transform: [
                {
                    rotateZ: "-135deg",
                },
            ],
        },
        "bottom-right": {
            bottom: -10,
            right: -10,
            transform: [
                {
                    rotateZ: "135deg",
                },
            ],
        },
    }
    const style = {
        ...styleKeys[position],
        position: "absolute",
    }
    return (
        <View style={style}>
            <FireworkComponent />
        </View>
    )
}

export default FireworkWrapper
