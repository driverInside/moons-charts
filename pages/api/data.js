const generateData = () => {
  const data = []
  for (let i = 0; i < 20; i++) {
    data.push({
      x: i,
      y: Math.floor(Math.random() * (10 - 2)) + 2
    })
  }
  return data
}
export default (req, res) => {
  const data = []
  const charts = [
    {
      title: 'revenue',
      color: 'green',
      currency: '€',
      items: [
        {
          device: 'tablet',
          quantity: Math.floor(Math.random() * (100000 - 50000)) + 50000
        },
        {
          device: 'smartphone',
          quantity: Math.floor(Math.random() * (100000 - 50000)) + 50000
        }
      ],
      data: generateData()
    },
    {
      title: 'impresions',
      color: 'blue',
      currency: '',
      items: [
        {
          device: 'tablet',
          quantity: Math.floor(Math.random() * (50000 - 10000)) + 10000
        },
        {
          device: 'smartphone',
          quantity: Math.floor(Math.random() * (50000 - 10000)) + 10000
        }
      ],
      data: generateData()
    },
    {
      title: 'visits',
      color: 'red',
      currency: '',
      items: [
        {
          device: 'tablet',
          quantity: Math.floor(Math.random() * (100000 - 50000)) + 50000
        },
        {
          device: 'smartphone',
          quantity: Math.floor(Math.random() * (100000 - 50000)) + 50000
        }
      ],
      data: generateData()
    }
  ]

  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ charts }))
}
