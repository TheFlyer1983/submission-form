export default defineEventHandler(async (event) => {
  return [
    {
      label: 'Web Development',
      value: 'web_development'
    },
    {
      label: 'Mobile Development',
      value: 'mobile_development'
    },
    {
      label: 'SEO Services',
      value: 'seo_services'
    },
    {
      label: 'Other',
      value: 'other'
    }
  ];
});
