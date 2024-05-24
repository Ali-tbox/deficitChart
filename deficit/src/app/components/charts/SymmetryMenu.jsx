import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'

import Icon from '../form/Icon'
import assets from '../../assets/assests'
import colors from '../../config/colors'

function SymmetryMenu({ isSingleValue, onClick, items, selectedItem, ml, pr }) {
  return (
    <Menu>
      <MenuButton
        fontSize='12px'
        w='122px'
        _hover={{ bg: colors.searchcolor }}
        _active={{ bg: colors.searchcolor }}
        fontWeight={700}
        color={colors.bluebtn}
        ml={ml}
        bg={colors.searchcolor}
        as={Button}
        p='16px'
        fontFamily={'Nunito'}
        colorScheme='blue'
        rightIcon={!isSingleValue ? <Icon ml='2px' imageHeight={'6px'} imageWidth={'12px'} image={assets.icons.downarrow} /> : ''}
      >
        {selectedItem}
      </MenuButton>
      {!isSingleValue && (
        <MenuList _hover={{ bg: colors.white }} _focus={{ bg: colors.white }} borderRadius={'10px'}>
          {items?.map(
            (item, index) =>
              item !== selectedItem && (
                <MenuItem _focus={{ bg: colors.white }} onClick={() => onClick(item)} fontFamily={'Nunito'} fontSize={'16px'} color={colors.dullblack}>
                  {item}
                </MenuItem>
              ),
          )}
          {/* Add more MenuItems as needed */}
        </MenuList>
      )}
    </Menu>
  )
}

export default SymmetryMenu
