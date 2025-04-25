import { View } from "react-native";
import { Text } from "react-native-paper";

const Lesson = ({ route }) => {
  const courseId = route.params?.courseId;

  return (
    <View>
      <Text>Danh sách bài học {courseId}</Text>
    </View>
  );
};

export default Lesson;
