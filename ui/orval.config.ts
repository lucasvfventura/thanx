import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: './swagger.yaml',
    output: {
      mode: 'tags-split',
      clean: true,
      target: './src/api/',
      schemas: './src/api/model/',
      client: 'react-query',
      httpClient: 'fetch',
      baseUrl: 'http://localhost:3000',
    },
  },
});
