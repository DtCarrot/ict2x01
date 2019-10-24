import React, { useContext, useEffect } from "react"
import { Text, Badge, Button, Icon } from "native-base"
import { JourneyContext } from "./JourneyContext"
import GameDialog from "./GameDialog"
import Svg, { Circle, Path } from "react-native-svg"

const JourneyRewardBar = () => {
    const { state, dispatch } = useContext(JourneyContext)
    const openGameDialog = () => {
        dispatch({
            type: "toggleGameDialog",
            open: true,
        })
    }
    return (
        <Button
            onPress={() => openGameDialog()}
            icon
            style={{
                borderRadius: 10,
                width: 50,
                height: 50,
                position: "absolute",
                bottom: 30,
                left: 30,
                zIndex: 999,
            }}
        >
            <Badge
                danger
                style={{
                    position: "absolute",
                    top: -15,
                    right: -15,
                }}
            >
                <Text>1</Text>
            </Badge>
            <Icon name="beer" />
        </Button>
    )
}

export default JourneyRewardBar
