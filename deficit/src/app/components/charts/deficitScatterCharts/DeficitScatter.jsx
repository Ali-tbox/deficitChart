import { Box, Divider, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import colors from '../../../config/colors'
import SymmetryMenu from '../SymmetryMenu'
import assets from '../../../assets/assests'
import Icon from '../../form/Icon'
import SymmentryLabel from '../SymmentryLabel'
import SymmentryRoundLabel from '../SymmentryRoundLabel'
import ScatterPieChart from './ScatterPieChart'

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

function DeficitScatter({ chartData, straightData, leftData, rightData, max, min, type }) {
  const items = ['All data', 'Left circle', 'Right circle', 'Straight line']
  const strideItems = ['All strides', 'Only median', 'Max 5', 'Max 10']
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
  }
  const handleStrideClick = item => {
    setSelectedStrideItem(item)
  }
  console.log('settingselectedStride', menuItems)
  useEffect(() => {
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
      <Box mt='17px' gap='20px' display={'flex'}>
        <SymmetryMenu isSingleValue={chartData?.confidence?.length <= 2 && isOnlyStraight} items={sortedMenuItems} onClick={handleClick} selectedItem={selectedItem} label='All footage' />
        <SymmetryMenu items={strideItems} onClick={handleStrideClick} selectedItem={selectedStrideItem} label='All strides' />
      </Box>
      <Box mt='16px' w='367px' h='367px'>
        <ScatterPieChart max={max} min={min} selectedItem={selectedItem} selectedStrideItem={selectedStrideItem} straightData={straightData} leftData={leftData} rightData={rightData} />
      </Box>

      <Box mt='16px' gap='20px' display={'flex'}>
        {chartData?.confidence?.map((item, index) => item?.trottype !== 'allfootage' && <SymmentryRoundLabel key={index} text={badgeValue[item?.trottype]} color={badgeColor[item?.trottype]} />)}
      </Box>
      <Divider mt='8px' />

      <Box display={'flex'} flexDir={'column'} gap={'10px'} mt='8px'>
        <SymmentryLabel text1='Normal symmetry' color1={colors.mediumGreen} text2={'Mild to moderate asymmetry'} color2={colors.lightYellow} />
        <SymmentryLabel text1='Severe asymmetry' color1={colors.mehron} />
      </Box>
    </Box>
  )
}

export default DeficitScatter
