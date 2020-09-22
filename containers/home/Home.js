import useSWR from 'swr'
import fetch from 'unfetch'
import { Card, Loading, Chart } from '../../components'
import styles from './Home.module.scss'

const fetcher = url => fetch(url).then(r => r.json())

const HomeContainer = () => {
  const { data, error } = useSWR('/api/data', fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <Loading />

  return (
    <div className={styles.home}>
      <div className='container'>
        <div className='columns'>
          {data.charts.map((chart, i) => {
            const total = chart.items[0].quantity + chart.items[0].quantity
            return (
              <div key={i} className='column is-one-third'>
                <Card total={total} items={chart.items} color={chart.color}>
                  <Chart
                    total={total}
                    items={chart.items}
                    color={chart.color}
                    currency={chart.currency}
                    title={chart.title}
                    data={chart.data}
                  />
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HomeContainer
