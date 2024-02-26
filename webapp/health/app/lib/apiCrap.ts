//to do 

// api for 
// api for latitude and longitude - done
// finding gyms and parks in the local area - done
// api for air pollution information - done
// food hygiene

const mapsApiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY; //parthivs key

async function getTextSearchResponse(query: string, postcode: string, radiusVal: number) {
    let highLowPair = await getHighLowPair(postcode, radiusVal);
    const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
            'X-Goog-Api-Key': mapsApiKey,
            'X-Goog-FieldMask': 'places.displayName,places.shortFormattedAddress,places.websiteUri',
        },
        body: JSON.stringify({
            textQuery: query,
            locationRestriction: {
                rectangle: {
                    low: {
                        latitude: highLowPair["low"]["latitude"],
                        longitude: highLowPair["low"]["longitude"]
                    },
                    high: {
                        latitude: highLowPair["high"]["latitude"],
                        longitude: highLowPair["high"]["longitude"]
                    },
                }
            }
        })
    })
    const data = await res.json()
    return data; //this is a json object
}

async function getAirQualityIndex(postcode: string) {
    const latLongPair = await getLatLongFromPostcode(postcode);
    const res = await fetch(`https://airquality.googleapis.com/v1/currentConditions:lookup?${mapsApiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            location: {
                latitude: latLongPair["latitude"],
                longitude: latLongPair["longitude"]
            }
        })
    });
    const data = await res.json();
}

async function fetchNames(query: string, postcode: string, radius: number) {
    //imagine you are in google maps, 'query' is what you would type into the search bar
    //data is a json object, postcode is a string, radius is a number
    //console.log(data);
    let data = await getTextSearchResponse(query, postcode, radius);
    if (Object.keys(data).length == 0) {
        console.log("nothing");
        return;
    }
    return data["places"];
}

async function printNames(data: any) {
    if (data === "nothing") {
        console.log("nothing");
    }
    else {
        for (const place of data) {
            console.log(place["displayName"]["text"]);
        }
    }
}

type LatLong = {
    latitude: number,
    longitude: number
}

async function getLatLongFromPostcode(p: string): Promise<LatLong> {
    const res = await fetch(`https://api.postcodes.io/postcodes/${p}`)
    const data = await res.json();
    const latLong: LatLong = {
        latitude: data["result"]["latitude"],
        longitude: data["result"]["longitude"]
    };
    return latLong;
}

async function getHighLowPair(postcode: string, radius: number) {
    let postcodeCoords = await getLatLongFromPostcode(postcode);
    let coordChanges = convertDistanceToCoordChange(radius / 1000);
    let highLowPair = {
        high: {
            latitude: postcodeCoords["latitude"] + coordChanges["latDeviance"],
            longitude: postcodeCoords["longitude"] + coordChanges["longDeviance"]
        },
        low: {
            latitude: postcodeCoords["latitude"] - coordChanges["latDeviance"],
            longitude: postcodeCoords["longitude"] - coordChanges["longDeviance"]
        }
    }
    return highLowPair;
}

function degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
}

function convertDistanceToCoordChange(radiusInKm: number) {
    const latDeviance = radiusInKm / 110.574;
    return {
        latDeviance: latDeviance,
        longDeviance: 1 / (111.320 * Math.cos(degreesToRadians(latDeviance)))
    }
}

async function main() {
    printNames(await fetchNames("mcdonalds", "DY82HH", 15000));
}

main().catch(console.error);
