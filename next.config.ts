import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Индикатор режима разработки перекрывал угол страницы на снимках сверки.
  devIndicators: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Обложки блога и миниатюры портфолио пока лежат на живом сайте.
    // Когда статьи и работы переедут в CMS, файлы станут своими и строка уйдёт.
    remotePatterns: [{ protocol: 'https', hostname: 'litera.studio', pathname: '/wp-content/uploads/**' }],
  },
};

export default nextConfig;
