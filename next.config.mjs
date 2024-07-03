/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns : [
            {protocol : "https",
            hostname : "lh3.googleusercontent.com"},
            {protocol : "https",
                hostname : "myecommarsproject.s3.amazonaws.com"}

        ],
        minimumCacheTTL: 600,
    }
};

export default nextConfig;
