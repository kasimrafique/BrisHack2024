import { fetchNames } from "../lib/apiInteface";

// interface place{
//     websiteUri: String
//     displayName: {
//         text: String,
//         languageCode : String
//     },
//     shortFormattedAddess: String
// }

const postcode = "BS14HJ";
const radius = 5000;

var gymListHTML = '';
var gymList: any;
function createGymListHtml(){
    gymListHTML+="<div id=gymList>";
    for(let i = 0; i < gymList.length(); i++){
        const gym = gymList[i];
        gymListHTML+="<a href"+gym["websiteUri"]+">"+gym["displayName"]["text"]+"</a>";
    }
    gymListHTML+="</div>";
}

export default async function LocationData() {
    gymList = await fetchNames("gyms",postcode,radius)
    createGymListHtml();
    console.log(gymListHTML)
    const parkList = fetchNames("parks",postcode,radius)
    const gpList = fetchNames("gp",postcode,radius); 
    return (
    <div>    
        <title>Gyms:</title>
        <div id="gymList">
        </div>
    </div>
    );
}
