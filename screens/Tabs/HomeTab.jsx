import { useEffect, useState } from "react";
import { getAuth } from "@firebase/auth";

import { supabase } from "../../services/supabaseClient";
import { Button } from "native-base";
import { db } from "../../services/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

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
    // console.log('Auth: ', auth);
    const q = query(
      collection(db, "parents"),
      where("user_id", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    // console.log('QUERY SNAPSHOTS: ', querySnapshot)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });

    // const q = query(collection(db, "parents"), where("user_id", "==", auth.currentUser.uid));
    // const user = await getDoc(q);
    // console.log("USER: ", user);
  };
  return (
    <>
      <Button onPress={getUser}>Get My USer</Button>
    </>
  );
};
