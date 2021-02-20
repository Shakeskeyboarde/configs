import path from 'path';
import prompts from 'prompts';

export async function readRepoName(): Promise<string | undefined> {
  const { create, repoName } = await prompts(
    [
      {
        type: 'confirm',
        name: 'create',
        message: 'Use git?',
        initial: true,
      },
      {
        type: (prev: boolean) => (prev ? 'text' : null),
        name: 'repoName',
        message: 'Repo name?',
        initial: path.basename(process.cwd()).toLowerCase().replace(/\W+/g, '-'),
        validate: (value) =>
          /[^\w-]/.test(value) ? 'Can only contain letters, numbers, underscores and hyphens' : true,
      },
    ],
    {
      onCancel: () => {
        throw Error('Aborted.');
      },
    },
  );

  return create ? repoName : undefined;
}
