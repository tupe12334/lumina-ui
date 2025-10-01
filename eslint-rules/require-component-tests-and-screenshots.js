import { existsSync } from 'fs';
import { dirname, basename, join } from 'path';

const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure each component has corresponding test and visual test files',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missingTest: 'Component "{{componentName}}" is missing a test file ({{expectedTestPath}})',
      missingStories: 'Component "{{componentName}}" is missing a stories file ({{expectedStoriesPath}})',
      missingVisualTest: 'Component "{{componentName}}" is missing a visual test file ({{expectedVisualTestPath}})',
    },
  },
  create(context) {
    return {
      Program(node) {
        const filename = context.getFilename();

        // Only check main component files (not test, stories, or infrastructure files)
        if (!filename.endsWith('.tsx') ||
            filename.includes('.test.') ||
            filename.includes('.stories.') ||
            filename.includes('/infrastructure/') ||
            filename.includes('/hooks/') ||
            filename.includes('/domain/') ||
            filename.includes('/application/')) {
          return;
        }

        const fileDir = dirname(filename);
        const fileBasename = basename(filename, '.tsx');

        // Skip if not in components directory
        if (!filename.includes('/components/')) {
          return;
        }

        // Expected file paths based on project structure from CONTRIBUTING.md
        const expectedTestPath = join(fileDir, `${fileBasename}.test.tsx`);
        const expectedStoriesPath = join(fileDir, `${fileBasename}.stories.tsx`);
        const expectedVisualTestPath = join(fileDir, 'tests', 'visual', `${fileBasename}.spec.ts`);

        // Check if files exist
        if (!existsSync(expectedTestPath)) {
          context.report({
            node,
            messageId: 'missingTest',
            data: {
              componentName: fileBasename,
              expectedTestPath: expectedTestPath.replace(process.cwd(), '.'),
            },
          });
        }

        if (!existsSync(expectedStoriesPath)) {
          context.report({
            node,
            messageId: 'missingStories',
            data: {
              componentName: fileBasename,
              expectedStoriesPath: expectedStoriesPath.replace(process.cwd(), '.'),
            },
          });
        }

        if (!existsSync(expectedVisualTestPath)) {
          context.report({
            node,
            messageId: 'missingVisualTest',
            data: {
              componentName: fileBasename,
              expectedVisualTestPath: expectedVisualTestPath.replace(process.cwd(), '.'),
            },
          });
        }
      },
    };
  },
};

export default rule;