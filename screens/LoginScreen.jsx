import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { supabase } from "../services/supabaseClient";

export const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    let { error, data } = await supabase.auth.signInWithPassword({
      email: "anilduri.a@gmail.com",
      password: "password",
    });
    if (error) return;
    let {  user } = data;
    setLoading(false);
    navigation.navigate("Home", { screen: "HomeTab", params: { user } });
  };

  const [show, setShow] = useState(false);
  return (
    <Box flex="1" safeArea>
      <Center flex={1} w="100%">
        <Box w="100%" p={2}>
          <Heading size="xl" fontWeight="600">
            Welcome to MySchoolApp
          </Heading>
          <Heading mt="1" fontWeight="medium" size="md">
            Sign in to continue!
          </Heading>
          <Center>
            <VStack space={4} mt={10} w="90%">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input type="text" size="2xl" autoFocus autoCapitalize="none" />
              </FormControl>
              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type={show ? "text" : "password"}
                  size="2xl"
                  autoCapitalize="none"
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
                <Pressable
                  fontSize="xs"
                  fontWeight="500"
                  color="indigo.500"
                  alignSelf="flex-end"
                  mt={1}
                >
                  <Text>Forget Password?</Text>
                </Pressable>
              </FormControl>
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={() => signIn()}
                isLoading={loading}
              >
                Sign in
              </Button>
              <HStack justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  First time creating an account?{" "}
                </Text>
                <Pressable onPress={() => navigation.navigate("SignUp")}>
                  <Text color="indigo.500" fontWeight="medium" fontSize="sm">
                    Sign Up
                  </Text>
                </Pressable>
              </HStack>
            </VStack>
          </Center>
        </Box>
      </Center>
      ;
    </Box>
  );
};
