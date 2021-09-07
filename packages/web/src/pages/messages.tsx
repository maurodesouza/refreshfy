import { useEffect, useState } from 'react';
import * as C from '@chakra-ui/react';

import { Pagination } from 'components';
import { asLogged } from 'auth/asLogged';

import { Roles, MessageData, MessageResponseData } from 'types';
import { api } from 'services/api';

const Messages = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMessages = async () => {
    const { data } = await api.get<MessageResponseData>('messages', {
      params: { per_page: 10, page },
    });

    setMessages(data.items);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    loadMessages();
  }, [page]);

  return (
    <C.Flex flexDir="column">
      <C.Text as="h2">Mensagens</C.Text>

      <C.Box mt="4" borderRadius="8" boxShadow="xs">
        {messages.map(message => (
          <C.Flex
            key={message.id}
            borderBottomWidth={1}
            borderBottomColor="gray.200"
            _last={{ border: 0 }}
          >
            <C.Flex p="4" width="100%">
              <C.Text flex="1" isTruncated whiteSpace="normal" noOfLines={2}>
                {message.message}
              </C.Text>
            </C.Flex>
          </C.Flex>
        ))}
      </C.Box>

      <Pagination
        page={page}
        total_pages={totalPages}
        onChange={newPage => setPage(newPage)}
      />
    </C.Flex>
  );
};

export default Messages;

export const getServerSideProps = asLogged(async () => {
  return {
    props: {},
  };
}, [Roles.ADMIN, Roles.MARKETING, Roles.SUPPORT]);
