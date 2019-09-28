import React, { useState, useContext } from "react"
import { StyleSheet } from "react-native"
import { Item, Button, Text } from "native-base"
import { SearchBarContext } from "./SearchBarContext"
const SearchBar = () => {
    const { state, dispatch } = useContext(SearchBarContext)
    return (
        <Item rounded style={styles.noInput}>
            <Button
                transparent
                onPress={() => {
                    console.log("Toggle search bar")
                    dispatch({ type: "toggleSearchBar" })
                }}
                style={{
                    width: "100%",
                    // borderColor: "transparent",
                    // color: "transparent",
                    // backgroundColor: "transparent",
                }}
                placeholder="Search"
            >
                <Text>Search</Text>
            </Button>
        </Item>
    )
}

const styles = StyleSheet.create({
    noInput: {
        width: 200,
        alignItems: "center",
    },
})

export default SearchBar
