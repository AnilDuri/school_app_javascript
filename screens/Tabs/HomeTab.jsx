import { useEffect, useState } from "react";
import { getAuth } from "@firebase/auth";

import { supabase } from "../../services/supabaseClient";
import { Box, Button, Text } from "native-base";
import { db } from "../../services/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

export default HomeTab = ({ route, navigation }) => {
  const [auth, setAuth] = useState();
  const [parentId, setParentId] = useState();
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
      setParentId(doc.id);
    });

    // const q = query(collection(db, "parents"), where("user_id", "==", auth.currentUser.uid));
    // const user = await getDoc(q);
    // console.log("USER: ", user);
  };

  const getParentSchools = async () => {
    const q = query(
      collection(db, "school_parent"),
      where("parent_id", "==", parentId)
    );
    const parentSchools = await getDocs(q);

    parentSchools.docs.forEach((doc) => console.log("DOC: ", doc.data()));

    // console.log('PARENT SCHOOLS: ', parentSchools.docs);

    const schools = await Promise.all(
      parentSchools.docs
        .filter((doc) => doc.exists)
        .map((d) => {
          console.log(d.data().school_id);
          const docRef = doc(db, "schools", d.data().school_id);
          const school = getDoc(docRef);
          return school;
        })
    );
    schools.forEach((s) => console.log("SCHOOL: ", s.data()));

    const formattedSchools = schools.filter(d => d.exists).map(d => ({id: d.id, ...d.data()}));
    console.log('Formatted schools: ', formattedSchools);
  };
  return (
    <>
      <Button onPress={() => getUser()}>Get My USER</Button>
      <Box>
        <Text>Hello</Text>
      </Box>
      <Button onPress={() => getParentSchools()}>Get My SCHOOLS</Button>
    </>
  );
};
