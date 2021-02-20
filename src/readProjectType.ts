import prompts from 'prompts';
import { ProjectType } from './ProjectType';

export async function readProjectType(): Promise<ProjectType> {
  const { value } = await prompts(
    {
      type: 'select',
      name: 'value',
      message: 'Project type?',
      choices: [
        {
          title: 'Single Page Application (Webpack)',
          value: 'spa',
          description: 'A bundled webpage which can be viewed in a browser.',
        },
        {
          title: 'Web Library (Microbundle)',
          value: 'lib-web',
          description: 'A library that can be used in a browser.',
        },
        {
          title: 'NodeJS Library (Babel)',
          value: 'lib-node',
          description: 'A library that can be used in a NodeJS project.',
        },
        {
          title: 'Command Line Interface (Babel)',
          value: 'cli',
          description: 'A NodeJS executable script.',
        },
      ],
    },
    {
      onCancel: () => {
        throw Error('Aborted.');
      },
    },
  );

  return value;
}
