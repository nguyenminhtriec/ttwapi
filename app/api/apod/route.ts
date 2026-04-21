
export async function POST(req: Request) {
    const baseUrl = process.env.APOD_BASE_URL;
    const {startDate} = await req.json();
    const params = harmonizeParams(startDate);

    const url = `${baseUrl}?${params.toString()}`
    console.log("Getting data from", url);
    const response = await fetch(url, {
        cache: "force-cache",
        headers: {
            // 'Content-Type': 'text/event-stream',
            'Access-Control-Allow-Origin': '*', // Uncomment if CORS is needed
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
    const data = await response.json();

    if (!response.ok) {
        return Response.json({error: "Failed to fetch data from APOD API"}, {status: 500});
    }
    return Response.json(data);
}

function harmonizeParams(date: string, dateOffset=3) {
    const apiKey: string = process.env.APOD_API_KEY || '';
    const stamp = Date.parse(date);
    let params = new URLSearchParams();
    if (stamp > Date.now()) {
        const randomDate = getRandomDate();
        params.set('start_date', randomDate);
        params.set('end_date', randomDate)
        params.set('api_key', apiKey);
       
    } else {
        const offset = dateOffset * 24 *3600 * 1000;
        const newStamp = (stamp + offset) < Date.now() ? stamp+offset : Date.now()-1;
        const end = new Date(newStamp).toISOString();
        const endDate = end.split("T")[0];

        params.set('start_date', date);
        params.set('end_date', endDate),   
        params.set('api_key', apiKey); 
    }
    return params;
}

// Desc: get a random date
function getRandomDate() {
    const min = Date.parse("1995-6-16");
    const max = Date.now();
    const randomStamp = Math.floor(Math.random() * (max-min)) + min;
    const randomDate = new Date(randomStamp).toISOString().split("T")[0];
    return randomDate;
}