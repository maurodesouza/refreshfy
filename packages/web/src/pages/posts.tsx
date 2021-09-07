import { useEffect, useState } from 'react';
import * as C from '@chakra-ui/react';

import { Pagination } from 'components';
import { asLogged } from 'auth/asLogged';

import { PostResponseData, PostData, Roles } from 'types';
import { api } from 'services/api';

const Posts = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = async () => {
    const { data } = await api.get<PostResponseData>('posts', {
      params: { per_page: 10, page },
    });

    setPosts(data.items);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  return (
    <C.Flex flexDir="column">
      <C.Text as="h2">Publicações</C.Text>
      <C.Box mt="4" borderRadius="8" boxShadow="xs">
        {posts.map(post => (
          <C.Flex
            key={post.id}
            borderBottomWidth={1}
            borderBottomColor="gray.200"
            _last={{ border: 0 }}
          >
            <C.Flex p="4" width="100%">
              <C.Text flex="1" isTruncated whiteSpace="normal" noOfLines={2}>
                {post.title}
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

export default Posts;

export const getServerSideProps = asLogged(async () => {
  return {
    props: {},
  };
}, [Roles.ADMIN, Roles.EDITOR]);
