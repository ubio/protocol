import { compile } from 'json-schema-to-typescript';
import $RefParser from "@apidevtools/json-schema-ref-parser";
import path from 'path';
// import * as mySchema from './schema.json';
import * as mySchema from '../schema/hotel-price-crawling.json';

const generateInterfaces = async () => {
    const schemaFolderPath = path.resolve('./src/schema');

    let mySchemaStr = JSON.stringify(mySchema);
    // replace typeRef with $ref
    let validSchema = mySchemaStr.replaceAll('"typeRef"', '"$ref"');

    let index = 0;
    const searchString = '#/domains/';
    const pascalCaseNames = new Set<string>();
    while (index >= 0) {
      index = validSchema.indexOf(searchString, index);
      index += searchString.length;
      const endIndex = validSchema.indexOf('/', index);
      const name = validSchema.substring(index, endIndex);
      pascalCaseNames.add(name);
      index = validSchema.indexOf(searchString, endIndex);;
    }

    // modify $ref path, e.g. #/domains/HotelPriceCrawling/types/Results
    // #/domains = <path to ./src/schema folder
    // HotelPriceCrawling = hotel-price-crawling.json
    for (const pascaleName of pascalCaseNames) {
      const kebabName = pascaleName.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();
      validSchema = validSchema.replaceAll(`"${searchString}${pascaleName}`, `"${schemaFolderPath}/${kebabName}`);
    }

    let schema;
    let refs;
    try {
        schema = await $RefParser.dereference(validSchema);
        refs = await $RefParser.resolve(validSchema);
      }
      catch(err) {
        console.error(err);
      }

    const compiledInterfaces = await compile(validSchema);
}

generateInterfaces().catch();
