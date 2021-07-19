import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '../src/libs/apiGateway';
import { formatJSONResponse } from '../src/libs/apiGateway';
import { middyfy } from '../src/libs/lambda';

import schema from '../src/functions/hello/schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const city = event.pathParameters?.city;

    if(!city || !cityData[city]){
        return apiResponses._400({message: 'missing city or no data'})
    }

    return apiResponses._200(cityData[city]);

//   return formatJSONResponse({
//     message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
//     event,
//   });
}

const apiResponses = {
    _200: (body: {[key: string]: any}) => {
        return {
            statusCode: 200,
            body: JSON.stringify(body, null, 2)
        }
    },
    _400: (body: {[key: string]: any}) => {
        return {
            statusCode: 400,
            body: JSON.stringify(body, null, 2)
        }
    }
}

interface CityData {
    name: string;
    state: string;
    description: string;
    mayor: string;
    population: number;
    zipCodes?: string
}

const cityData: {[key: string]: CityData} = {
    newyork: {
        name: 'New York',
        state: 'New York',
        description: 'New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean',
        mayor: 'Bill de Blasio',
        population: 8399000,
        zipCodes: '100xx-104xx, 11004-05, 111xx-114xx, 116xx'
    },
    wasington: {
        name: 'Washington',
        state: 'Distict of Columbia',
        description: 'DescriptionWashington, DC, the U.S. capital, is a compact city on the Potomac River',
        mayor: 'Muriel Bowser',
        population: 705549
    },
    seattle: {
        name: 'Seattle',
        state: 'Washington',
        description: 'Seattle, a city on Puget Sound in th ePacific Northwest',
        mayor: 'Jenny Durkan',
        population: 744955,
    }
}

export const main = middyfy(handler);