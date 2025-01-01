import axios from "axios";
export async function getNearbyCafes (lng :number,lat:number){
    if(!lng||!lat){
        console.error("Invalid latitude or longitude provided.");
        return
    }
const nearbycafes=await axios.get(`http://127.0.0.1:3000/api/v1/nearby-cafes?lat=${lat}&lng=${lng}`).then(response => response.data);
  console.log("succeded");
return nearbycafes.cafes;
}