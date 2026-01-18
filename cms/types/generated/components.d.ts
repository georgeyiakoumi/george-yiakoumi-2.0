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

export interface ProjectChapterProjectChapter extends Struct.ComponentSchema {
  collectionName: 'components_project_chapter_project_chapters';
  info: {
    description: '';
    displayName: 'Project Chapter';
  };
  attributes: {
    content: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.business': AboutBusiness;
      'project-chapter.project-chapter': ProjectChapterProjectChapter;
    }
  }
}
