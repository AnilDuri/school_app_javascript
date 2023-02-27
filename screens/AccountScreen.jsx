import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Button, View, Text } from "native-base";
import { useState } from "react";

import { supabase } from "../services/supabaseClient";

export default AccountScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const signOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error Message");
      return;
    }
    setIsLoading(false);
    navigation.navigate("Login");
  };
  return (
    <View>
      <Text>Account</Text>
      <Button mt={5} isLoading={isLoading} onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </Button>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};
