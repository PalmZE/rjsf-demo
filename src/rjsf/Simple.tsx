import { JSONSchema6Definition } from "json-schema";
import React from "react";
import Form from "react-jsonschema-form";

export const alertJson = (any: any) => {
  alert(JSON.stringify(any, null, 4));
};

export const log = (any: any) => {
  console.log(any);
};

const mkSchema = (schema: JSONSchema6Definition): JSONSchema6Definition =>
  schema;

const garageCommon: JSONSchema6Definition = {
  title: "",
  type: "object",
  properties: {
    location: mkSchema({
      title: "Location",
      type: "string",
      enum: ["Adjacent to the building", "Beneath the building"],
    }),
    nonStandardPurpose: mkSchema({
      title: "Area is used for any purpose other than building access",
      type: "boolean",
    }),
    areWallsFinished: mkSchema({
      title: "Walls are finished",
      type: "boolean",
    }),
    garageSize: mkSchema({
      title: "Size of garage",
      type: "number",
    }),
  },
};

const permanentOpenings: JSONSchema6Definition = {
  title: "Permanent openings",
  type: "object",
  properties: {
    areFloodOpeningsEngineered: mkSchema({
      title: "Flood openings are engineered",
      type: "boolean",
    }),
    numberOfVents: mkSchema({
      title: "Number of Vents",
      type: "number",
    }),
    areaOfVents: mkSchema({
      title: "Total Area of Vents",
      type: "number",
    }),
  },
};

const equipment: JSONSchema6Definition = {
  title: "Machinery/Equipment",
  type: "object",
  properties: {
    value: mkSchema({
      title: "Value",
      type: "string",
      enum: ["1$-10,000$", "10,001$-20,000$", "Over 20,000$"],
    }),
    totalValue: {},
    devices: mkSchema({
      type: "array",
      title: "Devices",
      items: {
        type: "string",
        enum: [
          "Furnace",
          "Cistern",
          "Regular Water Tank",
          "Heat Pump",
          "Boiler",
          "Fuel Tank",
          "Air Conditioner",
          "Generator",
          "Compressor",
          "Hot Water Heater",
          "Water Filter",
          "Oil Tank",
          "Well Water Tank",
        ],
      },
      uniqueItems: true,
    }),
  },
  dependencies: {
    value: {
      oneOf: [
        mkSchema({
          properties: {
            value: mkSchema({ enum: ["1$-10,000$", "10,001$-20,000$"] }),
          },
        }),

        mkSchema({
          properties: {
            value: mkSchema({ enum: ["Over 20,000$"] }),

            totalValue: mkSchema({
              title: "Total value",
              type: "number",
            }),
          },
        }),
      ],
    },
  },
};

const garageSchema: JSONSchema6Definition = {
  title: "Garage",
  type: "object",
  properties: {
    garageCommon,
    permanentOpenings,
    hasMachinery: mkSchema({
      type: "boolean",
      title: "Has machinery servicing the building",
    }),
  },
  dependencies: {
    hasMachinery: {
      oneOf: [
        mkSchema({
          properties: {
            hasMachinery: mkSchema({ enum: [false] }),
          },
        }),
        mkSchema({
          properties: {
            hasMachinery: mkSchema({ enum: [true] }),
            equipment,
          },
        }),
      ],
    },
  },
};

const uiSchema = {
  equipment: {
    devices: {
      "ui:widget": "checkboxes",
    },
  },
};

export const Simple = () => (
  <Form
    schema={garageSchema}
    onSubmit={({ formData }) => log(formData)}
    onError={alertJson}
    uiSchema={uiSchema}
    formData={{
      garageCommon: {
        garageSize: "24",
      },
    }}
  />
);
