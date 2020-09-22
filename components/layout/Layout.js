import Head from 'next/head'
import styles from './Layout.module.scss'

const Layout = ({
  children,
  title = 'Moons chat challenge'
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <main>
        {children}
      </main>
    </>
  )
}
export default Layout
