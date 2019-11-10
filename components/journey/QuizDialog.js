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
                alignItems: "center",
                display: "flex",
                backgroundColor: "#fff",
                zIndex: 99999,
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
                    display: "flex",
                    alignSelf: "center",
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
                    marginTop: 40,
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
                                    marginTop: 15,
                                    borderRadius: 30,
                                    height: 50,
                                    flexDirection: "row",
                                    width: "100%",
                                    backgroundColor: "#fff",
                                    alignContent: "center",
                                }}
                            >
                                <View
                                    style={{
                                        width: 30,
                                        height: 30,
                                        backgroundColor: "#966FD6",
                                        borderRadius: 30,
                                        marginLeft: 10,
                                        marginTop: 10,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 21,
                                            fontFamily: "Roboto",
                                            color: "#fff",
                                        }}
                                    >
                                        {idx}
                                    </Text>
                                </View>
                                <Text
                                    style={{
                                        marginTop: 10,
                                        marginLeft: 10,
                                        fontSize: 20,
                                        color: "#030303",
                                    }}
                                >
                                    {answer.ans}
                                </Text>
                            </View>
                        )
                    })}
                </View>
                <Button
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 30,
                        marginTop: 10,
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "#c22259",
                            fontSize: 20,
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
