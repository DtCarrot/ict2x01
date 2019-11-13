import React, { Fragment, useContext } from "react"
import { List, ListItem, Text, Left, Body, Button, Icon } from "native-base"
import { SearchBarContext } from "./SearchBarContext"
const GOOGLE_DIRECTION_API_KEY = "AIzaSyC2lJ_zm7nE5mU0252mbfbJd1BebTxTDu8"

const SearchSuggestions = () => {
    const { state, dispatch } = useContext(SearchBarContext)
    const personalizedSelections = ["Home", "Office"]
    const personalizedRender = () => {
        return personalizedSelections.map((pObj, idx) => {
            return (
                <ListItem key={idx} icon>
                    <Left>
                        <Button style={{ backgroundColor: "#007AFF" }}>
                            <Icon active name="wifi" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{pObj}</Text>
                    </Body>
                </ListItem>
            )
        })
    }
    const selectSuggestedPlace = async placeObj => {
        const { place_id, description } = placeObj
        const placeUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_DIRECTION_API_KEY}&place_id=${place_id}`
        const result = await fetch(placeUrl)
        const placeJSON = await result.json()
        const {
            result: {
                geometry: {
                    location: { lat, lng },
                },
            },
        } = placeJSON
        const selectedPlaceObj = {
            lat,
            lng,
            description,
        }
        dispatch({ type: "setTargetLocation", placeObj: selectedPlaceObj })
        dispatch({
            type: "toggleSearchBar",
        })
    }
    const renderPlaceSuggestions = places => {
        return places.map((obj, idx) => (
            <ListItem key={idx}>
                <Text onPress={() => selectSuggestedPlace(obj)}>{obj.description}</Text>
            </ListItem>
        ))
    }
    const personalRender = personalizedRender()
    const placeSuggestions = renderPlaceSuggestions(state.places)
    return (
        <List>
            <Fragment>{personalRender}</Fragment>
            <Fragment>{placeSuggestions}</Fragment>
        </List>
    )
}

export default SearchSuggestions
