import prompts from 'prompts';
import { LicenseType } from './LicenseType';

export async function readPackageLicense(): Promise<LicenseType> {
  const { license } = await prompts(
    {
      type: 'select',
      name: 'license',
      message: 'Package license?',
      choices: [
        { title: 'ISC', value: 'ISC', description: 'Use however, but keep the copyright.', selected: true },
        { title: 'The Unlicense', value: 'Unlicense', description: 'Completely unencumbered.' },
        {
          title: 'Creative Commons',
          value: 'CC-BY-NC-4.0',
          description: 'Use non-commercially, attribute, state changes, and keep the copyright.',
        },
        { title: 'None', value: 'UNLICENSED', description: 'All rights reserved.' },
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
