import { SchemaTypeDefinition } from 'sanity';
import { product } from './prducts'
import { hero } from './hero';
import { trending } from './trending'
import { bike } from './bike'
import { car } from './car'
import { sale } from './sale'
import { searchByCars } from  './search-by-cars'
import { searchByBikes } from  './search-by-bikes'
import { carAccessories } from  './car-accessories'
import { bikeAccessories } from  './bike-accessories'
import { bikeParts } from  './bike-parts'
import { carCareProducts } from  './car-care-products'
import { touringGadgets } from  './touring-gadgets'
import attentionBar  from './attentionBar';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,touringGadgets,carCareProducts,attentionBar, hero,bikeParts,trending,bike,car,sale,searchByCars,searchByBikes,carAccessories,bikeAccessories ] // Correctly includes Menu schema
};