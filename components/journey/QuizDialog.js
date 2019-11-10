import React, { Fragment, useState, useRef, useContext, useEffect } from "react"
import { StyleSheet } from "react-native"
import { View, Text, Button } from "native-base"

const styles = StyleSheet.create({
    title: {
        color: "#C22259",
        fontSize: 56,
        marginTop: 60,
        fontFamily: "Roboto_medium",
    },
})

const QuizDialog = () => {
    const possibleAnswers = [
        {
            ans: "City Hall",
        },
        {
            ans: "Jurong East",
        },
        {
            ans: "Tampines",
        },
        {
            ans: "Chinatown",
        },
    ]
    return (
        <Fragment
            style={{
                alignItem: "center",
                display: "flex",
                backgroundColor: "#fff",
            }}
        >
            <Text style={styles.title}>{"< LUCKY >"}</Text>
            <Text
                style={{
                    fontSize: 30,
                    color: "#0D0D0D",
                    fontFamily: "Roboto",
                    fontWeight: "400",
                }}
            >
                Question
            </Text>
            <Text
                style={{
                    width: 250,
                    color: "#363636",
                    fontFamily: "Roboto",
                    fontWeight: "200",
                    fontSize: 21,
                }}
            >
                What is the MRT stop after Tanjong Pagar on the East West Line
            </Text>
            <View
                style={{
                    display: "flex",
                    zIndex: 9200,
                    flexGrow: 1,
                    width: "90%",
                    paddingLeft: 30,
                    paddingRight: 30,
                    marginBottom: 15,
                    alignItems: "stretch",
                    // marginLeft: "5%",
                    backgroundColor: "#966fd6",
                }}
            >
                <View
                    style={{
                        width: "100%",
                        // alignItems: "stretch",
                        display: "flex",
                    }}
                >
                    {possibleAnswers.map((answer, idx) => {
                        return (
                            <View
                                style={{
                                    height: 50,
                                    flexDirection: "row",
                                    width: "100%",
                                    backgroundColor: "#fff",
                                }}
                            >
                                <Text>{idx}</Text>
                                <Text>{answer.ans}</Text>
                            </View>
                        )
                    })}
                </View>
                <Button
                    style={{
                        backgroundColor: "#fff",
                    }}
                >
                    <Text
                        style={{
                            color: "#c22259",
                        }}
                    >
                        Submit Answer
                    </Text>
                </Button>
            </View>
        </Fragment>
    )
}

export default QuizDialog
