import type { NextConfig } from 'next';

const basePath = '/litera';

const nextConfig: NextConfig = {
  // Индикатор режима разработки перекрывал угол страницы на снимках сверки.
  devIndicators: false,
  // Статический прототип для согласования с заказчиком на GitHub Pages.
  output: 'export',
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Статический экспорт не умеет в серверную оптимизацию картинок,
    // а unoptimized не подставляет basePath сам — грузим свой loader.
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    // Обложки блога и миниатюры портфолио пока лежат на живом сайте.
    // Когда статьи и работы переедут в CMS, файлы станут своими и строка уйдёт.
    remotePatterns: [{ protocol: 'https', hostname: 'litera.studio', pathname: '/wp-content/uploads/**' }],
  },
};

export default nextConfig;
