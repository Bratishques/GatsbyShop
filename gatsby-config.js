
  const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
  console.log(`Using environment config: '${process.env.NODE_ENV}'`)
  require("dotenv").config({
    path: `.env.${activeEnv}`,
  })

  process.env.ENABLE_GATSBY_REFRESH_ENDPOINT=true
  
module.exports = {
  siteMetadata: {
    title: `GatsbyShop`,
    description: `This is my portfolio project to show React/Gatsby/Redux/UseContext and Node.js/MongoDB stack interaction`,
    author: ``,
  },
  proxy: {
    prefix: "/api",
    url: "http://localhost:5000",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/admin/*`, `/app/*`] },
    },
    {
      resolve: `gatsby-source-mongodb`,
      options: {connectionString: "mongodb+srv://Bratishques:812951476@cluster0-xpfff.mongodb.net/GatsbyShop?retryWrites=true&w=majority",
      dbName: "GatsbyShop",
      collection: ['products', 'categories']
    
    }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
