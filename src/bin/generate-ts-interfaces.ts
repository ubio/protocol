import { compile } from 'json-schema-to-typescript';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import path from 'path';
import * as fs from 'fs';
// import * as mySchema from './schema.json';
import * as HotelPriceCrawling from '../schema/hotel-price-crawling.json';
import * as Generic from '../schema/generic.json';

const generateInterfaces = async () => {
  const genericSchema = await createValidSchema(Generic, 'generic');
  // TODO read schemas and call generateInterface
  generateInterface(genericSchema, 'generic');
  // generateInterface(HotelPriceCrawling, 'generic');
};

const generateInterface = async (schema: JSON, filename: string) => {
  let dereferencedSchema: $RefParser.JSONSchema;
  let refs;
  try {
    dereferencedSchema = await $RefParser.dereference(schema, {
      continueOnError: true,
    });
    refs = await $RefParser.resolve(schema);
  } catch (err) {
    console.error(err);
  }

  const compileAndExportInterface = async () => {
    const compiledInterfaces = await compile(schema, filename, {
      $refOptions: {
        parse: { json: true },
        resolve: { external: true, file: true, http: false },
        continueOnError: true,
      },
    });

    let data = JSON.stringify(compiledInterfaces, null, 4);
    // let cache: any[] | null = [];
    // let data = JSON.stringify(dereferencedSchema, (key, value) => {
    //   if (typeof value === 'object' && value !== null) {
    //     // Duplicate reference found, discard key
    //     if (cache?.includes(value)) return;

    //     // Store value in our collection
    //     cache?.push(value);
    //   }
    //   return value;
    // });
    // cache = null; // Enable garbage collection

    const filePath = path.resolve(`./src/interfaces/${filename}.ts`);
    fs.writeFileSync(filePath, data);
  };

  await compileAndExportInterface();
};

const createValidSchema = async (inputSchema: any, filename: string) => {
  const schemaFolderPath = './src/generated-schema/';

  let validSchema = JSON.stringify(inputSchema);
  // replace typeRef with $ref
  validSchema = validSchema.replaceAll('"typeRef"', '"$ref"');

  const searchString = '#/domains/';
  const findReferences = () => {
    let index = 0;
    const pascalCaseNames = new Set<string>();

    while (index >= 0) {
      index = validSchema.indexOf(searchString, index);
      index += searchString.length;
      const endIndex = validSchema.indexOf('/', index);
      const name = validSchema.substring(index, endIndex);
      pascalCaseNames.add(name);
      index = validSchema.indexOf(searchString, endIndex);
    }

    return pascalCaseNames;
  };

  const pascalCaseNames = findReferences();

  // modify $ref path, e.g. #/domains/HotelPriceCrawling/types/Results
  // #/domains = <schemaFolderPath>
  // HotelPriceCrawling = hotel-price-crawling
  const createValidRefPaths = (schema: string) => {
    for (const pascaleName of pascalCaseNames) {
      const kebabName = pascaleName
        .replace(/([a-z0–9])([A-Z])/g, '$1-$2')
        .toLowerCase();
      schema = schema.replaceAll(
        `"${searchString}${pascaleName}`,
        // `"${schemaFolderPath}${kebabName}.json`
        `"#`
      );
    }

    return schema;
  };

  validSchema = createValidRefPaths(validSchema);

  const validSchemaJson = JSON.parse(validSchema);
  const prettySchema = JSON.stringify(validSchemaJson, null, 4);

  const filePath = path.join(schemaFolderPath, `${filename}.json`);
  console.log(filePath);
  fs.writeFileSync(filePath, prettySchema);

  return validSchemaJson;
};

generateInterfaces().catch();
