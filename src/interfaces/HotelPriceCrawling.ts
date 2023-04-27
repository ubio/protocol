interface RootObject {
  description: string;
  private: boolean;
  inputs: Inputs;
  outputs: Outputs;
  types: Types;
  errors: Error[];
  default: Default;
},interface Default {
  description: string;
  private: boolean;
  inputs: Inputs;
  outputs: Outputs;
  types: Types;
  errors: Error[];
},interface Error {
  code: string;
  category: string;
  description: string;
},interface Types {
  Options: Options;
  Results: Results;
  ResultItem: ResultItem;
  Result: Result;
  Rooms: Results;
  Room: Room;
  Rate: Rate;
  Hotel: Hotel;
  String: Estimated;
  Integer: Estimated;
  Searches: Results;
  Search: Search;
},interface Search {
  type: string;
  properties: Properties7;
  required: string[];
  additionalProperties: boolean;
},interface Properties7 {
  hotelId: Id;
  checkIn: CheckIn;
  nights: Estimated;
  guests: Estimated;
},interface CheckIn {
  type: string;
  format: string;
  example: string;
},interface Hotel {
  type: string;
  properties: Properties6;
  required: any[];
  additionalProperties: boolean;
},interface Properties6 {
  id: Id;
  name: Name;
  language: Id;
  currency: Id;
  address: Id;
},interface Rate {
  type: string;
  properties: Properties5;
  required: string[];
  additionalProperties: boolean;
},interface Properties5 {
  name: Name;
  id: Id;
  rule: Id;
  description: Estimated;
  occupancy: Id;
  breakfastIncluded: Estimated;
  parkingIncluded: Estimated;
  internetIncluded: Estimated;
  baseRate: Items;
  taxes: Results;
},interface Room {
  type: string;
  properties: Properties4;
  required: string[];
  additionalProperties: boolean;
},interface Properties4 {
  name: Name;
  id: Id;
  description: Estimated;
  capacity: Id;
  occupancy: Id;
  images: Results;
  rates: Results;
},interface Id {
  type: string;
  description: string;
},interface Name {
  type: string;
  maxLength: number;
  description: string;
},interface Result {
  type: string;
  properties: Properties3;
  required: string[];
  additionalProperties: boolean;
},interface Properties3 {
  estimated: Estimated;
  crawledAt: Estimated;
  rooms: Items;
},interface Estimated {
  type: string;
},interface ResultItem {
  type: string;
  properties: Properties2;
  required: string[];
  additionalProperties: boolean;
},interface Properties2 {
  search: Items;
  result: Items;
},interface Results {
  type: string;
  minItems: number;
  items: Items;
},interface Items {
  '$ref': string;
},interface Options {
  type: string;
  properties: Properties;
  additionalProperties: boolean;
},interface Properties {
},interface Outputs {
  hotel: PreviousResults;
  ageThreshold: PreviousResults;
  results: PreviousResults;
  pointOfSale: PreviousResults;
},interface Inputs {
  url: Url;
  previousResults: PreviousResults;
  searches: Searches;
},interface Searches {
  typeRef: string;
},interface PreviousResults {
  typeRef: string;
  description: string;
},interface Url {
  typeRef: string;
  initial: boolean;
  description: string;
}