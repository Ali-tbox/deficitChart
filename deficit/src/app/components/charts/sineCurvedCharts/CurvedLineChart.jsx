import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import colors from "../../../config/colors";
function CurvedLineChart({
  selectedStrideItem,
  selectedItem,
  straightData,
  rightData,
  leftData,
  data,
}) {
  const allLeft =
    selectedItem === "All data" || selectedItem === "Left circle"
      ? leftData?.map((item) => item?.stride)
      : [];
  const allRigth =
    selectedItem === "All data" || selectedItem === "Right circle"
      ? rightData?.map((item) => item?.stride)
      : [];
  const allStraight =
    selectedItem === "All data" || selectedItem === "Straight line"
      ? straightData?.map((item) => item?.stride)
      : [];
  const limitedAllLeft =
    selectedStrideItem === "Max 10"
      ? allLeft?.slice(0, 10)
      : selectedStrideItem === "Max 5"
      ? allLeft.slice(0, 5)
      : allLeft;
  const limitedAllRight =
    selectedStrideItem === "Max 10"
      ? allRigth.slice(0, 10)
      : selectedStrideItem === "Max 5"
      ? allRigth.slice(0, 5)
      : allRigth;
  const limitedAllStriaght =
    selectedStrideItem === "Max 10"
      ? allStraight.slice(0, 10)
      : selectedStrideItem === "Max 5"
      ? allStraight.slice(0, 5)
      : allStraight;
  function findMiddleValue(arr) {
    const middleIndex = Math.floor(arr.length / 2);
    // Return the middle value
    return arr[middleIndex];
  }
  const medianLeftObject = leftData?.find((obj) => obj.isMedian === true);
  const medianRightObject = rightData?.find((obj) => obj.isMedian === true);
  const medianStraightObject = straightData?.find(
    (obj) => obj.isMedian === true
  );
  // console.log('dataataadadadada', !allLeft?.length)
  const datasets =
    allLeft?.length > 0 && selectedStrideItem === "Only median"
      ? [
          {
            label: `Dataset`,
            data: medianLeftObject?.stride,
            borderColor: colors.paleBlue,
            lineTension: 0.4,
            borderCurve: 0.5,
            borderWidth: 5,
            borderDash: [10, 10],
            borderCapStyle: "round",
            fill: false,
            pointStyle: false,
          },
        ]
      : limitedAllLeft?.map((data, index) => ({
          label: `Dataset ${index + 1}`,
          data: data,
          borderColor: colors.paleBlue,
          lineTension: 0.4,
          borderCurve: 0.5,
          borderWidth: medianLeftObject?.stride === data ? 5 : 2,
          borderDash: medianLeftObject?.stride === data ? [10, 10] : [0, 0],
          borderCapStyle: "round",
          fill: false,
          pointStyle: false,
        }));
  const rigthDatasets =
    allRigth?.length > 0 && selectedStrideItem === "Only median"
      ? [
          {
            label: `Dataset`,
            data: medianRightObject?.stride,
            borderColor: colors.palepurple,
            lineTension: 0.4,
            borderWidth: 5,
            borderDash: [10, 10],
            borderCapStyle: "round",
            borderCurve: 0.5,
            fill: false,
            pointStyle: false,
          },
        ]
      : limitedAllRight?.map((data, index) => ({
          label: `Dataset ${index + 1}`,
          data:
            selectedStrideItem === "Only median"
              ? medianRightObject?.stride
              : data,
          borderColor: colors.palepurple,
          lineTension: 0.4,
          borderWidth: medianRightObject?.stride === data ? 5 : 2,
          borderDash: medianRightObject?.stride === data ? [10, 10] : [0, 0],
          borderCapStyle: "round",
          borderCurve: 0.5,
          fill: false,
          pointStyle: false,
        }));
  const straithtDatasets =
    allStraight?.length > 0 && selectedStrideItem === "Only median"
      ? [
          {
            label: `Dataset`,
            data: medianStraightObject?.stride,
            borderColor: colors.lightMustard,
            lineTension: 0.4,
            borderWidth: 5,
            borderDash: [10, 10],
            borderCapStyle: "round",
            borderCurve: 0.5,
            fill: false,
            pointStyle: false,
          },
        ]
      : limitedAllStriaght?.map((data, index) => ({
          label: `Dataset ${index + 1}`,
          data:
            selectedStrideItem === "Only median"
              ? medianStraightObject?.stride
              : data,
          borderColor: colors.lightMustard,
          lineTension: 0.4,
          borderCurve: 0.5,
          borderWidth: medianStraightObject?.stride === data ? 5 : 2,
          borderDash: medianStraightObject?.stride === data ? [10, 10] : [0, 0],
          borderCapStyle: "round",
          fill: false,
          pointStyle: false,
        }));
  // console.log('dataataadadadada123', datasets)

  const chartContainer = useRef(null);
  let myChart = null;
  console.log("chartContainer", datasets);
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (myChart) {
        myChart.destroy();
      }
      const ctx = chartContainer.current.getContext("2d");
      myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 100,
          ],
          datasets: [
            ...(datasets ? datasets : []),
            ...(rigthDatasets ? rigthDatasets : []),
            ...(straithtDatasets ? straithtDatasets : []),
            {
              label: "Dataset 1",
              data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0,
              ],
              borderColor: "#CCCCCC",
              lineTension: 0.4,
              borderWidth: 2,
              borderCurve: 0.5,
              fill: false,
              pointStyle: false,
            },
          ],
          // datasets: [
          //   {
          //     label: 'Dataset 1',
          //     // data: [10, -20, 40, -30, -60, 20, 30],
          //     data: data?.leftFore[0]?.stride,
          //     borderColor: colors.paleBlue,
          //     lineTension: 0.4,
          //     borderWidth: 2,
          //     borderCurve: 0.5,
          //     fill: false,
          //     pointStyle: false,
          //   },
          //   {
          //     label: 'Dataset 1',
          //     data: data?.straightFore,
          //     borderColor: colors.paleBlue,
          //     lineTension: 0.4,
          //     borderWidth: 2,
          //     borderCurve: 0.5,
          //     fill: false,
          //     pointStyle: false,
          //   },
          //   {
          //     label: 'Dataset 1',
          //     data: [1, -10, 10, -60, -30, 15, 37],
          //     borderColor: colors.paleBlue,
          //     lineTension: 0.4,
          //     borderWidth: 2,
          //     borderCurve: 0.5,
          //     fill: false,
          //     pointStyle: false,
          //   },
          //   //   {
          //   //     label: 'Dataset 1',
          //   //     data: [82, -4, 58, -74, -63, 36, 58],
          //   //     borderColor: colors.palepurple,
          //   //     lineTension: 0.4,
          //   //     borderWidth: 2,
          //   //     borderCurve: 0.5,
          //   //     fill: false,
          //   //     pointStyle: false,
          //   //   },
          //   //   {
          //   //     label: 'Dataset 1',
          //   //     data: [34, -50, 20, -10, -80, 90, 10],
          //   //     borderColor: colors.palepurple,
          //   //     lineTension: 0.4,
          //   //     borderWidth: 2,
          //   //     borderCurve: 0.5,
          //   //     fill: false,
          //   //     pointStyle: false,
          //   //   },
          //   //   {
          //   //     label: 'Dataset 1',
          //   //     data: [0, 0, 0, 0, 0, 0, 0],
          //   //     borderColor: '#CCCCCC',
          //   //     lineTension: 0.4,
          //   //     borderWidth: 2,
          //   //     borderCurve: 0.5,
          //   //     fill: false,
          //   //     pointStyle: false,
          //   //   },
          //   //   {
          //   //     label: 'Dataset 1',
          //   //     data: [80, -2, 55, -70, -60, 30, 0],
          //   //     borderColor: [colors.purple],
          //   //     borderWidth: 5,
          //   //     lineTension: 0.4,
          //   //     borderCurve: 0.5,
          //   //     borderDash: [10, 10],
          //   //     borderCapStyle: 'round',
          //   //     fill: false,
          //   //     pointStyle: false,
          //   //   },
          // ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins: {
            legend: {
              display: false,
              position: "top",
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
                display: false, // Hide x-axis grid lines
              },
              min: -100,
              max: 100,
              ticks: {
                callback: (value) => {
                  if (value === 0) {
                    return "0";
                  } else if (value < 0) {
                    return "left";
                  } else {
                    return "right";
                  }
                },
              },
            },
          },
        },
      });
    }
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [selectedItem, selectedStrideItem, straightData, rightData, leftData]);
  return <canvas ref={chartContainer} />;
}

export default CurvedLineChart;
