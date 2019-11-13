import React, { useRef, useState, useContext, useEffect } from "react"
import { StyleSheet } from "react-native"
import { Content, Item, Button, Input } from "native-base"
import { SearchBarContext } from "./SearchBarContext"
import SearchSuggestions from "./SearchSuggestions"
const GOOGLE_DIRECTION_API_KEY = "AIzaSyC2lJ_zm7nE5mU0252mbfbJd1BebTxTDu8"
const sgLat = "1.290270"
const sgLng = "103.851959"

const SearchBarOverlay = () => {
    const { state, dispatch } = useContext(SearchBarContext)
    const searchInput = useRef(null)
    if (state.showSearchBar) {
        console.log(searchInput.current._root.focus())
        // searchInput.current._textInput.focus()
    } else {
        if (searchInput.current !== null) {
            searchInput.current._root.blur()
        }
    }
    let contentStyle = {}
    if (state.showSearchBar) {
        contentStyle = {
            ...contentStyle,
            ...styles.show,
            zIndex: 9999,
        }
    } else {
        contentStyle = {
            ...contentStyle,
            ...styles.hide,
            zIndex: 1,
        }
    }
    contentStyle = {
        ...contentStyle,
        position: "absolute",
        flex: 1,
        width: "100%",
        left: 0,
        top: 0,
        height: "100%",
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#F5F5F5",
    }
    const onChangeText = async e => {
        console.log(e.nativeEvent.text)
        const { text } = e.nativeEvent
        const autocompleteURL = "https://maps.googleapis.com/maps/api/place/queryautocomplete/json"
        const formedUrl = `${autocompleteURL}?input=${e.nativeEvent.text}+near%singapore&key=${GOOGLE_DIRECTION_API_KEY}&location=${sgLat},${sgLng}`
        const resp = await fetch(formedUrl)
        const respJSON = await resp.json()
        const { predictions } = respJSON
        const placesJSON = predictions.map(prediction => {
            return {
                id: prediction.id,
                description: prediction.description,
                place_id: prediction.place_id,
            }
        })
        console.log("Places: ", placesJSON)
        dispatch({ type: "changePlace", places: placesJSON })
        // console.log("JSON response: ", respJSON)
    }
    return (
        <Content style={contentStyle}>
            <Item rounded style={styles.input}>
                <Input onChange={onChangeText} ref={searchInput} placeholder="Go where?" />
            </Item>
            <SearchSuggestions />
        </Content>
    )
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        marginTop: 30,
        alignItems: "stretch",
        backgroundColor: "#fff",
    },
    hide: {
        display: "none",
    },
    show: {
        display: "flex",
    },
})

export default SearchBarOverlay
