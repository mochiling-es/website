const routes = {
  '/': () => ({
    en: '/en',
    es: '/'
  }),
  '/proposals': ({ proposalId = '' }) => ({
    en: `/en/proposals${proposalId ? '/' + proposalId : ''}`,
    es: `/propuestas${proposalId ? '/' + proposalId : ''}`
  }),
  '/experiences': () => ({
    en: '/en/experiences',
    es: '/experiencias'
  }),
  '/experience': ({ memberId, experienceSlug }) => ({
    en: `/en/experiences/${memberId}/${experienceSlug}`,
    es: `/experiencias/${memberId}/${experienceSlug}`
  }),
  '/team': () => ({
    en: '/en/team',
    es: '/equipo'
  }),
  '/member': ({ memberId }) => ({
    en: `/en/team/${memberId}`,
    es: `/equipo/${memberId}`
  }),
  '/admin/member': ({ memberId }) => ({
    en: `/en/team/${memberId ? `${memberId}/edit` : 'new'}`,
    es: `/equipo/${memberId ? `${memberId}/editar` : 'nuevo'}`
  }),
  '/admin/experience': ({ memberId, experienceSlug }) => ({
    en: `/en/experiences/${memberId && experienceSlug ? `${memberId}/${experienceSlug}/edit` : 'new'}`,
    es: `/experiencias/${memberId && experienceSlug ? `${memberId}/${experienceSlug}/editar` : 'nueva'}`
  }),
  '/admin': () => ({
    en: '/en/admin',
    es: '/admin'
  }),
  '/cookies': () => ({
    en: '/en/cookies',
    es: '/cookies'
  })
}

const serialize = data => {
  return Object.keys(data)
    .map(key => `${key}=${encodeURIComponent(data[key])}`)
    .join('&')
}

const getLinkProps = ({ href, as, page, params, lang }) => {
  if (!page) {
    console.log('OUCH', href, as)
    return {}
  }

  if (!routes[page]) {
    throw new Error(`${page} doesn't exist`)
  }

  const route = routes[page](params)
  const routeLang = route[lang]

  return {
    href: `${page}?lang=${lang}${params ? '&' + serialize(params) : ''}`,
    as: routeLang
  }
}

export { getLinkProps }
