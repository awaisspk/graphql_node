import { ApolloServer } from 'apollo-server'
import * as fs from 'fs'
import * as path from 'path'

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
]

const resolvers = {
  Query: {
    info: () => `This is the Api of a Hackernews clone`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (parent, args) => {
      const index = links.indexOf(args.id)
      const link = {
        id: args.id,
        description: args.description,
        url: args.url,
      }
      links[index] = link
      return link
    },
  },
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
})

server.listen().then(({ url }) => console.log(`Server is running on ${url}`))
