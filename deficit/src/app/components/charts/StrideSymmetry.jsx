import React, { useEffect, useState } from 'react'

import { Box, Text } from '@chakra-ui/react'

import SymmentryLabel from './SymmentryLabel'
// import chartData from './chartData'

import Icon from '../form/Icon'
import StrideSymmetryGraph from './StrideSymmetryGraph'
import SymmetryMenu from './SymmetryMenu'
import assets from '../../assets/assests'
import colors from '../../config/colors'

const calculatePercentage = (a, b) => {
  return (a / b) * 100
}
const largest = (a, b) => {
  return a > b ? Math.round(a - b) : Math.round(b - a)
}
const badgeValue = {
  left: 'Left circle',
  right: 'Right circle',
  straight: 'Straight line',
}

function StrideSymmetry({ chartData, handleItemClick }) {
  const items = ['Left circle', 'Right circle', 'Straight line']
  const isOnlyStraight = chartData?.confidence?.some(item => item.trottype === 'straight')
  const menuItems = chartData?.confidence?.filter(item => item.trottype !== 'allfootage').map(item => badgeValue[item.trottype])
  const customSort = (a, b) => {
    // Define the desired order
    const order = ['All data', 'Left circle', 'Right circle', 'Straight line']
    // Find the indices of elements in the order array
    const indexA = order.indexOf(a)
    const indexB = order.indexOf(b)
    // Compare the indices and return the result
    return indexA - indexB
  }
  const sortedMenuItems = menuItems?.sort(customSort)
  const [selectedItem, setSelectedItem] = useState(chartData?.confidence?.length <= 2 && isOnlyStraight ? 'Straight line' : menuItems?.sort(customSort)[0])

  function getLabelByRange(number) {
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
  function getLabelByRangeHind(number) {
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

  /// Front right circle impact
  const leftLegRightCircleForeImpactData = chartData?.stridesymmetry?.foreleftimpact?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  const rightLegRightCircleForeImpactData = chartData?.stridesymmetry?.forerightimpact?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  /// Front left circle impact
  const leftLegLeftCircleForeImpactData = chartData?.stridesymmetry?.foreleftimpact?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  const rightLegLeftCircleForeImpactData = chartData?.stridesymmetry?.forerightimpact?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  /// Front left circle push off
  const leftLegLeftCircleForePushoffData = chartData?.stridesymmetry?.foreleftpushoff?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  const rightLegLeftCircleForePushoffData = chartData?.stridesymmetry?.forerightpushoff?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  /// Front Straight circle impact
  const leftLegStraightCircleForeImpactData = chartData?.stridesymmetry?.foreleftimpact?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  const rightLegStraightCircleForeImpactData = chartData?.stridesymmetry?.forerightimpact?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  /// Front Straight circle push off
  const leftLegStraightCircleForePushoffData = chartData?.stridesymmetry?.foreleftpushoff?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  const rightLegStraightCircleForePushoffData = chartData?.stridesymmetry?.forerightpushoff?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  /// Front right circle push off
  const rightLegRightCircleForePushoffData = chartData?.stridesymmetry?.forerightpushoff?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  const leftLegRightCircleForePushoffData = chartData?.stridesymmetry?.foreleftpushoff?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  /// Hind right circle impact
  const leftLegRightCircleHindImpactData = chartData?.stridesymmetry?.hindleftimpact?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  const rightLegRightCircleHindImpactData = chartData?.stridesymmetry?.hindrightimpact?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  /// Hind left circle impact
  const leftLegLeftCircleHindImpactData = chartData?.stridesymmetry?.hindleftimpact?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  const rightLegLeftCircleHindImpactData = chartData?.stridesymmetry?.hindrightimpact?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  /// Hind left circle push off
  const leftLegLeftCircleHindPushoffData = chartData?.stridesymmetry?.hindleftpushoff?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  const rightLegLeftCircleHindPushoffData = chartData?.stridesymmetry?.hindrightpushoff?.filter(obj => obj.trotType === 'left')?.find(obj => obj.level)
  /// Hind right circle push off
  const rightLegRightCircleHindPushoffData = chartData?.stridesymmetry?.hindrightpushoff?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  const leftLegRightCircleHindPushoffData = chartData?.stridesymmetry?.hindleftpushoff?.filter(obj => obj.trotType === 'right')?.find(obj => obj.level)
  /// Hind Straight circle impact
  const leftLegStraightCircleHindImpactData = chartData?.stridesymmetry?.hindleftimpact?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  const rightLegStraightCircleHindImpactData = chartData?.stridesymmetry?.hindrightimpact?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  /// Hind left circle push off
  const leftLegStraightCircleHindPushoffData = chartData?.stridesymmetry?.hindleftpushoff?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)
  const rightLegStraightCircleHindPushoffData = chartData?.stridesymmetry?.hindrightpushoff?.filter(obj => obj.trotType === 'straight')?.find(obj => obj.level)

  /// front
  const [rightImpactData, setRightImpactData] = useState(rightLegLeftCircleForeImpactData?.level < leftLegLeftCircleForeImpactData?.level ? 0 : rightLegLeftCircleForeImpactData?.level)
  const [leftImpactData, setLeftImpactData] = useState(leftLegLeftCircleForeImpactData?.level < rightLegLeftCircleForeImpactData?.level ? 0 : leftLegLeftCircleForeImpactData?.level)
  const [rightPushoffData, setRightPushoffData] = useState(rightLegLeftCircleForePushoffData?.level < leftLegLeftCircleForePushoffData?.level ? 0 : rightLegLeftCircleForePushoffData?.level)
  const [leftPushoffData, setLeftPushoffData] = useState(leftLegLeftCircleForePushoffData?.level < rightLegLeftCircleForePushoffData?.level ? 0 : leftLegLeftCircleForePushoffData?.level)
  /// hind
  const [rightHindImpactData, setRightHindImpactData] = useState(rightLegLeftCircleHindImpactData?.level < leftLegLeftCircleHindImpactData?.level ? 0 : rightLegLeftCircleHindImpactData?.level)
  const [leftHindImpactData, setLeftHindImpactData] = useState(leftLegLeftCircleHindImpactData?.level < rightLegLeftCircleHindImpactData?.level ? 0 : leftLegLeftCircleHindImpactData?.level)
  const [rightHindPushoffData, setRightHindPushoffData] = useState(rightLegLeftCircleHindPushoffData?.level < leftLegLeftCircleHindPushoffData?.level ? 0 : rightLegLeftCircleHindPushoffData?.level)
  const [leftHindPushoffData, setLeftHindPushoffData] = useState(leftLegLeftCircleHindPushoffData?.level < rightLegLeftCircleHindPushoffData?.level ? 0 : leftLegLeftCircleHindPushoffData?.level)

  const FrontLabels = [getLabelByRange(0), getLabelByRange(largest(rightImpactData, leftImpactData)), getLabelByRange(largest(rightPushoffData, leftPushoffData))]
  const HindLabels = [getLabelByRangeHind(0), getLabelByRangeHind(largest(rightHindImpactData, leftHindImpactData)), getLabelByRangeHind(largest(rightHindPushoffData, leftHindPushoffData))]
  const uniqueFrontArray = FrontLabels.filter((obj, index, self) => index === self.findIndex(o => o.name === obj.name))
  const uniqueHindArray = HindLabels.filter((obj, index, self) => index === self.findIndex(o => o.name === obj.name))

  console.log('dasdasd', uniqueHindArray)

  const handleClick = item => {
    setSelectedItem(item)
    if (item === 'Left circle') {
      setRightImpactData(rightLegLeftCircleForeImpactData?.level)
      setLeftImpactData(leftLegLeftCircleForeImpactData?.level)
      setRightPushoffData(rightLegLeftCircleForePushoffData?.level)
      setLeftPushoffData(leftLegLeftCircleForePushoffData?.level)
      setRightHindImpactData(rightLegLeftCircleHindImpactData?.level)
      setLeftHindImpactData(leftLegLeftCircleHindImpactData?.level)
      setRightHindPushoffData(rightLegLeftCircleHindPushoffData?.level)
      setLeftHindPushoffData(leftLegLeftCircleHindPushoffData?.level)
    }
    if (item === 'Right circle') {
      setRightImpactData(rightLegRightCircleForeImpactData?.level)
      setLeftImpactData(leftLegRightCircleForeImpactData?.level)
      setRightPushoffData(rightLegRightCircleForePushoffData?.level)
      setLeftPushoffData(leftLegRightCircleForePushoffData?.level)
      setRightHindImpactData(rightLegRightCircleHindImpactData?.level)
      setLeftHindImpactData(leftLegRightCircleHindImpactData?.level)
      setRightHindPushoffData(rightLegRightCircleHindPushoffData?.level)
      setLeftHindPushoffData(leftLegRightCircleHindPushoffData?.level)
    }
    if (item === 'Straight line') {
      setRightImpactData(rightLegStraightCircleForeImpactData?.level)
      setLeftImpactData(leftLegStraightCircleForeImpactData?.level)
      setRightPushoffData(rightLegStraightCircleForePushoffData?.level)
      setLeftPushoffData(leftLegStraightCircleForePushoffData?.level)
      setRightHindImpactData(rightLegStraightCircleHindImpactData?.level)
      setLeftHindImpactData(leftLegStraightCircleHindImpactData?.level)
      setRightHindPushoffData(rightLegStraightCircleHindPushoffData?.level)
      setLeftHindPushoffData(leftLegStraightCircleHindPushoffData?.level)
    }
  }
  useEffect(() => {
    setSelectedItem(menuItems?.sort(customSort)[0])
    setRightImpactData(rightLegLeftCircleForeImpactData?.level || rightLegRightCircleForeImpactData?.level || rightLegStraightCircleForeImpactData?.level)
    setLeftImpactData(leftLegLeftCircleForeImpactData?.level || leftLegRightCircleForeImpactData?.level || leftLegStraightCircleForeImpactData?.level)
    setRightPushoffData(rightLegLeftCircleForePushoffData?.level || rightLegRightCircleForePushoffData?.level || rightLegStraightCircleForePushoffData?.level)
    setLeftPushoffData(leftLegLeftCircleForePushoffData?.level || leftLegRightCircleForePushoffData?.level || leftLegStraightCircleForePushoffData?.level)
    setRightHindImpactData(rightLegLeftCircleHindImpactData?.level || rightLegRightCircleHindImpactData?.level || rightLegStraightCircleHindImpactData?.level)
    setLeftHindImpactData(leftLegLeftCircleHindImpactData?.level || leftLegRightCircleHindImpactData?.level || rightLegStraightCircleHindImpactData?.level)
    setRightHindPushoffData(rightLegLeftCircleHindPushoffData?.level || rightLegRightCircleHindPushoffData?.level || rightLegStraightCircleHindPushoffData?.level)
    setLeftHindPushoffData(leftLegLeftCircleHindPushoffData?.level || leftLegRightCircleHindPushoffData?.level || leftLegStraightCircleHindPushoffData?.level)
  }, [chartData])

  console.log('asdasdasdadadadads', FrontLabels)

  return (
    <Box w='100%' paddingX={'16px'} paddingY='32px'>
      <Box display={'flex'} flexDirection={'row'} mb={'16px'} justifyContent={'space-between'} alignItems={'center'}>
        <Box alignItems={'center'} display={'flex'} gap={'6px'}>
          <Text fontSize='16px' color={colors.dullblack} lineHeight={'22px'} fontWeight={700} fontFamily='Nunito'>
            Stride Symmetry
          </Text>
          <Icon onClick={() => handleItemClick('stride-symmetry')} imageHeight={'20px'} imageWidth={'20px'} image={assets.icons.darkInfo} />
        </Box>
        <SymmetryMenu
          isSingleValue={chartData?.confidence?.length <= 2 && isOnlyStraight}
          items={sortedMenuItems}
          selectedItem={selectedItem}
          onClick={handleClick}
          pr={'8px'}
          label={'Straight line'}
        />
      </Box>
      <Box display={'flex'} gap='6px'>
        <Icon image={assets.icons.trottingHorse} />
        <Text fontFamily={'Nunito'} fontWeight={700} lineHeight={'20px'} fontSize={'16px'} color={colors.textcolor}>
          Front
        </Text>
      </Box>
      <Box gap={'23px'} display='flex'>
        <StrideSymmetryGraph
          handleItemClick={handleItemClick}
          type='front'
          data={chartData}
          selectedItem={selectedItem}
          deficitLabel={largest(rightImpactData, leftImpactData)}
          leftData={Math.round(leftImpactData) > Math.round(rightImpactData) || largest(rightImpactData, leftImpactData) <= 12 ? 100 : Math.round(calculatePercentage(leftImpactData, rightImpactData))}
          rightData={
            Math.round(rightImpactData) > Math.round(leftImpactData) || largest(rightImpactData, leftImpactData) <= 12 ? 100 : Math.round(calculatePercentage(rightImpactData, leftImpactData))
          }
          text='Impact'
          color1={colors.mediumGreen}
          color2={colors.mediumRed}
        />
        <StrideSymmetryGraph
          handleItemClick={handleItemClick}
          type='front'
          data={chartData}
          selectedItem={selectedItem}
          deficitLabel={largest(rightPushoffData, leftPushoffData)}
          leftData={
            Math.round(leftPushoffData) > Math.round(rightPushoffData) || largest(rightPushoffData, leftPushoffData) <= 12 ? 100 : Math.round(calculatePercentage(leftPushoffData, rightPushoffData))
          }
          rightData={
            Math.round(rightPushoffData) > Math.round(leftPushoffData) || largest(rightPushoffData, leftPushoffData) <= 12 ? 100 : Math.round(calculatePercentage(rightPushoffData, leftPushoffData))
          }
          text='Push off'
          color1={colors.paleYellow}
          color2={colors.darkGreen}
        />
      </Box>
      <Box display={'flex'} flexDir={'column'} gap={'10px'} mt='12px'>
        {uniqueFrontArray?.map(
          (item, index) =>
            index % 2 === 0 && <SymmentryLabel key={index} text1={item.name} color1={item.color} text2={uniqueFrontArray[index + 1]?.name || ''} color2={uniqueFrontArray[index + 1]?.color || ''} />,
        )}
      </Box>
      <Box mt='40px' mb={'1px'} display={'flex'} gap='6px'>
        <Icon image={assets.icons.trottingHorse1} />
        <Text fontFamily={'Nunito'} fontWeight={700} fontSize={'14px'} lineHeight={'20px'} color={colors.textcolor}>
          Hind
        </Text>
      </Box>
      <Box gap={'23px'} display='flex'>
        <StrideSymmetryGraph
          handleItemClick={handleItemClick}
          type='hind'
          data={chartData}
          selectedItem={selectedItem}
          deficitLabel={largest(rightHindImpactData, leftHindImpactData)}
          leftData={
            Math.round(leftHindImpactData) > Math.round(rightHindImpactData) || largest(rightHindImpactData, leftHindImpactData) <= 5
              ? 100
              : Math.round(calculatePercentage(leftHindImpactData, rightHindImpactData))
          }
          rightData={
            Math.round(rightHindImpactData) > Math.round(leftHindImpactData) || largest(rightHindImpactData, leftHindImpactData) <= 5
              ? 100
              : Math.round(calculatePercentage(rightHindImpactData, leftHindImpactData))
          }
          text='Impact'
          color1={colors.mehron}
          color2={colors.mediumGreen}
        />
        <StrideSymmetryGraph
          handleItemClick={handleItemClick}
          type='hind'
          data={chartData}
          selectedItem={selectedItem}
          deficitLabel={largest(rightHindPushoffData, leftHindPushoffData)}
          leftData={
            Math.round(leftHindPushoffData) > Math.round(rightHindPushoffData) || largest(rightHindPushoffData, leftHindPushoffData) <= 5
              ? 100
              : Math.round(calculatePercentage(leftHindPushoffData, rightHindPushoffData))
          }
          rightData={
            Math.round(rightHindPushoffData) > Math.round(leftHindPushoffData) || largest(rightHindPushoffData, leftHindPushoffData) <= 5
              ? 100
              : Math.round(calculatePercentage(rightHindPushoffData, leftHindPushoffData))
          }
          text='Push off'
          color1={colors.lightYellow}
          color2={colors.mediumGreen}
        />
      </Box>
      <Box display={'flex'} flexDir={'column'} gap={'10px'} mt='12px'>
        {uniqueHindArray?.map(
          (item, index) =>
            index % 2 === 0 && <SymmentryLabel key={index} text1={item.name} color1={item.color} text2={uniqueHindArray[index + 1]?.name || ''} color2={uniqueHindArray[index + 1]?.color || ''} />,
        )}
      </Box>
    </Box>
  )
}

export default StrideSymmetry
