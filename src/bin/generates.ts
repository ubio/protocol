import JsonToTS from 'json-to-ts';
import * as mySchema from './schema.json';
import * as HotelPriceCrawling from '../schema/hotel-price-crawling.json';
import * as fs from 'fs';
import path from 'path';

const tsInterface = JsonToTS(HotelPriceCrawling);
const data = tsInterface.toString();

const filePath = path.resolve(`./src/interfaces/HotelPriceCrawling.ts`);
fs.writeFileSync(filePath, data);
