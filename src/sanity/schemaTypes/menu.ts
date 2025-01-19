import { type SchemaTypeDefinition } from 'sanity';

export const menu: SchemaTypeDefinition = {
  name: 'menu',
  title: 'Menu',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'titles',
      title: 'Titles',
      type: 'array',
      of: [{ type: 'string' }], // Array of strings for multiple titles
    },
  ],
};



