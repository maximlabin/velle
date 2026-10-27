// Не восстановлен из бандла, а подобран так, чтобы сборка вела себя как оригинал:
// импорт SVG отдаёт URL файла (в оригинале — /_next/<hash>.svg).
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      type: "asset/resource",
      generator: { filename: "static/media/[hash][ext]" },
    });
    return config;
  },
};
