import prompts from 'prompts';

export interface IBabelConfig {
  corejs: true;
}

export async function readUseCoreJs(initial: boolean): Promise<boolean> {
  const { value } = await prompts(
    {
      type: 'confirm',
      name: 'value',
      message: 'Babel polyfills (core-js)?',
      initial,
    },
    {
      onCancel: () => {
        throw Error('Aborted.');
      },
    },
  );

  return value;
}
