import React, { useContext } from "react"
import { JourneyContext } from "../JourneyContext"
import { Button, Text, Icon } from "native-base"
const ContinueNavigateButton = () => {
    const { state, dispatch } = useContext(JourneyContext)
    const closeDialog = () => {
        dispatch({
            type: "toggleGameDialog",
            open: false,
        })
    }
    return (
        <Button
            onPress={closeDialog}
            style={{
                marginTop: 30,
                width: 180,
                height: 56,
                borderRadius: 20,
                alignItems: "center",
                backgroundColor: "#c22259",
                zIndex: 300,
                position: "relative",
            }}
            iconRight
        >
            <Text
                style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "200",
                    fontFamily: "Roboto",
                }}
            >
                Continue Navigation
            </Text>
            <Icon
                style={{
                    fontSize: 32,
                }}
                name="ios-arrow-round-forward"
            />
        </Button>
    )
}
export default ContinueNavigateButton
