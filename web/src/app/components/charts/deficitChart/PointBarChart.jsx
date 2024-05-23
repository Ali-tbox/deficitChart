import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels' // Import the plugin
import colors from '../../../config/colors'

function PointBarChart({ type, data }) {
  function getColorByRange(number) {
    if (type === 'front') {
      if (number >= 0 && number <= 11) {
        return colors.mediumGreen
      } else if (number >= 12 && number <= 23) {
        return colors.darkGreen
      } else if (number >= 24 && number <= 35) {
        return colors.lightYellow
      } else if (number >= 36 && number <= 47) {
        return colors.paleYellow
      } else if (number >= 48 && number <= 59) {
        return colors.mediumRed
      } else if (number >= 60) {
        return colors.mehron
      } else {
        return 'black' // Default color if the number is out of specified ranges
      }
    }
    if (type === 'hind') {
      if (number >= 0 && number <= 5) {
        return colors.mediumGreen
      } else if (number >= 6 && number <= 13) {
        return colors.darkGreen
      } else if (number >= 14 && number <= 21) {
        return colors.lightYellow
      } else if (number >= 22 && number <= 29) {
        return colors.paleYellow
      } else if (number >= 30 && number <= 37) {
        return colors.mediumRed
      } else if (number >= 38) {
        return colors.mehron
      } else {
        return 'black' // Default color if the number is out of specified ranges
      }
    }
  }

  const right = data?.right || 0
  const left = data?.left || 0
  const straight = data?.straight || 0
  const mean = Math.round((right + left + straight) / 3)
  const isLeft = data?.left !== undefined ? [Math.round(data.left)] : []
  const isStraight = data?.straight !== undefined ? [...isLeft, Math.round(data.straight)] : [...isLeft]
  const isRight = data?.right !== undefined ? [...isStraight, Math.round(data.right)] : [...isStraight]
  const isLeftColor = data?.left !== undefined ? [colors.faintblue] : []
  const isStraightColor = data?.straight !== undefined ? [...isLeftColor, colors.mustard] : [...isLeftColor]
  const isRightColor = data?.right !== undefined ? [...isStraightColor, colors.darkpurple] : [...isStraightColor]
  const labelColor = isRightColor

  const isLeftPointColor = data?.left !== undefined ? [colors.lightfaintblue] : []
  const isStraightPointColor = data?.straight !== undefined ? [...isLeftPointColor, colors.lightMustard] : [...isLeftPointColor]
  const isRightPointColor = data?.right !== undefined ? [...isStraightPointColor, colors.lightPurple] : [...isStraightPointColor]
  const labelPointColor = isRightPointColor
  const labelData = isRight
  console.log('adasdasdasda', type)

  const chartContainer = useRef(null)
  let myChart = null

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (myChart) {
        myChart.destroy()
      }

      const ctx = chartContainer.current.getContext('2d')

      myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'April', 'April', 'April'],
          datasets: [
            {
              label: 'Line Dataset',
              data: [, 100, -100, 60, 29, -40, 60],
              borderColor: [, ...labelColor],
              pointBackgroundColor: [, ...labelColor],
              pointRadius: 5,
              pointHoverRadius: 5,
              pointBorderWidth: 2,

              borderWidth: 0,

              type: 'line',
            },
            {
              label: 'Bar Dataset',
              data: [, 100, -100, 60, 29, -40, 60],
              backgroundColor: [, ...labelPointColor],
              borderRadius: 16,
              maxBarThickness: '12',
              borderSkipped: false,
            },
            {
              label: 'Line Dataset',
              data: [mean, mean, mean, mean, mean, mean],
              pointStyle: false,
              borderColor: '#868B8F',
              borderDash: [5, 5],

              type: 'line',
            },
            // {
            //   label: 'Zero Line',
            //   data: Array().fill(0),
            //   borderColor: 'black', // Color of the horizontal line
            //   borderWidth: 2, // Width of the horizontal line
            //   type: 'line', // Set as a line dataset
            //   pointStyle: false, // Hide points for the line dataset
            // },
          ],
        },
        options: {
          hover: {
            mode: null, //
          },
          responsive: true,
          maintainAspectRatio: false,

          animation: false,
          plugins: {
            legend: {
              display: false,
              position: 'top',
            },
            datalabels: {
              // Configure the datalabels plugin

              display: context => context.datasetIndex === 1,

              borderColor: context => {
                // console.log('asdadad', getColorByRange(context.dataset.data[context.dataIndex]))
                return getColorByRange(Math.abs(context.dataset.data[context.dataIndex]))
              },

              borderRadius: '6',
              borderWidth: 1.5,

              font: {
                weight: 700,
                family: 'Noto Sans',
                size: 12,
              },
              color: 'black',

              anchor: context => {
                return context.dataset.data[context.dataIndex] < 0 ? 'start' : 'end'
              },
              align: context => {
                return context.dataset.data[context.dataIndex] < 0 ? 'bottom' : 'top'
              },
              formatter: value => {
                if (typeof value === 'undefined') {
                  return
                }
                return Math.abs(value).toString()
              }, // Display the data value as the label
              offset: 10,
              padding: {
                top: 3,
                bottom: 2.5,
                left: 4,
                right: 4,
              },
            },
            tooltip: false,
          },
          layout: {
            // padding: {
            //   left: 0,
            //   right: -15,
            //   top: 0,
            //   bottom: 0,
            // },
          },
          scales: {
            x: {
              display: false,
              grid: {
                display: false,
              },
            },
            y: {
              border: {
                display: false,
              },
              grid: {
                color: context => (context.tick.value === 0 ? '#CCCCCC' : 'transparent'),
                drawTicks: false,
                borderWidth: 1,
                drawBorder: false,
                borderColor: 'transparent',
              },
              ticks: {
                display: false,
              },
              suggestedMin: -120,
              suggestedMax: 120,
            },
          },
        },
        plugins: [ChartDataLabels], // Include the datalabels plugin
      })
    }

    return () => {
      if (myChart) {
        myChart.destroy()
      }
    }
  }, [data])

  return <canvas style={{ width: '100%', height: '100%' }} ref={chartContainer} />
}

export default PointBarChart
