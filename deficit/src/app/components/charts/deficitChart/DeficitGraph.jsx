import { Box, Text } from '@chakra-ui/layout'
import React from 'react'

import colors from '../../../config/colors'
import PointBarChart from './PointBarChart'

function DeficitGraph({ horseSide, data1, data, type }) {
  return (
    <Box display={'flex'} flexDirection={'column'} mt={'6px'} h='197px' w='239px' maxW={'100%'} borderRadius='8px' border='1px' borderColor={colors.faintgray}>
      <Box paddingY='8px' paddingX={'16px'} alignItems={'center'} display='flex' gap={'40px'}>
        <Text fontFamily={'Noto Sans'} fontSize='14px' fontWeight={700}>
          {type}
        </Text>
        <Text fontFamily={'Noto Sans'} fontSize='12px' color={colors.faintblack}>
          mm
        </Text>
      </Box>
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'80%'}>
        <Box h='80%' display='flex' alignItems={'end'} py={'8px'} flexDir={'column'} justifyContent={'space-between'}>
          <Text fontFamily={'Noto Sans'} whiteSpace={'nowrap'} color={colors.faintblack} fontSize='11px' transform='rotate(-90deg)'>
            Right
          </Text>
          <Text fontFamily={'Noto Sans'} color={colors.faintblack} fontSize={'11px'} transform='rotate(-90deg)'>
            Left
          </Text>
        </Box>
        <Box minH={'100%'} maxW='100%'>
          <PointBarChart type={horseSide} data1={data1} data={data} />
        </Box>
      </Box>
    </Box>
  )
}

export default DeficitGraph
