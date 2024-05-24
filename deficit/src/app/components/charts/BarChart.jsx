import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

import ChartDataLabels from 'chartjs-plugin-datalabels'
import colors from '../../config/colors'
import assets from '../../assets/assests'

function BarChart({ text, handleItemClick, deficitLabel, selectedItem, data, leftData, rightData, type }) {
  const handleClick = event => {
    const canvas = chartContainer.current
    const ctx = ctxRef.current
    const x = event.offsetX // Mouse click x-coordinate relative to canvas
    const y = event.offsetY // Mouse click y-coordinate relative to canvas

    // Check if the click is within the bounds of the icon
    const iconX = 90 // Example icon x-coordinate
    const iconY = 90 // Example icon y-coordinate
    const iconWidth = 12 // Example icon width
    const iconHeight = 12 // Example icon height
    console.log('Icon clicked!`12', x, y)
    if (x >= iconX && x <= iconX + iconWidth && y >= iconY && y <= iconY + iconHeight) {
      // Perform actions when the icon is clicked
      console.log('Icon clicked!')
    }
  }

  console.log('heeasdfa', leftData, rightData)
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
  const chartContainer = useRef(null)
  const ctxRef = useRef(null)
  let myChart = null // Variable to hold the chart instance

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (myChart) {
        // Destroy the existing chart if it exists
        myChart.destroy()
      }

      const ctx = chartContainer.current.getContext('2d')
      // const CustomBox = {
      //   id: 'CustomBox',
      //   beforeDraw(chart, args, options) {
      //     const {
      //       ctx,
      //       chartArea: { left, top, width, height },
      //     } = chart

      //     ctx.fillStyle = 'red'
      //     // Add text for the data representation between the dashed lines
      //     ctx.save()
      //     ctx.fillRect(width * 0.64, width, left * 6.1, height)

      //     ctx.fillStyle = colors.redbtn
      //     ctx.textAlign = 'center'
      //     ctx.fillText('Right push off deficit', width, height * 0.3)
      //     ctx.restore()
      //   },
      // }
      // const plugin = {
      //   id: 'custom_datalabels_background_rectangle',
      //   afterDatasetsDraw: (chart, args, options) => {
      //     const { ctx } = chart
      //     const datasets = chart.data.datasets
      //     const datalabelsOptions = chart.options.plugins.datalabels || {}
      //     const font = datalabelsOptions.font || {}
      //     const padding = 5
      //     const gap = 5
      //     const lineWidth = 2
      //     ctx.save()
      //     ctx.strokeStyle = options.color
      //     ctx.lineWidth = lineWidth
      //     const iconImage = new Image()
      //     const iconWidth = 12
      //     const iconHeight = 12

      //     datasets.forEach((dataset, datasetIndex) => {
      //       const meta = chart.getDatasetMeta(datasetIndex)
      //       meta.data.forEach((element, index) => {
      //         const value = dataset.data[index]
      //         const label = value.toString()
      //         if (label && !isNaN(label) && ((label < 88 && type === 'front') || (label < 95 && type === 'hind'))) {
      //           const x = element.x
      //           const y = element.y
      //           const labelWidth = ctx.measureText(label).width + padding * 6
      //           const labelHeight = font.size ? font.size + padding * 3.5 : 0
      //           const rectX = x - labelWidth / 2
      //           const rectY = y - labelHeight - 4

      //           ctx.strokeStyle = '#5850AE'
      //           ctx.beginPath()
      //           ctx.moveTo(rectX, rectY)
      //           ctx.lineTo(rectX + labelWidth, rectY)
      //           ctx.stroke()

      //           ctx.beginPath()
      //           ctx.moveTo(rectX, rectY + labelHeight)
      //           ctx.lineTo(rectX + labelWidth, rectY + labelHeight)
      //           ctx.stroke()

      //           ctx.save()
      //           ctx.beginPath()
      //           ctx.rect(rectX, rectY, labelWidth, labelHeight)
      //           ctx.clip()

      //           const diagonalLength = Math.sqrt(labelWidth ** 2 + labelHeight ** 2)
      //           const numLines = Math.ceil(diagonalLength / gap)
      //           const adjustedGap = diagonalLength / numLines + 3

      //           for (let i = 0; i <= numLines; i++) {
      //             const startX = rectX - diagonalLength + i * adjustedGap
      //             const endX = startX + diagonalLength
      //             ctx.beginPath()
      //             ctx.lineWidth = 1
      //             ctx.moveTo(startX, rectY)
      //             ctx.lineTo(endX, rectY + labelHeight)
      //             ctx.stroke()
      //           }

      //           ctx.restore()
      //           ctx.fillStyle = '#FFF'
      //           ctx.fillRect(x - labelWidth / 2 + 5.3, y - labelHeight / 2 - 12.5, labelWidth - 10, labelHeight - 13)

      //           // Calculate the icon position relative to the canvas
      //           const iconX = x - labelWidth / 2 + 9.3 + (labelWidth - iconWidth) / 2
      //           const iconY = y - labelHeight / 2 - 18.5 + (labelHeight - iconHeight) / 2

      //           iconImage.onload = () => {
      //             ctx.drawImage(iconImage, iconX, iconY, iconWidth, iconHeight)
      //           }
      //           iconImage.src = assets.icons.chartInfo

      //           // Add click event listener
      //           chartContainer.current.addEventListener('click', function (event) {
      //             const mouseX = event.clientX - chartContainer.current.getBoundingClientRect().left
      //             const mouseY = event.clientY - chartContainer.current.getBoundingClientRect().top
      //             if (mouseX >= iconX && mouseX <= iconX + iconWidth && mouseY >= iconY && mouseY <= iconY + iconHeight) {
      //               handleItemClick(`stride-symmetry ${type} ${text}`)
      //             }
      //           })

      //           ctx.fillStyle = '#181818'
      //           ctx.font = 'bold 12px Noto Sans'
      //           ctx.textAlign = 'center'
      //           ctx.textBaseline = 'middle'
      //           ctx.fillText(deficitLabel, x - 5, y - 18)
      //         }
      //       })
      //     })
      //     ctx.restore()
      //   },
      //   defaults: {
      //     color: 'blue',
      //   },
      // }
      const plugin = {
        id: 'custom_datalabels_background_rectangle',
        afterDatasetsDraw: (chart, args, options) => {
          const { ctx, scales, chartArea } = chart
          const datasets = chart.data.datasets
          const datalabelsOptions = chart.options.plugins.datalabels || {}
          const font = datalabelsOptions.font || {}
          const padding = 5
          const gap = 4
          const lineWidth = 2
          ctx.save()
          ctx.strokeStyle = options?.color
          ctx.lineWidth = lineWidth
          const iconImage = new Image()
          const iconWidth = 12
          const iconHeight = 12

          datasets.forEach((dataset, datasetIndex) => {
            const meta = chart.getDatasetMeta(datasetIndex)
            meta.data.forEach((element, index) => {
              const value = dataset.data[index]
              const label = value.toString()
              if (label && !isNaN(label) && ((label < 88 && type === 'front') || (label < 95 && type === 'hind'))) {
                const maxHeight = ((100 - label) / scales.y.bottom) * 171
                const x = element.x
                const y = element.y
                const labelWidth = ctx.measureText(label).width + padding * 6
                const labelHeight = font.size ? font.size + padding * 3.5 : 0
                const rectX = x - labelWidth / 2
                const rectY = y - maxHeight - 2

                // Draw top and bottom borders
                ctx.strokeStyle = '#5850AE'
                ctx.beginPath()
                ctx.moveTo(rectX, rectY)
                ctx.lineTo(rectX + labelWidth, rectY)
                ctx.stroke()

                ctx.beginPath()
                ctx.moveTo(rectX, rectY + maxHeight)
                ctx.lineTo(rectX + labelWidth, rectY + maxHeight)
                ctx.stroke()

                ctx.save()
                ctx.beginPath()
                ctx.rect(rectX, rectY, labelWidth, maxHeight)
                ctx.clip()

                const diagonalLength = Math.sqrt(labelWidth ** 2 + maxHeight ** 2)
                const numLines = Math.ceil(diagonalLength / gap)
                const adjustedGap = diagonalLength / numLines + 3

                for (let i = 0; i <= numLines; i++) {
                  const startX = rectX - diagonalLength + i * adjustedGap
                  const endX = startX + diagonalLength
                  ctx.beginPath()
                  ctx.lineWidth = 1
                  ctx.moveTo(startX, rectY)
                  ctx.lineTo(endX, rectY + maxHeight)
                  ctx.stroke()
                }

                ctx.restore()
                ctx.fillStyle = '#FFF'
                ctx.fillRect(rectX + labelWidth / 2 - 17, rectY + maxHeight / 2 - 9, labelWidth / 1.3, labelHeight - 12)

                // Calculate the icon position relative to the canvas
                const iconX = rectX + (labelWidth - iconWidth) / 2 + 9
                const iconY = rectY + (maxHeight - iconHeight) / 2 + 1.5

                iconImage.onload = () => {
                  ctx.drawImage(iconImage, iconX, iconY, iconWidth, iconHeight)
                }
                iconImage.src = assets.icons.chartInfo

                // Add click event listener
                chartContainer.current.addEventListener('click', function (event) {
                  const mouseX = event.clientX - chartContainer.current.getBoundingClientRect().left
                  const mouseY = event.clientY - chartContainer.current.getBoundingClientRect().top
                  if (mouseX >= iconX && mouseX <= iconX + iconWidth && mouseY >= iconY && mouseY <= iconY + iconHeight) {
                    handleItemClick(`stride-symmetry ${type} ${text}`)
                  }
                })

                ctx.fillStyle = '#181818'
                ctx.font = 'bold 12px Noto Sans'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(deficitLabel, rectX + labelWidth / 2 - 7, rectY + maxHeight / 2 + 2)
              }
            })
          })
          ctx.restore()
        },
        defaults: {
          color: 'blue',
        },
      }

      myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Left', 'Right'],
          datasets: [
            {
              label: 'none',
              data: [parseInt(leftData), parseInt(rightData)],
              backgroundColor: [
                parseInt(leftData) > parseInt(rightData) ? getColorByRange(0) : getColorByRange(parseInt(deficitLabel)),
                parseInt(rightData) > parseInt(leftData) ? getColorByRange(0) : getColorByRange(parseInt(deficitLabel)),
              ],

              borderRadius: 8,
              maxBarThickness: '46',
              borderSkipped: false,
              animation: false,
              // Set border radius for all bars
            },
          ],
        },
        options: {
          hover: {
            mode: null,
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
              position: 'top',
            },
            plugin,
            datalabels: {
              // Configure the datalabels plugin

              borderRadius: '6',
              borderWidth: 2,

              font: {
                weight: 'bold',
                size: 14,
              },
              color: colors.dullblack,
              padding: {
                top: 4,
                bottom: 2,
                left: 12,
                right: 12,
              },
              anchor: context => {
                return context.dataset.data[context.dataIndex] < 0 ? 'start' : 'end'
              },
              align: context => {
                return context.dataset.data[context.dataIndex] < 0 ? 'bottom' : 'top'
              },
              formatter: value => {
                console.log('cvaluawe', isNaN(value))
                if (isNaN(value) || (100 - value < 23 && type === 'front') || (100 - value < 14 && type === 'hind')) return []
                return []
              }, // Display the data value as the label
              offset: 10,
            },
            tooltip: false,
          },
          scales: {
            x: {
              display: false,

              grid: {
                display: false, // Hide x-axis grid lines
              },
            },
            y: {
              display: false,

              grid: {
                display: false, // Hide y-axis grid lines
              },
              suggestedMin: 0, // Set the minimum value for y-axis
              suggestedMax: 100,
            },
          },
        },
        plugins: [ChartDataLabels, plugin],
      })
    }

    // Ensure proper cleanup when the component unmounts
    return () => {
      // chartContainer.current.removeEventListener('click', handleClick)

      if (myChart) {
        myChart.destroy()
      }
    }
  }, [selectedItem, data, leftData, rightData]) // Only run this effect on initial mount and unmount

  return <canvas style={{ width: '100%' }} ref={chartContainer} />
}

export default BarChart
