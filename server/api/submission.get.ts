export default defineEventHandler(async () => {
  const storage = useStorage('data');

  const form = await storage.getItem('form');

  return form;
})
