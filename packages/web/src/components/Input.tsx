import { useRef, useEffect, useState } from 'react';
import { IconType } from 'react-icons';

import { useField } from '@unform/core';
import * as C from '@chakra-ui/react';

type InputPros = C.InputProps & {
  icon?: IconType;
};

const Input = ({ name, placeholder = '', icon: Icon, ...rest }: InputPros) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { registerField, error, clearError } = useField(name);

  const [color, setColor] = useState('gray.300');
  const [isFilled, setIsFilled] = useState(!!inputRef.current?.value);

  const handleOnBlur = () => {
    const hasValue = !!inputRef.current?.value;

    setIsFilled(hasValue);
    if (hasValue) return;

    setColor('gray.300');
  };

  const handleOnFocus = () => {
    clearError();
    setColor('teal.500');
  };

  useEffect(() => {
    registerField({
      name,
      ref: inputRef,
      path: 'current.value',
    });
  }, [registerField, name]);

  return (
    <C.FormControl isInvalid={!!error}>
      <C.InputGroup
        display="flex"
        alignItems="center"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      >
        {!!Icon && (
          <C.InputLeftElement
            color={error ? 'red.500' : color}
            top="unset"
            _groupHover={!error && { color: 'teal.500' }}
          >
            <Icon size={20} />
          </C.InputLeftElement>
        )}

        <C.Input
          id={name}
          ref={inputRef}
          placeholder={placeholder}
          bg="gray.50"
          size="lg"
          borderColor={isFilled ? 'teal.500' : 'gray.200'}
          boxShadow={isFilled ? '0 0 0 1px #319795' : 'initial'}
          focusBorderColor="teal.500"
          borderWidth="thin"
          _hover={{
            borderColor: 'teal.500',
            boxShadow: '0 0 0 1px #319795',
          }}
          {...rest}
        />
      </C.InputGroup>

      {error && <C.FormErrorMessage>{error}</C.FormErrorMessage>}
    </C.FormControl>
  );
};

export { Input };
