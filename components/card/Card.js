import styles from './Card.module.scss'

const Card = ({
  children,
  total,
  color = '',
  items = []
}) => {
  const percentages = items.map(item => (item.quantity * 100 / total).toFixed(2))

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardBody}>
        {children}
      </div>
      <div className={styles.cardFooter}>
        <div className='columns'>
          {/* left */}
          <div className={`column is-half ${styles.left}`}>
            <h4>{items[0].device}</h4>
            <p>
              <span className={styles.percentage}>{percentages[0]}%</span>
              <span className={styles.quantity}>{items[0].quantity}</span>
            </p>
          </div>

          {/* right */}
          <div className={`column ${styles.right}`}>
            <h4>{items[1].device}</h4>
            <p>
              <span className={styles.percentage}>{percentages[1]}%</span>
              <span className={styles.quantity}>{items[1].quantity}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
