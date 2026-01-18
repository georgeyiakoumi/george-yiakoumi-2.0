import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Migration: Copy data from project_title and project_description to title and description
    try {
      const projects = await strapi.documents('api::project.project').findMany({});

      let migratedCount = 0;

      for (const project of projects) {
        // Only migrate if the new fields are empty and old fields have data
        if (!project.title && project.project_title) {
          await strapi.documents('api::project.project').update({
            documentId: project.documentId,
            data: {
              title: project.project_title,
              description: project.project_description || '',
            },
          });
          migratedCount++;
        }
      }

      if (migratedCount > 0) {
        strapi.log.info(`✅ Migrated ${migratedCount} projects from old field names to new field names`);
      } else {
        strapi.log.info(`ℹ️  No projects needed migration (either already migrated or no data found)`);
      }
    } catch (error) {
      strapi.log.error(`❌ Migration failed: ${error.message}`);
    }
  },
};
