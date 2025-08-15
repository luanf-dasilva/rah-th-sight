import { useMemo, useEffect } from "react";

function ImageTexture(props) {
  const url = useMemo(() => {
    const u = new URL(process.env.NEXT_PUBLIC_DB_API_URL, window.location.origin);
    u.searchParams.set("user_id", props.user);
    u.searchParams.set("position", String(props.position));
    u.searchParams.set("system_name", props.system_name);
    u.searchParams.set("prop_type", props.prop_type);
    if (props.day_or_night) u.searchParams.set("day_or_night", props.day_or_night);
    if (props.overview_or_details) u.searchParams.set("overview_or_details", props.overview_or_details);
    return u.toString();
  }, [props.user, props.position, props.system_name, props.prop_type, props.day_or_night, props.overview_or_details]);

  useEffect(() => {
    props.onLoaded(url); 
  }, [url]); 

  return null;
}

export default ImageTexture;