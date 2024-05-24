import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import ProgressBar from './ProgressBar'
import colors from '../../config/colors'
import Badge from './Badge'
import Icon from './Icon'
import assets from '../../assets/assests'
// import chartData from "../charts/chartData";

const badgeColor = {
  medium: colors.lightYellow,
  fair: colors.lightYellow,
  poor: colors.mediumRed,
  good: colors.mediumGreen,
}
const badgeValue = {
  left: 'Left circle',
  right: 'Right circle',
  straight: 'Straight',
}
function StridePrecision({ chartData, handleItemClick }) {
  function capitalizeFirstLetter(str) {
    // Check if the string is empty or null
    if (!str || str.length === 0) {
      return str
    }

    // Convert the first character to uppercase and concatenate it with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const objWithPoorConfidence = chartData?.confidence?.find(item => item?.confidence === 'poor')

  return (
    <Box w='100%' mt='32px' display={'flex'} flexDir={'column'} justifyContent={'center'} paddingX={'16px'}>
      <Box mb='10px' paddingY={'7px'} display={'flex'} gap={'6px'}>
        <Text lineHeight={'22px'} color={colors.dullblack} fontSize='16px' fontWeight={700} fontFamily='Nunito'>
          Stride Precision
        </Text>
        <Icon onClick={() => handleItemClick('stride-precision')} imageHeight={'20px'} imageWidth={'20px'} image={assets.icons.darkInfo} />
      </Box>
      <Box mb='24px' display={'flex'} flexDir={'column'} textAlign={'center'} gap={'12px'}>
        {
          chartData?.confidence?.map(
            (item, index) =>
              item?.trottype !== 'allfootage' && (
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <Badge fontSize='12px' w='86px' text={badgeValue[item?.trottype]} />
                  <Box ml='10px' mr={item?.confidence === 'fair' || item?.confidence === 'medium' ? '14px' : '11px'} w='55%'>
                    <ProgressBar type={item?.confidence} value='50' />
                  </Box>
                  <Badge
                    fontFamily={'Nunito'}
                    text={capitalizeFirstLetter(item?.confidence === 'fair' ? 'medium' : item?.confidence)}
                    lineHeight='20px'
                    fontSize='12px'
                    // paddingX="0px"
                    bgColor='transparent'
                    color={badgeColor[item?.confidence]}
                    p={item?.confidence === 'fair' || item?.confidence === 'medium' ? 0 : 'auto'}
                  />
                </Box>
              ),
          )
          ////left
          // <Box
          //   bg={"red"}
          //   display={"flex"}
          //   justifyContent={"space-between"}
          //   alignItems={"center"}
          //   w="100%"
          // >
          //   <Badge fontSize="12px" w="86px" text={"Left circle"} />
          //   <Box ml="10px" mr="11px" w="55%">
          //     <ProgressBar
          //       type={getConfidenceByTrotType("left")?.confidence}
          //       value="30"
          //     />
          //   </Box>

          //   <Badge
          //     fontFamily={"Nunito"}
          //     text={capitalizeFirstLetter(
          //       getConfidenceByTrotType("left")?.confidence
          //     )}
          //     lineHeight="20px"
          //     fontSize="12px"
          //     bgColor="transparent"
          //     color={badgeColor[getConfidenceByTrotType("left")?.confidence]}
          //   />
          // </Box>
        }
        {/* <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Badge fontSize="12px" w="86px" text={"Right circle"} />
          <Box ml="10px" mr="14px" w="55%">
            <ProgressBar
              type={getConfidenceByTrotType("right")?.confidence}
              value="50"
            />
          </Box>
          <Badge
            fontFamily={"Nunito"}
            text={capitalizeFirstLetter(
              getConfidenceByTrotType("right")?.confidence
            )}
            lineHeight="20px"
            fontSize="12px"
            // paddingX="0px"
            bgColor="transparent"
            color={badgeColor[getConfidenceByTrotType("right")?.confidence]}
            p={
              getConfidenceByTrotType("right")?.confidence === "medium"
                ? 0
                : "auto"
            }
          />
        </Box> */}
        {/* <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Badge fontSize="12px" w="86px" text={"Straight"} />
          <Box ml="10px" mr="10px" w="55%">
            <ProgressBar type={"good"} value="70" />
          </Box>
          <Badge
            fontFamily={"Nunito"}
            text={"Good"}
            lineHeight="20px"
            fontSize="12px"
            bgColor="transparent"
            color={colors.mediumGreen}
          />
        </Box> */}
      </Box>
      {objWithPoorConfidence !== undefined && (
        <Box mb='32px' borderRadius='8px' paddingY='12px' paddingX={'16px'} bg={colors.faint} w='100%'>
          <Text fontFamily='Nunito' fontSize='14px' color={colors.textcolor} lineHeight={'20px'}>
            {`We recommend you repeat ${badgeValue[objWithPoorConfidence?.trottype]} for more accurate results.`}
          </Text>
        </Box>
      )}
    </Box>
  )
}
export default StridePrecision
