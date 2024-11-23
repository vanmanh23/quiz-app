import { Image, Pressable, StyleSheet, Text, View } from "react-native";
// import { Heading } from "../../../../components";
import { Image as ImageType } from "../../../data/types";
import { Heading } from "../../../components";
import { styles } from "../../../components/Icons/styles";

export interface AchievementProps {
  userName: string;
  testName: string;
  score: number;
  timeDuration: number;
  dayfinished: string;
}

export function AchievementCard({
  userName,
  testName,
  score,
  timeDuration,
  dayfinished,
}: AchievementProps) {
  const daywork = formatDate(dayfinished);
  return (
    <View style={achievementCard.root}>
        <Text style={achievementCard.textstyle}>Name: {userName}</Text>
        <Text style={achievementCard.textstyle}>Test name: {testName}</Text>
        <Text style={achievementCard.textstyle}>Scores: {score}</Text>
        <Text style={achievementCard.textstyle}>Completion time: {timeDuration}</Text>
        <Text style={achievementCard.textstyle}>Workday: {daywork}</Text>
    </View>
  );
}

export const formatDate = (day: string) => {
  const date = new Date(day);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  return formattedDate;
}
const achievementCard = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    borderColor: "#cbd2d9",
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: "#a29bfe",
  },
  textstyle: {
    marginBottom: 3,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#525252",
  }
});
