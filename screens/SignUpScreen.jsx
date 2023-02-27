import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";

import { supabase } from "../services/supabaseClient";

export const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    setLoading(false);
  };

  return (
    <Box flex={1}>
      <Center flex={1}>
        <Box w="100%" p={2}>
          <Heading
            size="xl"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Lets get you signed up!
          </Heading>
          <Center>
            <VStack space={3} mt="5" w="90%">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  type="text"
                  size="2xl"
                  autoFocus
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type="password"
                  autoCapitalize="none"
                  size="2xl"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input type="password" size="2xl" />
              </FormControl>
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={signUp}
                isLoading={loading}
              >
                Sign up
              </Button>
              <HStack justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Already have an account?{" "}
                </Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                  <Text color="indigo.500" fontWeight="medium" fontSize="sm">
                    Log in
                  </Text>
                </Pressable>
              </HStack>
            </VStack>
          </Center>
        </Box>
      </Center>
    </Box>
  );
};
