import execa from 'execa';
import prompts from 'prompts';

export async function readPackageAuthor(): Promise<string> {
  const { author } = await prompts(
    {
      type: 'text',
      name: 'author',
      message: 'Package author?',
      initial: await execa('git', ['config', 'user.name'])
        .then((result) => result.stdout.trim())
        .catch(() => ''),
    },
    {
      onCancel: () => {
        throw Error('Aborted.');
      },
    },
  );

  return author;
}
