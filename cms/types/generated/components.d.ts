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

export interface DetailTool extends Struct.ComponentSchema {
  collectionName: 'components_detail_tools';
  info: {
    description: '';
    displayName: 'tool';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['Development', 'Backend', 'Hosting']
    >;
    description: Schema.Attribute.Text;
    logo: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    paid: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String;
  };
}

export interface NavlinkNavLink extends Struct.ComponentSchema {
  collectionName: 'components_navlink_nav_links';
  info: {
    description: '';
    displayName: 'NavLink';
  };
  attributes: {
    iconName: Schema.Attribute.String;
    isHomepage: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface NavlinkSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_navlink_social_links';
  info: {
    description: '';
    displayName: 'SocialLink';
  };
  attributes: {
    ariaLabel: Schema.Attribute.String;
    Icon: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    name: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface PortfolioRichTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_rich_text_blocks';
  info: {
    description: '';
    displayName: 'Rich Text Block';
    icon: 'write';
  };
  attributes: {
    rich_text: Schema.Attribute.Blocks;
  };
}

export interface PortfolioSliderBlock extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_slider_blocks';
  info: {
    description: '';
    displayName: 'Slider Block';
    icon: 'landscape';
  };
  attributes: {
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
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
      'detail.tool': DetailTool;
      'navlink.nav-link': NavlinkNavLink;
      'navlink.social-link': NavlinkSocialLink;
      'portfolio.rich-text-block': PortfolioRichTextBlock;
      'portfolio.slider-block': PortfolioSliderBlock;
      'project-chapter.project-chapter': ProjectChapterProjectChapter;
    }
  }
}
