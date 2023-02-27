import { useEffect } from "react";

import { supabase } from "../../services/supabaseClient";

export default HomeTab = ({ route, navigation }) => {
  const { user } = route.params;
  console.log("ROUTE: ", user);

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

    getData();
  }, []);
  return <></>;
};
