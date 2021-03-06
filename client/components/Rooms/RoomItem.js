import React, { useContext } from 'react';
import { Text, Divider, Box, Pressable, Button, Badge, HStack, CircleIcon, VStack, Flex, Center } from 'native-base';
import { ChatContext } from '../../context/ChatContext';

export default function RoomItem(props) {
    const { name, roomId, handleEnterRoom } = props;
    const { unRead, chats } = useContext(ChatContext);

    return (
        <>
            <Pressable width="100%" px={4} py={2} h={70}
                bg='blueGray.200'
                colorScheme="blueGrayReverse"
                fontSize="2xl"
                justifyContent="flex-start"
                alignItems="center"
                flexDirection="row"
                onPress={() => handleEnterRoom(name, roomId)}
                _pressed={{ bg: "blueGray.300"}}
            >
                <HStack alignItems="flex-start" w="100%">
                    <Box bg="blueGray.400" w={12} h={12} borderRadius={5}
                        position="relative"
                    >
                        {unRead[roomId] && unRead[roomId].count > 0 &&
                            <Box bg='blueGray.500' borderRadius={100} p={0} m={0}
                                position="absolute" right="-8px" top="-8px"
                                h={6} w={6} textAlign="center"
                                align-items="center" justify-content="center"
                            >
                                <Text color='blueGray.50' fontSize="sm" m="auto">
                                    {unRead[roomId].count}
                                </Text>
                            </Box>}
                    </Box>
                    <Box flex={1} justifyContent="flex-start" pl={2}
                        alignItems="flex-start" h='100%'>
                        <Box>
                            <Text fontSize="xl" numberOfLines={1}>
                                {name}
                            </Text>
                        </Box>
                        <Box w="100%">
                            <Text fontSize="md" color="blueGray.500"
                                numberOfLines={1}
                            >
                                {chats[roomId] && chats[roomId][0] && 
                                chats[roomId][0].text}
                            </Text>
                        </Box>
                    </Box>
                </HStack>
            </Pressable>
            <Divider bg="blueGray.300" />
        </>
    )
}