import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useNavLinks } from 'hooks';
import * as C from '@chakra-ui/react';

const Popover = () => {
  const router = useRouter();
  const [isPopoverOpen, setIsPopoverOpen] = useState(true);

  useEffect(() => {
    setIsPopoverOpen(false);
  }, [router.asPath]);

  return (
    <C.Popover
      placement="bottom-end"
      isOpen={isPopoverOpen}
      returnFocusOnClose={false}
      onClose={() => setIsPopoverOpen(false)}
    >
      <C.PopoverTrigger>
        <C.Button variant="unstyled" onClick={() => setIsPopoverOpen(true)}>
          <C.Avatar
            h="40px"
            w="40px"
            src="https://github.com/maurodesouza.png"
          />
        </C.Button>
      </C.PopoverTrigger>

      <C.PopoverContent w="200px">
        <C.PopoverCloseButton />
        <C.PopoverArrow />

        <C.PopoverBody>
          <C.Stack spacing="4">{useNavLinks(['profile', 'logout'])}</C.Stack>
        </C.PopoverBody>
      </C.PopoverContent>
    </C.Popover>
  );
};

export { Popover };
