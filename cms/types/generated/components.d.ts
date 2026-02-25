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
    end_date: Schema.Attribute.Date;
    experience: Schema.Attribute.Blocks & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    start_date: Schema.Attribute.Date & Schema.Attribute.Required;
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

export interface ProjectBlocksCarousel extends Struct.ComponentSchema {
  collectionName: 'components_project_blocks_carousels';
  info: {
    description: '';
    displayName: 'carousel';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    slides: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    > &
      Schema.Attribute.Required;
  };
}

export interface ProjectBlocksComparisonSlider extends Struct.ComponentSchema {
  collectionName: 'components_project_blocks_comparison_sliders';
  info: {
    description: '';
    displayName: 'comparison-slider';
  };
  attributes: {
    after_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    after_label: Schema.Attribute.Text;
    before_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    before_label: Schema.Attribute.Text;
  };
}

export interface ProjectBlocksImage extends Struct.ComponentSchema {
  collectionName: 'components_project_blocks_images';
  info: {
    description: '';
    displayName: 'image';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
  };
}

export interface ProjectBlocksRichText extends Struct.ComponentSchema {
  collectionName: 'components_project_blocks_rich_texts';
  info: {
    description: '';
    displayName: 'rich-text';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

export interface ProjectBlocksStatItem extends Struct.ComponentSchema {
  collectionName: 'components_project_blocks_stat_items';
  info: {
    displayName: 'stat-item';
  };
  attributes: {
    description: Schema.Attribute.String;
    label: Schema.Attribute.String;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.Decimal;
  };
}

export interface ProjectBlocksStats extends Struct.ComponentSchema {
  collectionName: 'components_project_blocks_stats';
  info: {
    description: '';
    displayName: 'stats';
  };
  attributes: {
    chart_type: Schema.Attribute.Enumeration<
      ['bar', 'line', 'pie', 'number-only']
    >;
    description: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'project-blocks.stat-item', true>;
  };
}

export interface ProjectBlocksVideo extends Struct.ComponentSchema {
  collectionName: 'components_project_blocks_videos';
  info: {
    description: '';
    displayName: 'video';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    file: Schema.Attribute.Media<'files' | 'videos'>;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.business': AboutBusiness;
      'cv.chapter': CvChapter;
      'cv.languages': CvLanguages;
      'project-blocks.carousel': ProjectBlocksCarousel;
      'project-blocks.comparison-slider': ProjectBlocksComparisonSlider;
      'project-blocks.image': ProjectBlocksImage;
      'project-blocks.rich-text': ProjectBlocksRichText;
      'project-blocks.stat-item': ProjectBlocksStatItem;
      'project-blocks.stats': ProjectBlocksStats;
      'project-blocks.video': ProjectBlocksVideo;
    }
  }
}
