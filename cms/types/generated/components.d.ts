import type { Schema, Struct } from '@strapi/strapi';

export interface AboutBusiness extends Struct.ComponentSchema {
  collectionName: 'components_about_businesses';
  info: {
    description: '';
    displayName: 'icon';
    icon: 'bulletList';
  };
  attributes: {
    classes: Schema.Attribute.Text;
    cssVariables: Schema.Attribute.JSON;
    cssVariablesDark: Schema.Attribute.JSON;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files'>;
    name: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.business': AboutBusiness;
    }
  }
}
