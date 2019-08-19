export type CompositeUrl = {
  OVERRIDE_BASE: boolean,
  URL: string
}

export type ObjectUrl = string | CompositeUrl;

export default {
  DUMMY: 'replace-usage-of-this-variable',
  SESSION: '/session', // GET
}
