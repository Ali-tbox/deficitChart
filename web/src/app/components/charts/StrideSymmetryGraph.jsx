import { Box, Text } from '@chakra-ui/react'
import React from 'react'

import BarChart from './BarChart'
import colors from '../../config/colors'

function StrideSymmetryGraph({ handleItemClick, deficitLabel, selectedItem, leftData, rightData, color1, color2, text, type }) {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      paddingY='12px'
      paddingX='16px'
      mt={'13px'}
      h='235px'
      w='100%'
      borderRadius='8px'
      border='1px'
      borderColor={colors.faintgray}
    >
      <Box display='flex' justifyContent='space-between'>
        <Text fontSize='14px' fontFamily={'Noto Sans'} fontWeight={700} lineHeight={'20px'}>
          {text}
        </Text>
        <Text fontSize='12px' lineHeight={'16px'} fontFamily={'Noto Sans'} color={colors.faintblack}>
          mm
        </Text>
      </Box>
      <Box>
        <Box maxW={'100%'} height='136px'>
          <BarChart
            text={text}
            handleItemClick={handleItemClick}
            deficitLabel={deficitLabel}
            type={type}
            selectedItem={selectedItem}
            leftData={leftData}
            rightData={rightData}
            color1={color1}
            color2={color2}
          />
        </Box>
        <Box justifyContent={'space-around'} mt='8px' pb={'3px'} display={'flex'}>
          <Text fontFamily={'Noto sans'} fontSize={'12px'} ml='4px' lineHeight={'16px'} color={colors.faintblack}>
            Left
          </Text>
          <Text fontFamily={'Noto sans'} fontSize={'12px'} lineHeight={'16px'} color={colors.faintblack}>
            Right
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default StrideSymmetryGraph
