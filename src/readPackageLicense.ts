import prompts from 'prompts';
import { LicenseType } from './LicenseType';

export async function readPackageLicense(): Promise<LicenseType> {
  const { license } = await prompts(
    {
      type: 'select',
      name: 'license',
      message: 'Package license?',
      choices: [
        { title: 'ISC', value: 'ISC' },
        { title: 'The Unlicense', value: 'Unlicense' },
        { title: 'Creative Commons', value: 'CC-BY-NC-4.0' },
        { title: 'None', value: 'UNLICENSED' },
      ],
    },
    {
      onCancel: () => {
        throw Error('Aborted.');
      },
    },
  );

  return license;
}
