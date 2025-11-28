import React from "react";
import Head from "next/head";
import { portfolioConfig } from "../utils/config";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path = "",
  ogImage,
}) => {
  const { seo } = portfolioConfig;
  const fullTitle = `${title} | ${seo.siteName}`;
  const canonical = `${seo.baseUrl}${path}`;
  const socialImage = ogImage || `${seo.baseUrl}${seo.defaultOgImage}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
      <link rel='canonical' href={canonical} />

      <meta property='og:type' content='website' />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={seo.siteName} />
      <meta property='og:url' content={canonical} />
      <meta property='og:image' content={socialImage} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={socialImage} />
    </Head>
  );
};

export default SEO;
