import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    unoptimized:true,
    remotePatterns:[
      {
        protocol: "https",
        hostname: "utfs.io",
        port:"",
      }
    ]
  }

};


export default nextConfig;
