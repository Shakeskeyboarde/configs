import prompts from 'prompts';

export interface IWebpackConfig {
  title: string;
  publicPath: string;
  devServerPort: number;
}

export async function readWebpackConfig(defaultTitle: string): Promise<IWebpackConfig> {
  const { title, publicPath, devServerPort } = await prompts(
    [
      {
        type: 'text',
        name: 'title',
        message: 'Webpack index.html title?',
        initial: defaultTitle,
      },
      {
        type: 'text',
        name: 'publicPath',
        message: 'Webpack public path?',
        initial: '/',
      },
      {
        type: 'number',
        name: 'devServerPort',
        message: 'Webpack dev server port?',
        initial: 3000,
        validate: (value: string) => {
          const num = Number.parseInt(value, 10);

          return !value
            ? true
            : Number.isNaN(num)
            ? 'Port must be a valid number'
            : num <= 0
            ? 'Port must be greater than zero'
            : num >= 65536
            ? 'Port must be less than 65536'
            : true;
        },
      },
    ],
    {
      onCancel: () => {
        throw Error('Aborted.');
      },
    },
  );

  return { title, publicPath, devServerPort };
}
