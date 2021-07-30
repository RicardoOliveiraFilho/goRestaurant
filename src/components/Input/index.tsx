import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps {
  name: string;
}

type InputType = JSX.IntrinsicElements['input'] & InputProps

export function Input({ name, ...rest }: InputType) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(
    (): void => setIsFocused(true),
    []
  );

  const handleInputBlur = useCallback(
    (): void => {
      setIsFocused(false);
      setIsFilled(!!inputRef.current?.value);
    },
    []
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {/* {{icon && <Icon size={20} />}} */}

      <input
        name={name}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
}