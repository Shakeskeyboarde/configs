import path from 'path';
import prompts from 'prompts';
import validate from 'validate-npm-package-name';

export async function readPackageName(): Promise<string> {
  const { packageName } = await prompts(
    {
      type: 'text',
      name: 'packageName',
      message: 'Package name?',
      initial: path.basename(process.cwd()).toLowerCase().replace(/\W+/g, '-'),
      validate: (value) => {
        const result = validate(value);

        if (result.validForNewPackages) {
          return true;
        }

        return result.errors?.[0] ?? result.warnings?.[0] ?? 'Not a valid package name';
      },
    },
    {
      onCancel: () => {
        throw Error('Aborted.');
      },
    },
  );

  return packageName;
}
