/**
 * Application Identity (Brand)
 *
 * Also note that the 'Brand' is used in the following places:
 *  - README.md               all over
 *  - package.json            app-slug and version
 *  - [public/manifest.json]  name, short_name, description, theme_color, background_color
 */
export const Brand = {
  Title: {
    Base: 'RonGPT',
    Common: (process.env.NODE_ENV === 'development' ? '[DEV] ' : '') + 'RonGPT',
  },
  Meta: {
    Description: 'Leading open-source AI web interface to help you learn, think, and do. AI personas, superior privacy, advanced features, and fun UX.',
    SiteName: 'RonGPT - AI for Everyone',
    ThemeColor: '#434356',
    TwitterSite: '@enricoros',
  },
  URIs: {
    Home: 'https://gpt.ron.digital',
    // App: 'https://gpt.ron.digital',
    CardImage: 'https://big-agi.com/icons/card-dark-1200.png',
    OpenRepo: 'https://github.com/fexploit',
    SupportInvite: 'https://discord.gg/',
    // Twitter: 'https://www.twitter.com/enricoros',
  },
};