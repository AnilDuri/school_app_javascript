import { useEffect } from "react";

import { supabase } from "../../services/supabaseClient";

export default HomeTab = ({ route, navigation }) => {
  console.log("ROUTE: ", route.params.user.id);

  useEffect(() => {
    console.log("Executed");
    const getData = async () => {
      const { data, error } = await supabase
        .from("school_parent")
        .select("parent(first_name), schools(name)")
        .eq("parent_id", route.params.user.id);
      if (error) return; //TODO: create a modal to test in this scenario
      console.log("DATA: ", data);
      return data;
    };

    getData();
  }, []);
  return <></>;
};
