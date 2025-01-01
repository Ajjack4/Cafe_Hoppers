import axios from "axios";
export async function getNearbyCafes (lng :number,lat:number){
await axios.get(`http://127.0.0.1:3000/api/v1/nearby-cafes?lat=${lat}&lng=${lng}`).then(response => console.log(response.data));

}