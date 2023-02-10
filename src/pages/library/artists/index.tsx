import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

import MainPage from '@/components/library/artists/mainpage';
import useAuth from '@/hooks/useAuth';

function Artists() {
  const isAuthenticated = useAuth(true)
  return (
    <Main
      meta={
        <Meta
          title="Ylvonis"
          description="Ylvonis Music"
        />
      }
      title='Artists'
      nested={true}
    >
      <MainPage />

    </Main>
  )
}

export default Artists