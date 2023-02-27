import { View, Text } from "native-base";
import { StyleSheet } from "react-native";

export default function Classes() {
  return (
    <View style={styles.container}>
      <Text>Classes Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
