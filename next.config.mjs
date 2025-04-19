/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'img.clerk.com'
            },{
                protocol: 'https',
        hostname: 'home-away.s3.eu-north-1.amazonaws.com',
        port: '',
        pathname: '/**', // Allow all paths under this hostname
            }
        ]
    }
};

export default nextConfig;
