import { compile } from 'json-schema-to-typescript';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import path from 'path';
import * as fs from 'fs';
// import * as mySchema from './schema.json';
import * as mySchema from '../schema/hotel-price-crawling.json';

const generateInterfaces = async () => {
  // const schemaFolderPath = path.resolve('./src/schema/');
  const schemaFolderPath = './src/schema/';

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
    index = validSchema.indexOf(searchString, endIndex);
  }

  // modify $ref path, e.g. #/domains/HotelPriceCrawling/types/Results
  // #/domains = <path to ./src/schema folder
  // HotelPriceCrawling = hotel-price-crawling.json
  for (const pascaleName of pascalCaseNames) {
    const kebabName = pascaleName
      .replace(/([a-z0–9])([A-Z])/g, '$1-$2')
      .toLowerCase();
    validSchema = validSchema.replaceAll(
      `"${searchString}${pascaleName}`,
      `"${schemaFolderPath}${kebabName}.json#`
    );
  }

  const validSchemaJson = JSON.parse(validSchema);

  let schema;
  let refs;
  try {
    schema = await $RefParser.dereference(validSchemaJson, {
      continueOnError: true,
    });
    refs = await $RefParser.resolve(validSchemaJson);
  } catch (err) {
    console.error(err);
  }

  const compiledInterfaces = await compile(
    validSchemaJson,
    'HotelPriceCrawling',
    undefined
  );

  let data = JSON.stringify(compiledInterfaces);
  const filePath = path.resolve('./src/interfaces/hotel-price-crawling.ts');
  console.log(filePath);
  fs.writeFileSync(filePath, data);
};

generateInterfaces().catch();
