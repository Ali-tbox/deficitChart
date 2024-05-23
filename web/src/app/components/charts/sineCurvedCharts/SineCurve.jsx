import { Box, Divider, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import colors from '../../../config/colors'
import CurvedLineChart from './CurvedLineChart'
import SymmetryMenu from '../SymmetryMenu'
import assets from '../../../assets/assests'
import Icon from '../../form/Icon'
import SymmentryLabel from '../SymmentryLabel'
import SymmentryRoundLabel from '../SymmentryRoundLabel'

const badgeValue = {
  left: 'Left circle',
  right: 'Right circle',
  straight: 'Straight line',
  allfootage: 'All data',
}
const badgeColor = {
  left: colors.faintblue,
  right: colors.darkpurple,
  straight: colors.mustard,
}

function SineCurve({ chartData, straightData, leftData, rightData, type }) {
  function getColorByRange(number) {
    if (type === 'front') {
      if (number >= 0 && number <= 11) {
        return { name: 'Normal symmetry', color: colors.mediumGreen }
      } else if (number >= 12 && number <= 23) {
        return { name: 'Mild asymmetry', color: colors.darkGreen }
      } else if (number >= 24 && number <= 35) {
        return { name: 'Mild to moderate asymmetry', color: colors.lightYellow }
      } else if (number >= 36 && number <= 47) {
        return { name: 'Moderate asymmetry', color: colors.paleYellow }
      } else if (number >= 48 && number <= 59) {
        return { name: 'Moderate to severe asymmetry', color: colors.mediumRed }
      } else if (number >= 60) {
        return { name: 'Severe asymmetry', color: colors.mehron }
      } else {
        return {} // Default color if the number is out of specified ranges
      }
    }
    if (type === 'hind') {
      if (number >= 0 && number <= 5) {
        return { name: 'Normal symmetry', color: colors.mediumGreen }
      } else if (number >= 6 && number <= 13) {
        return { name: 'Mild asymmetry', color: colors.darkGreen }
      } else if (number >= 14 && number <= 21) {
        return { name: 'Mild to moderate asymmetry', color: colors.lightYellow }
      } else if (number >= 22 && number <= 29) {
        return { name: 'Moderate asymmetry', color: colors.paleYellow }
      } else if (number >= 30 && number <= 37) {
        return { name: 'Moderate to severe asymmetry', color: colors.mediumRed }
      } else if (number >= 38) {
        return { name: 'Severe asymmetry', color: colors.mehron }
      } else {
        return {} // Default color if the number is out of specified ranges
      }
    }
  }

  const items = ['All data', 'Left circle', 'Right circle', 'Straight line']
  const strideItems = ['All strides', 'Only median', 'Max 5', 'Max 10']
  const [labels, setLabels] = useState()
  const isOnlyStraight = chartData?.confidence?.some(item => item.trottype === 'straight')

  const menuItems = chartData?.confidence?.map(item => badgeValue[item.trottype])
  const customSort = (a, b) => {
    // Define the desired order
    const order = ['All data', 'Left circle', 'Right circle']
    // Find the indices of elements in the order array
    const indexA = order.indexOf(a)
    const indexB = order.indexOf(b)
    // Compare the indices and return the result
    return indexA - indexB
  }
  const sortedMenuItems = menuItems?.sort(customSort)
  const [selectedItem, setSelectedItem] = useState(chartData?.confidence?.length <= 2 && isOnlyStraight ? 'Straight line' : menuItems?.sort(customSort)[0])
  const [selectedStrideItem, setSelectedStrideItem] = useState(strideItems[0])

  const handleClick = item => {
    setSelectedItem(item)

    if (type === 'front') {
      if (item === 'All data') {
        setLabels([...getAnnotations(chartData?.sineCurve?.leftFore), ...getAnnotations(chartData?.sineCurve?.rightFore), ...getAnnotations(chartData?.sineCurve?.straightFore)])
      }
      if (item === 'Left circle') {
        setLabels(getAnnotations(chartData?.sineCurve?.leftFore))
      }
      if (item === 'Right circle') {
        setLabels(getAnnotations(chartData?.sineCurve?.rightFore))
      }
      if (item === 'Straight line') {
        setLabels(getAnnotations(chartData?.sineCurve?.straightFore))
      }
    }
    if (type === 'hind') {
      if (item === 'All data') {
        setLabels([...getAnnotations(chartData?.sineCurve?.leftHind), ...getAnnotations(chartData?.sineCurve?.rightHind), ...getAnnotations(chartData?.sineCurve?.straighthind)])
      }
      if (item === 'Left circle') {
        setLabels(getAnnotations(chartData?.sineCurve?.leftHind))
      }
      if (item === 'Right circle') {
        setLabels(getAnnotations(chartData?.sineCurve?.rightHind))
      }
      if (item === 'Straight line') {
        setLabels(getAnnotations(chartData?.sineCurve?.straighthind))
      }
    }
  }

  const handleStrideClick = item => {
    setSelectedStrideItem(item)
  }

  const getAnnotations = array => {
    return (
      array
        ?.filter(item => item.isMedian) // Filter items where isMedian is true
        ?.flatMap(item => item.rulers) // Flatten the array of rulers for each item
        ?.map(ruler => getColorByRange(parseInt(ruler.annotation))) // Extract only the annotation values
        ?.filter(annotation => annotation !== null && annotation !== undefined) || [] // Filter out null or undefined values and return an empty array if conditions are not met
    )
  }
  const uniqueArray = labels?.filter((obj, index, self) => index === self.findIndex(o => o.name === obj.name))
  useEffect(() => {
    if (type === 'front') {
      setLabels([...getAnnotations(chartData?.sineCurve?.leftFore), ...getAnnotations(chartData?.sineCurve?.rightFore), ...getAnnotations(chartData?.sineCurve?.straightFore)])
    }
    if (type === 'hind') {
      setLabels([...getAnnotations(chartData?.sineCurve?.leftHind), ...getAnnotations(chartData?.sineCurve?.rightHind), ...getAnnotations(chartData?.sineCurve?.straighthind)])
    }
    setSelectedItem(chartData?.confidence?.length <= 2 && isOnlyStraight ? 'Straight line' : menuItems?.sort(customSort)[0])
  }, [chartData])
  return (
    <Box mt={type === 'front' ? '10px' : '40px'}>
      <Box display={'flex'} gap='6px'>
        <Icon image={type === 'front' ? assets.icons.trottingHorse : assets.icons.trottingHorse1} />
        <Text fontFamily={'Nunito'} fontWeight={700} fontSize={type === 'front' ? '16px' : '14px'} color={colors.textcolor}>
          {type === 'front' ? 'Front' : 'Hind'}
        </Text>
      </Box>
      <Box mt='16px' gap='20px' display={'flex'}>
        <SymmetryMenu isSingleValue={chartData?.confidence?.length <= 2 && isOnlyStraight} items={sortedMenuItems} onClick={handleClick} selectedItem={selectedItem} label='All footage' />
        <SymmetryMenu items={strideItems} onClick={handleStrideClick} selectedItem={selectedStrideItem} label='All strides' />
      </Box>
      <Box mt='18px' border='1px' borderRadius='8px' borderColor={colors.dullsilver} overflow={'hidden'} w='100%' h='256px'>
        <Box w='92%' display={'flex'} h='256px'>
          <Box mt='55px' h='140px' display='flex' alignItems={'center'} flexDir={'column'} justifyContent={'space-between'}>
            <Text whiteSpace={'nowrap'} color={colors.faintblack} fontSize='11px' transform='rotate(-90deg)' fontFamily={'Noto Sans'}>
              Push off
            </Text>
            <Text mt='6px' fontWeight={700} fontSize={'12px'}>
              0
            </Text>
            <Text fontFamily={'Noto Sans'} color={colors.faintblack} fontSize={'11px'} transform='rotate(-90deg)'>
              Impact
            </Text>
          </Box>
          <CurvedLineChart selectedItem={selectedItem} selectedStrideItem={selectedStrideItem} straightData={straightData} leftData={leftData} rightData={rightData} />
        </Box>
      </Box>
      <Box mt='12px' display={'flex'} gap={'20px'}>
        {chartData?.confidence?.map((item, index) => item?.trottype !== 'allfootage' && <SymmentryRoundLabel key={index} text={badgeValue[item?.trottype]} color={badgeColor[item?.trottype]} />)}
        <Box display={'flex'} gap={'4px'} alignItems={'center'}>
          <Icon imageWidth={'14px'} imageHeight={'2px'} image={assets.icons.Line} />
          <Text fontFamily={'Noto Sans'} fontSize={'11px'} textAlign={'center'} lineHeight={'16px'} color={colors.faintblack}>
            Mean
          </Text>
        </Box>
      </Box>
      <Divider mt='8px' />

      <Box display={'flex'} flexDir={'column'} gap={'8px'} mt='8px'>
        {uniqueArray?.map(
          (item, index) =>
            index % 2 === 0 && <SymmentryLabel key={index} text1={item.name} color1={item.color} text2={uniqueArray[index + 1]?.name || ''} color2={uniqueArray[index + 1]?.color || ''} />,
        )}
      </Box>
    </Box>
  )
}

export default SineCurve
