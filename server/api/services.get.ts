export default defineEventHandler(async (event) => {
  const { locale } = getQuery(event);

  return [
    {
      label: locale === 'fr' ? 'Développement Web' : 'Web Development',
      value: 'web_development'
    },
    {
      label: locale === 'fr' ? 'Développement mobile' : 'Mobile Development',
      value: 'mobile_development'
    },
    {
      label: locale === 'fr' ? 'Services de référencement' : 'SEO Services',
      value: 'seo_services'
    },
    {
      label: locale === 'fr' ? 'Autre' : 'Other',
      value: 'other'
    }
  ];
});
