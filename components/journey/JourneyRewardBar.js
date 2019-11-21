import React, { useContext, useEffect, Fragment } from "react"
import { Text, Badge, Button, Icon } from "native-base"
import { JourneyContext } from "./JourneyContext"
import GameDialog from "./GameDialog"
import Svg, { Circle, Path } from "react-native-svg"
import { initPoints } from "../../db/pointsService"
import * as firebase from "firebase"

const JourneyRewardBar = () => {
    const db = firebase.firestore()
    const { state, dispatch } = useContext(JourneyContext)
    const { currentAvailChance } = state
    const openGameDialog = () => {
        dispatch({
            type: "toggleGameDialog",
            open: true,
        })
        initPoints()
    }
    if (currentAvailChance === 0 || state.navigationToggleOpen) {
        return null
    }
    return (
        <Button
            onPress={() => openGameDialog()}
            icon
            style={{
                borderRadius: 50,
                width: 50,
                height: 50,
                position: "absolute",
                bottom: 120,
                marginLeft: 5,
                // left: 30,
                left: "2%",
                zIndex: 999,
                backgroundColor: "#966FD6",
            }}
        >
            <Badge
                danger
                style={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                }}
            >
                <Text>{currentAvailChance}</Text>
            </Badge>
            <Icon name="ios-gift" />
        </Button>
    )
}

export default JourneyRewardBar
