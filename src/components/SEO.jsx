import { Helmet } from 'react-helmet-async';

const site = {
  title: 'Jainam Maru | Cybersecurity & Full-Stack Developer',
  description: 'Cybersecurity engineer and full-stack developer building secure, intelligent systems. Explore projects, skills, and expertise.',
  url: 'https://jainammaru.dev',
  image: '/profile.png',
};

export default function SEO({ title, description }) {
  const pageTitle = title ? `${title} | Jainam Maru` : site.title;
  const pageDesc = description || site.description;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={site.url} />
      <meta property="og:image" content={site.image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
