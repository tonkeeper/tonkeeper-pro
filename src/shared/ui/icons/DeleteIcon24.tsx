import { Icon } from '@chakra-ui/react';
import { ComponentProps, FunctionComponent } from 'react';

export const DeleteIcon24: FunctionComponent<ComponentProps<typeof Icon>> = props => {
    return (
        <Icon
            w="24px"
            h="24px"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2.5C10.6193 2.5 9.5 3.61929 9.5 5H14.5C14.5 3.61929 13.3807 2.5 12 2.5ZM16 5H21.25C21.6642 5 22 5.33579 22 5.75C22 6.16421 21.6642 6.5 21.25 6.5H20V15.6C20 17.8402 20 18.9603 19.564 19.816C19.1805 20.5686 18.5686 21.1805 17.816 21.564C16.9603 22 15.8402 22 13.6 22H10.4C8.15979 22 7.03969 22 6.18404 21.564C5.43139 21.1805 4.81947 20.5686 4.43597 19.816C4 18.9603 4 17.8402 4 15.6V6.5H2.75C2.33579 6.5 2 6.16421 2 5.75C2 5.33579 2.33579 5 2.75 5H8C8 2.79086 9.79086 1 12 1C14.2091 1 16 2.79086 16 5ZM5.5 16.5V6.5H18.5V16.5C18.5 17.9001 18.5 18.6002 18.2275 19.135C17.9878 19.6054 17.6054 19.9878 17.135 20.2275C16.6002 20.5 15.9001 20.5 14.5 20.5H9.5C8.09987 20.5 7.3998 20.5 6.86502 20.2275C6.39462 19.9878 6.01217 19.6054 5.77248 19.135C5.5 18.6002 5.5 17.9001 5.5 16.5ZM9.75 10C10.1642 10 10.5 10.3358 10.5 10.75V16.25C10.5 16.6642 10.1642 17 9.75 17C9.33579 17 9 16.6642 9 16.25V10.75C9 10.3358 9.33579 10 9.75 10ZM15 10.75C15 10.3358 14.6642 10 14.25 10C13.8358 10 13.5 10.3358 13.5 10.75V16.25C13.5 16.6642 13.8358 17 14.25 17C14.6642 17 15 16.6642 15 16.25V10.75Z"
                fill="black"
            />
        </Icon>
    );
};
