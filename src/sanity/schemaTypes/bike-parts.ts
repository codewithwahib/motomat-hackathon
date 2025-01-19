import { type SchemaTypeDefinition } from 'sanity';

export const bikeParts: SchemaTypeDefinition = {
  name: 'bike-parts',
  title: 'Bike Parts',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string', // Allows both numbers and alphabets
    },
    {
      name: 'discountedPrice',
      title: 'Discounted Price',
      type: 'number', // Only numbers
    },
    {
      name: 'image',
      title: 'Primary Image',
      type: 'image',
      options: { hotspot: true }, // Enables hot spot for image cropping
    },
    {
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [{ type: 'image' }],
      options: { hotspot: true }, // Enables hot spot for image cropping
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    },
  ],
};
