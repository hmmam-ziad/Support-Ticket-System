

const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,  // يمنع caching الـ dynamic routes زي API
    },
  },
};

export default nextConfig;
