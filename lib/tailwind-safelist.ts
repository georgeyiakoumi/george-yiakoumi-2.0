/**
 * Tailwind CSS Safelist
 *
 * This file ensures that dynamic classes coming from Strapi CMS are included
 * in the Tailwind build. The classes listed here will always be generated,
 * even if they're not statically present in the codebase.
 *
 * Used for: ThemedLogo component and other Strapi-driven content.
 */

export const TAILWIND_SAFELIST = [
  // Arbitrary percentage values (add any percentage values you plan to use in Strapi)
  'w-[20%]', 'w-[30%]', 'w-[40%]', 'w-[50%]', 'w-[60%]', 'w-[70%]', 'w-[75%]', 'w-[80%]', 'w-[90%]',
] as const;
