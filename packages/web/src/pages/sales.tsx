import { useEffect, useState } from 'react';
import * as C from '@chakra-ui/react';

import { Pagination } from 'components';
import { asLogged } from 'auth/asLogged';

import { SaleData, GetResponseData, Roles } from 'types';
import { api } from 'services/api';
import { formatPrice, translateProductName } from 'utils';

const Sales = () => {
  const [sales, setSales] = useState<SaleData[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadSales = async () => {
    const { data } = await api.get<GetResponseData<SaleData>>('sales', {
      params: { per_page: 10, page },
    });

    setSales(data.items);
    setTotalPages(data.total_pages);
  };

  useEffect(() => {
    loadSales();
  }, [page]);

  return (
    <C.Flex flexDir="column">
      <C.Text as="h2">Vendas</C.Text>
      <C.Box mt="4" borderRadius="8" boxShadow="xs">
        {sales.map(sale => (
          <C.Flex
            key={sale.id}
            borderBottomWidth={1}
            borderBottomColor="gray.200"
            _last={{ border: 0 }}
          >
            <C.Flex p="4" width="100%">
              <C.Text flex="1" isTruncated whiteSpace="normal" noOfLines={2}>
                {translateProductName(sale.product)} - {formatPrice(sale.price)}
              </C.Text>
              <C.Text>{sale.client}</C.Text>
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

export default Sales;

export const getServerSideProps = asLogged(async () => {
  return {
    props: {},
  };
}, [Roles.ADMIN]);
