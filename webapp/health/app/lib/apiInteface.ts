//to do 

// api for 
// api for latitude and longitude - done
// finding gyms and parks in the local area - done
// api for air pollution information - done
// food hygiene

const mapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY; //parthivs key
const environApiKey = process.env.NEXT_PUBLIC_ENVIRON_API_KEY; //parthivs key

async function getTextSearchResponse(query:String,postcode:String,radiusVal:number) {
    let highLowPair = await getHighLowPair(postcode,radiusVal);
    const res = await fetch('https://places.googleapis.com/v1/places:searchText',{
        method:'POST',
        headers:{
            'X-Goog-Api-Key':mapsApiKey,
            'X-Goog-FieldMask':'places.displayName,places.shortFormattedAddress,places.websiteUri',
        },
        body: JSON.stringify({
            textQuery:query,
            locationRestriction:{
                rectangle:{
                    low:{
                        latitude: highLowPair["low"]["latitude"] ,
                        longitude: highLowPair["low"]["longitude"]
                    },
                    high:{
                        latitude: highLowPair["high"]["latitude"],
                        longitude:highLowPair["high"]["longitude"]
                    }
                }
            },
            languageCode: 'en'
        })
    })
    const data = await res.json()
    //console.log(data);
    return data; //this is a json object
}

export async function getAirQualityIndex(postcode:String){
    const latLongPair = await getLatLongFromPostcode(postcode);
    const res = await fetch(`https://airquality.googleapis.com/v1/currentConditions:lookup?key=${environApiKey}`,{
        method: 'POST',
        body: JSON.stringify({
            location:{
                latitude: latLongPair["latitude"],
                longitude: latLongPair["longitude"]
            },
            extraComputations:["LOCAL_AQI"],
        })
    });
    const data = await res.json();
    //console.log(data);
    return data;
} 
/* SAMPLE RESPONSE FOR AIR QUALITY INDEX DATA
{
  dateTime: '2024-02-26T01:00:00Z',
  regionCode: 'gb',
  indexes: [
    {
      code: 'uaqi',
      displayName: 'Universal AQI',
      aqi: 74,
      aqiDisplay: '74',
      color: [Object],
      category: 'Good air quality',
      dominantPollutant: 'o3'
    },
    {
      code: 'gbr_defra',
      displayName: 'DAQI (UK)',
      aqi: 2,
      aqiDisplay: '2',
      color: [Object],
      category: 'Low air pollution',
      dominantPollutant: 'o3'
    }
  ]
}

*/

export async function fetchNames(query:String,postcode:String,radius:number){ 
    //imagine you are in google maps, 'query' is what you would type into the search bar
    //data is a json object, postcode is a string, radius is a number
    const data = await getTextSearchResponse(query,postcode,radius);
    if(Object.keys(data).length==0){
        console.log("nothing");
        return ["nothing"];
    }
    //console.log(data["places"]);
    return data["places"];
}

async function printNames(data: any){
    //console.log(data);
    if(data=="nothing"){
        console.log("nothing");
    }
    else{
        for(const place of data){
            console.log(place["displayName"]["text"]);
        }
    }
}
async function getLatLongFromPostcode(p:String){
    const res = await fetch(`https://api.postcodes.io/postcodes/${p}`)
    const data = await res.json();
    const latLong = {
        latitude: data["result"]["latitude"],
        longitude: data["result"]["longitude"]
    };
    return latLong;
}


async function getHighLowPair(postcode:String, radius:number){
    let postcodeCoords = await getLatLongFromPostcode(postcode);
    let coordChanges = convertDistanceToCoordChange(radius/1000);
    let highLowPair = {
        high: {
            latitude: postcodeCoords["latitude"]+coordChanges["latDeviance"],
            longitude: postcodeCoords["longitude"]+coordChanges["longDeviance"]
        },
        low: {
            latitude: postcodeCoords["latitude"]-coordChanges["latDeviance"],
            longitude: postcodeCoords["longitude"]-coordChanges["longDeviance"]
        }
    }
    return highLowPair;
}

function degreesToRadians(degrees: number){
    return degrees*(Math.PI/180);
}

function convertDistanceToCoordChange(radiusInKm: number){
    const latDeviance = radiusInKm/110.574;
    return {
        latDeviance : latDeviance,
        longDeviance : 1/(111.320*Math.cos(degreesToRadians(latDeviance)))
    }
}
fetchNames("gym", "BS14HJ", 5000);
//getAirQualityIndex("BS14HJ");
