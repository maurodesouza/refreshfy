import * as C from '@chakra-ui/react';
import {
  FiChevronLeft as ArrowLeft,
  FiChevronRight as ArrowRight,
  FiChevronsLeft as ArrowsLeft,
  FiChevronsRight as ArrowsRight,
} from 'react-icons/fi';

import { Form } from '@unform/web';
import { SubmitHandler } from '@unform/core';

import { Input } from 'components';

type FormData = {
  page: string;
};

type PaginationProps = {
  page: number;
  total_pages: number;
  onChange: (page: number) => void;
};

const Pagination = ({ page, total_pages, onChange }: PaginationProps) => {
  const handleChangePage: SubmitHandler<FormData> = data => {
    onChange(Number(data.page || page));
  };

  const handleNext = () => {
    onChange(page + 1);
  };

  const handlePrev = () => {
    onChange(page - 1);
  };

  const handleToFirst = () => {
    onChange(1);
  };

  const handleToLast = () => {
    onChange(total_pages);
  };

  return (
    <C.Flex align="center" justify="center" mt="4">
      <C.HStack>
        <C.Button
          onClick={handleToFirst}
          bg="teal.500"
          color="white"
          size="sm"
          _hover={{
            bg: 'teal.500',
          }}
          disabled={page === 1}
        >
          <ArrowsLeft size={16} />
        </C.Button>

        <C.Button
          onClick={handlePrev}
          size="sm"
          bg="teal.500"
          color="white"
          _hover={{
            bg: 'teal.500',
          }}
          disabled={page === 1}
        >
          <ArrowLeft size={16} />
        </C.Button>

        <Form onSubmit={handleChangePage}>
          <C.Input
            key={page}
            as={Input}
            defaultValue={page}
            min={1}
            max={total_pages}
            maxW="45px"
            size="sm"
            border="grey"
            borderRadius={8}
            textAlign="center"
            type="number"
            name="page"
          />
        </Form>

        <C.Button
          size="sm"
          onClick={handleNext}
          bg="teal.500"
          color="white"
          _hover={{
            bg: 'teal.500',
          }}
          disabled={page === total_pages}
        >
          <ArrowRight size={16} />
        </C.Button>

        <C.Button
          size="sm"
          onClick={handleToLast}
          bg="teal.500"
          color="white"
          _hover={{
            bg: 'teal.500',
          }}
          disabled={page === total_pages}
        >
          <ArrowsRight size={16} />
        </C.Button>
      </C.HStack>
    </C.Flex>
  );
};

export { Pagination };
