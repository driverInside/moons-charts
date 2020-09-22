import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import styles from './Chart.module.scss'

const getColor = (color = 'red') => {
  const colors = {
    red: [
      ['f', 'e', '2'],
      ['f', '0', '1']
    ],
    green: [
      ['1', 'f', '0'],
      ['1', '7', '0']
    ],
    blue: [
      ['6', 'd', 'f'],
      ['0', '0', '9']
    ]
  }

  return colors[color]
}

const getColorStyle = (color = 'red') => styles[color]

const Chart = ({
  total,
  data,
  title = '',
  color = 'red',
  currency = '',
  items = []
}) => {
  const cx = 30
  const cy = 30
  const r = 100 / (1.2 * Math.PI)
  const circumference = 2 * Math.PI * r
  const diameter = 2 * r
  const sizeRatio = 2
  const chartColor = getColor(color)
  const chartValue = (items[1].quantity * 100) / total

  const ref = useRef()
  const [progress, setProgress] = useState(0)

  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.x))
    .range([0, diameter * 0.6])
  const y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.y))
    .range([0, diameter * 0.3])

  const updatePercentage = () => {
    setTimeout(() => {
      setProgress(progress + 1)
    }, 10)
  }

  useEffect(() => {
    const svgElement = d3.select(ref.current)

    svgElement.append('path')
      .datum(data)
      .attr('fill', 'none')
      .style('opacity', '0.2')
      .attr('transform', `translate(${diameter * 0.27}, ${diameter * 0.6})`)
      .attr('stroke', `#${chartColor[1].join('')}`)
      .attr('stroke-width', 0.6)
      .attr(
        'd',
        d3.line()
          .x(d => x(d.x))
          .y(d => y(d.y))
          .curve(d3.curveBasis)
      )

    svgElement.append('path')
      .datum(data)
      .attr('fill', `#${chartColor[0].join('')}`)
      .attr('className', `${getColorStyle(color)}`)
      .attr('fill-opacity', '0.3')
      .attr('transform', `translate(${diameter * 0.27}, ${diameter * 0.6})`)
      .attr(
        'd',
        d3.area()
          .curve(d3.curveBasis)
          .x(d => x(d.x))
          .y0(diameter * 0.3)
          .y1(d => y(d.y))
      )

    svgElement.append('circle')
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', r)
      .attr('fill', 'transparent')
      .attr('stroke', `#${chartColor[0].join('')}`)
      .attr('stroke-width', 2)
  }, [])

  useEffect(() => {
    const svgElement = d3.select(ref.current)
    svgElement.append('circle')
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', r)
      .attr('transform', `rotate(-90 ${cx} ${cy})`)
      .attr('fill', 'transparent')
      .attr('stroke', `#${chartColor[1].join('')}`)
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', `${circumference * progress / 100} ${circumference}`)
      .attr('stroke-dashoffset', 0)

    if (progress < chartValue) {
      updatePercentage()
    }
  }, [progress])

  return (
    <div className='chartContainer'>
      <svg ref={ref} viewBox={`0 0 ${cx * sizeRatio} ${cx * sizeRatio}`}>
        <g className={styles.chartText}>
          <text x='50%' y='50%' fill='#999' className={styles.chartTitle}>
            {title}
          </text>
          <text x='50%' y='50%' className={styles.chartTotal}>
            {total}{currency}
          </text>
        </g>
      </svg>
    </div>
  )
}

export default Chart
