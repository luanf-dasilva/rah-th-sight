import { useEffect, useState } from "react";
import axios from "axios";

const ImageTexture = (props) => {
  
  const [imgSrc, setImgSrc] = useState(null);
  useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_DB_API_URL, {
          responseType: "arraybuffer", // Fetch image as array buffer
          params: {
            user_id: props.user,
            position: props.position,
            system_name: props.system_name,
            prop_type: props.prop_type
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
}, [props.user, props.position, props.day_or_night, props.overview_or_details, props.onLoaded]);

    return null;
}

export default ImageTexture;