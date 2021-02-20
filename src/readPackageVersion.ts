import prompts from 'prompts';
import semver from 'semver';

export async function readPackageVersion(): Promise<string> {
  const { value } = await prompts(
    {
      type: 'text',
      name: 'value',
      message: 'Package version?',
      initial: '1.0.0-prerelease.0',
      validate: (value) => semver.valid(value) != null || 'Must be a valid semantic version number',
    },
    {
      onCancel: () => {
        throw Error('Aborted.');
      },
    },
  );

  return value;
}
