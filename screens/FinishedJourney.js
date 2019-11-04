import React, { useEffect } from "react"
import { View, Text, H1, Button } from "native-base"
import { withNavigation } from "react-navigation"
import { endJourney } from "../db/journeyService"

const FinishedJourney = ({ navigation }) => {
    useEffect(() => {
        endJourney()
    }, [])
    const backToHome = () => {
        navigation.navigate("Home")
    }
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <H1>Congratulations!</H1>
            <Text>You have completed your journey</Text>
            <Button
                style={{
                    marginTop: 20,
                }}
                onPress={backToHome}
            >
                <Text>Back to Home</Text>
            </Button>
        </View>
    )
}

export default withNavigation(FinishedJourney)
