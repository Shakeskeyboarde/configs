import prompts from 'prompts';

export async function readNodeVersion(): Promise<string> {
  const { nodeVersion } = await prompts(
    {
      type: 'text',
      name: 'nodeVersion',
      message: 'Node version (minimum supported)?',
      initial: '12',
    },
    {
      onCancel: () => {
        throw Error('Aborted.');
      },
    },
  );

  return nodeVersion;
}
