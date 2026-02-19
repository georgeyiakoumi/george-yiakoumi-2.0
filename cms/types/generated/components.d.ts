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

export interface CvChapter extends Struct.ComponentSchema {
  collectionName: 'components_cv_chapters';
  info: {
    description: '';
    displayName: 'Chapter';
  };
  attributes: {
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    end_date: Schema.Attribute.Date;
    experience: Schema.Attribute.Blocks & Schema.Attribute.Required;
    hybrid: Schema.Attribute.Boolean;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    start_date: Schema.Attribute.Date & Schema.Attribute.Required;
  };
}

export interface CvHistory extends Struct.ComponentSchema {
  collectionName: 'components_cv_histories';
  info: {
    displayName: 'history';
  };
  attributes: {
    Chapter: Schema.Attribute.Component<'cv.chapter', true>;
    description: Schema.Attribute.Text;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface CvLanguages extends Struct.ComponentSchema {
  collectionName: 'components_cv_languages';
  info: {
    displayName: 'languages';
  };
  attributes: {
    level: Schema.Attribute.String;
    region: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.business': AboutBusiness;
      'cv.chapter': CvChapter;
      'cv.history': CvHistory;
      'cv.languages': CvLanguages;
    }
  }
}
