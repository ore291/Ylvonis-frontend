import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import MainPage from '../../components/library/mainpage'

function Library() {
  return (
  <Main
      meta={
        <Meta
          title="Ylvonis"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
      title='Library'
    >
      <MainPage />

    </Main>
  )
}

export default Library