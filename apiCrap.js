//to do 

// api for 
// api for latitude and longitude - done
// finding gyms and parks in the local area - done
// api for air pollution information - done
// food hygiene

import fetch from 'node-fetch';

const mapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY; //parthivs key

async function getTextSearchResponse(query,postcode,radiusVal) {
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
                rectangle: {
                    low:{
                        latitude: highLowPair["low"]["latitude"] ,
                        longitude: highLowPair["low"]["longitude"]
                    },
                    high:{
                        latitude: highLowPair["high"]["latitude"],
                        longitude:highLowPair["high"]["longitude"]
                    },
                }
            }
        })
    })
    const data = await res.json()
    return data; //this is a json object
}

async function getAirQualityIndex(postcode){
    const latLongPair = getLatLongFromPostcode(postcode);
    const res = await fetch(`https://airquality.googleapis.com/v1/currentConditions:lookup?${mapsApiKey}`,{
        method: 'POST',
        body: JSON.stringify({
            location:{
                latitude: latLongPair["latitude"],
                longitude: latLongPair["longitude"]
            }
        })
    });
    const data = await res.json();

}

async function fetchNames(query,postcode,radius){ 
    //imagine you are in google maps, 'query' is what you would type into the search bar
    //data is a json object, postcode is a string, radius is a number
    //console.log(data);
    let data = await getTextSearchResponse(query,postcode,radius);
    if(Object.keys(data).length==0){
        console.log("nothing");
        return;
    }
    return data["places"];
}

async function printNames(data){
    console.log(data);
    if(data=="nothing"){
        console.log("nothing");
    }
    else{
        for(const place of data){
            console.log(place["displayName"]["text"]);
        }
    }
}
async function getLatLongFromPostcode(p){
    const res = await fetch(`https://api.postcodes.io/postcodes/${p}`)
    const data = await res.json();
    const latLong = {
        latitude: data["result"]["latitude"],
        longitude: data["result"]["longitude"]
    };
    return latLong;
}

async function getHighLowPair(postcode, radius){
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

function degreesToRadians(degrees){
    return degrees*(Math.PI/180);
}

function convertDistanceToCoordChange(radiusInKm){
    const latDeviance = radiusInKm/110.574;
    return {
        latDeviance : latDeviance,
        longDeviance : 1/(111.320*Math.cos(degreesToRadians(latDeviance)))
    }
}
printNames(await fetchNames("gym", "BS14HJ", 5000));
