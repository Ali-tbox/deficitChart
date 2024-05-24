import React from 'react'
import SineCurve from './SineCurve'
import { Box, Text } from '@chakra-ui/react'
import colors from '../../../config/colors'
import Icon from '../../form/Icon'
import assets from '../../../assets/assests'
// import chartData from '../chartData'

function SineCurvedCharts({ chartData, handleItemClick }) {
  // console.log("SineCurvedCh ", chartData?.sineCurve?.rightFore);
  return (
    <Box w='100%' paddingX={'16px'} paddingY={'32px'}>
      <Box paddingY={'7px'} alignItems={'center'} display={'flex'} gap={'6px'}>
        <Text color={colors.dullblack} lineHeight={'22px'} fontSize='16px' fontWeight={700} fontFamily='Nunito'>
          Sine Curve Chart
        </Text>
        <Icon onClick={() => handleItemClick('sine-curve-chart')} imageHeight={'20px'} imageWidth={'20px'} image={assets.icons.darkInfo} />
      </Box>
      <SineCurve chartData={chartData} straightData={chartData?.sineCurve?.straightFore} leftData={chartData?.sineCurve?.leftFore} rightData={chartData?.sineCurve?.rightFore} type='front' />

      <SineCurve chartData={chartData} straightData={chartData?.sineCurve?.straighthind} leftData={chartData?.sineCurve?.leftHind} rightData={chartData?.sineCurve?.rightHind} type='hind' />
    </Box>
  )
}

export default SineCurvedCharts
