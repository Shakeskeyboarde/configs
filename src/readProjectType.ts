import prompts from 'prompts';
import { ProjectType } from './ProjectType';

export async function readProjectType(): Promise<ProjectType> {
  const { value } = await prompts(
    {
      type: 'select',
      name: 'value',
      message: 'Project type?',
      choices: [
        { title: 'Single Page Application (Webpack)', value: 'spa' },
        { title: 'Web Library (Microbundle)', value: 'lib-web' },
        { title: 'NodeJS Library (Babel)', value: 'lib-node' },
        { title: 'Command Line Interface (Babel)', value: 'cli' },
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
