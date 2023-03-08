import { useEffect, useState } from "react";
import { getAuth } from "@firebase/auth";

import { supabase } from "../../services/supabaseClient";
import { Button } from "native-base";
import { db } from "../../services/firebaseConfig";
import { query, collection, where, getDoc } from "@firebase/firestore";

export default HomeTab = ({ route, navigation }) => {
  const [auth, setAuth] = useState();
  // const { user } = route.params;
  // console.log("ROUTE: ", user);

  useEffect(() => {
    console.log("Executed");
    const getData = async () => {
      const { data, error } = await supabase
        .from("school_parent")
        .select("first_name, last_name, schools (name)")
        .eq("user_id", route.params.user.id);
      if (error) return; //TODO: create a modal to test in this scenario
      console.log("DATA: ", data);
      return data;
    };
    const auth = getAuth();
    setAuth(auth);
    console.log("AUTH: ", auth.currentUser.uid);

    // getData();
  }, []);

  const getUser = async () => {
    const q = query(collection(db, "parents"), where("user_id", "==", auth.currentUser.uid));
    const user = await getDoc(q);
    console.log("USER: ", user);
  };
  return (
    <>
      <Button onPress={getUser}>Get My USer</Button>
    </>
  );
};
