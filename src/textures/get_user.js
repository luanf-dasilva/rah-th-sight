// for now do this for user id in images db table. update later for users table using username=
import React, { useEffect, useRef, useState } from "react";
import axios from "axios;"

const GetUser = (porps) => {

    const [imgSrc, setImgSrc] = useState(null);
    useEffect(() => {
          axios.get(process.env.NEXT_PUBLIC_DB_API_URL, {
            responseType: "arraybuffer", // Fetch image as array buffer
            params: {
              user_id: props.user_id,
              position: props.position,
              day_or_night: props.day_or_night,
              overview_or_details: props.overview_or_details
            }
          }).then(response => {
              const base64 = btoa(
                  new Uint8Array(response.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      '',
                  ),
              );
              setImgSrc(`data:image/jpeg;base64,${base64}`);
              props.onLoaded(`data:image/jpeg;base64,${base64}`);
          }).catch(error => console.error('Error fetching the image:', error));
  }, [props.user_id, props.position, props.day_or_night, props.overview_or_details, props.onLoaded]);
  
    return null;  
}

export default GetUser;