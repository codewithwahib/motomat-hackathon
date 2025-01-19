import { type SchemaTypeDefinition } from 'sanity';

export const hero: SchemaTypeDefinition = {
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }, // Enables hot spot for image cropping
    },
  ],
};

