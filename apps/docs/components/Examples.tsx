import { Cards, Card } from 'nextra-theme-docs'
import { FiArrowRight } from 'react-icons/fi'

export const Examples = () => {
  return (
    <Cards>
      <Card href="examples/NextAuth" icon={<FiArrowRight size="1.5rem" />} title="NextAuth">
        {' '}
      </Card>
      <Card href="examples/Passport" icon={<FiArrowRight size="1.5rem" />} title="Passport.js">
        {' '}
      </Card>
      <Card href="examples/ApolloServer" icon={<FiArrowRight size="1.5rem" />} title="Apollo Server">
        {' '}
      </Card>
      <Card href="examples/NestJs" icon={<FiArrowRight size="1.5rem" />} title="NestJS">
        {' '}
      </Card>
    </Cards>
  )
}
