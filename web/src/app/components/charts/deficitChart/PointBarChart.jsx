import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels' // Import the plugin
import colors from '../../../config/colors'

function PointBarChart({ type, data1, data }) {
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

  const right = Math.trunc(data?.right)
  const left = Math.trunc(data?.left)
  const straight = Math.trunc(data?.straight)

  const baseRight = Math.trunc(data1?.right)
  const baseLeft = Math.trunc(data1?.left)
  const baseStraight = Math.trunc(data1?.straight)

  const mean = data?.mean
  const baseMean = data1?.mean

  const isLeftColor = !isNaN(left) ? [colors.faintblue] : []
  const isBaseLeftColor = !isNaN(baseLeft) ? [...isLeftColor, colors.faintblue] : [...isLeftColor]
  const isStraightColor = !isNaN(straight) ? [...isBaseLeftColor, colors.mustard] : [...isLeftColor]
  const isBaseStraightColor = !isNaN(baseStraight) ? [...isStraightColor, colors.mustard] : [...isStraightColor]
  const isRightColor = !isNaN(right) ? [...isBaseStraightColor, colors.darkpurple] : [...isBaseStraightColor]
  const isBaseRightColor = !isNaN(baseRight) ? [...isRightColor, colors.darkpurple] : [...isRightColor]
  const labelColor = isBaseRightColor

  const isLeftPointColor = !isNaN(left) ? [colors.lightfaintblue] : []
  const isBaseLeftPointColor = !isNaN(baseLeft) ? [...isLeftPointColor, colors.lightfaintblue] : [...isLeftPointColor]
  const isStraightPointColor = !isNaN(straight) ? [...isBaseLeftPointColor, colors.lightMustard] : [...isBaseLeftPointColor]
  const isBaseStraightPointColor = !isNaN(baseStraight) ? [...isStraightPointColor, colors.lightMustard] : [...isStraightPointColor]
  const isRightPointColor = !isNaN(right) ? [...isBaseStraightPointColor, colors.lightPurple] : [...isBaseStraightPointColor]
  const isBaseRightPointColor = !isNaN(baseRight) ? [...isRightPointColor, colors.lightPurple] : [...isRightPointColor]
  const labelPointColor = isBaseRightPointColor
  // let labelPointColor = []

  // if (data?.left) labelPointColor.push(colors.lightfaintblue)
  // if (data1?.baseLeft !== undefined) labelPointColor.push(colors.lightfaintblue)
  // if (data?.straight !== undefined) labelPointColor.push(colors.lightMustard)
  // if (data1?.baseStraight !== undefined) labelPointColor.push(colors.lightMustard)
  // if (data?.right !== undefined) labelPointColor.push(colors.lightPurple)
  // if (data?.baseRight !== undefined) labelPointColor.push(colors.lightPurple)
  // const labelData = isRight

  const dataArray = [left, baseLeft, straight, baseStraight, right, baseRight]
  const filteredArray = dataArray.filter(value => !isNaN(value))
  console.log('adasdasdasda', dataArray, data1)

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
              data: [, ...filteredArray],
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
              data: [, ...filteredArray],
              backgroundColor: [, ...labelPointColor],
              borderRadius: 16,
              maxBarThickness: '12',
              borderSkipped: false,
            },
            {
              label: 'Line Dataset',
              data: [mean, mean, mean, mean, mean, mean, mean, mean],
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
