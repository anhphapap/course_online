import { useState } from "react"
import { View } from "react-native"

const Lesson = ({route}) => {
    const courseId = route.params?.courseId;

    return (
        <View>
            <Text>Danh sách bài học {courseId}</Text>
        </View>
    )
}