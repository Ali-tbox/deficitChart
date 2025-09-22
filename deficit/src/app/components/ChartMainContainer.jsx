import { Box } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import StrideSymmetry from './charts/StrideSymmetry'
import DeficitCharts from './charts/deficitChart/DeficitCharts'
import DeficitScatterCharts from './charts/deficitScatterCharts/DeficitScatterCharts'
import SineCurvedCharts from './charts/sineCurvedCharts/SineCurvedCharts'
import StridePrecision from './form/StridePrecision'
import colors from '../config/colors'
import chartData from './charts/chartData'

function ChartMainContainer() {
  // function sendMessageToNative(data) {
  //   console.log("sendMessageToNative");
  //   window.webkit.messageHandlers.nativeMessageHandler.postMessage(data);
  // }
  // window.handleMessageFromNative = function (data) {
  //   console.log("sendMessageToNative", data);
  // };
  const [dataFromIOS, setDataFromIOS] = useState('')
  const [dateFromIOS, setDateFromIOS] = useState('')
  const [BaselineDataFromIOS, setBaselineDataFromIOS] = useState('')
  const [actuallBaselineDataFromIOS, setActuallBaselineDataFromIOS] = useState('')
  const [actuallChartDataFromIOS, setactuallChartDataFromIOS] = useState('')
  const [withersToggleValue, setWithersToggleValue] = useState(false)
  const [showWithersToggle, setShowWithersToggle] = useState(false)

  useEffect(() => {
    // Adding event for IOS app
    onClickHandler('Deficit chart loaded')

    window.addEventListener('iosEvent', iosEventHandler)

    return () => window.removeEventListener('iosEvent', iosEventHandler)
  }, [])

  const iosEventHandler = useCallback(
    e => {
      console.log('Received data from IOS : ' + e.detail.data)
      let parsedData = e.detail.data
      if (typeof e.detail.data === 'string') {
        try {
          parsedData = JSON.parse(e.detail.data)
        } catch (error) {
          console.error('Error parsing data:', error)
        }
      }
      const isNewDataFormat = parsedData && 'isWitherData' in parsedData
      if (isNewDataFormat) {
        setShowWithersToggle(parsedData.isWitherData)
      } else {
        setShowWithersToggle(false)
      }
      setWithersToggleValue(isNewDataFormat === true ? e.detail.withersToggle : false)
      setDataFromIOS(e.detail.baselineData === '' || e.detail.baselineData === undefined ? [] : e.detail.data)
      setDateFromIOS(e.detail.date)
      setActuallBaselineDataFromIOS(e.detail.baselineData)
      setactuallChartDataFromIOS(e.detail.data)
      setBaselineDataFromIOS(e.detail.baselineData === '' || e.detail.baselineData === undefined ? e.detail.data : e.detail.baselineData)
    },
    [setDataFromIOS, setDateFromIOS, setActuallBaselineDataFromIOS, setActuallBaselineDataFromIOS],
  )

  const onClickHandler = name => {
    console.log('Sending data to IOS : ' + name)
    // Sending Data to IOS App
    window?.webkit?.messageHandlers?.DEFICIT_BRIDGE?.postMessage({
      message: name,
    })
  }

  const names = ['Atif', 'Jane', 'Vicky', 'Alice', 'Raj']

  // const rightHindArray = newData.deficitScatter.rightHind;

  // Accessing maxDiff of each item in rightHind array
  // const maxDiffs = rightHindArray.map((item) => item.MaxMinDiff.maxDiff);

  function isJSONString(str) {
    try {
      JSON.parse(str)
      return true
    } catch (e) {
      return false
    }
  }
  console.log('hello', BaselineDataFromIOS === '')

  return (
    <Box w={'100%'} display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems={'flex-start'} overflow={'hidden'}>
      <DeficitCharts
        showWithersToggle={showWithersToggle}
        withersToggleValue={withersToggleValue}
        actualchartData={actuallChartDataFromIOS}
        baseline={BaselineDataFromIOS}
        actualBaslineData={actuallBaselineDataFromIOS}
        date={dateFromIOS}
        chartData={dataFromIOS}
        handleItemClick={onClickHandler}
      />
    </Box>
  )
}

export default ChartMainContainer
