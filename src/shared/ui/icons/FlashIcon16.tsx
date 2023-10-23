import { forwardRef, Icon } from '@chakra-ui/react';
import { ComponentProps } from 'react';

export const FlashIcon16 = forwardRef<ComponentProps<typeof Icon>, typeof Icon>((props, ref) => {
    return (
        <Icon
            ref={ref}
            w="16px"
            h="16px"
            color="accent.orange"
            fill="none"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M4.60096 6.47917L7.63932 2.83314C8.58952 1.6929 9.06462 1.12278 9.41228 1.2822C9.75995 1.44162 9.63794 2.17365 9.39393 3.63772L9.12487 5.2521C9.06584 5.60627 9.03633 5.78336 9.1255 5.91554C9.21467 6.04773 9.38993 6.08667 9.74044 6.16456L10.2969 6.28822C11.7302 6.60672 12.4468 6.76597 12.6281 7.29752C12.8094 7.82907 12.3394 8.39303 11.3995 9.52096L8.3611 13.167C7.4109 14.3072 6.9358 14.8774 6.58813 14.7179C6.24047 14.5585 6.36247 13.8265 6.60648 12.3624L6.87555 10.748C6.93458 10.3939 6.96409 10.2168 6.87492 10.0846C6.78575 9.95241 6.61049 9.91346 6.25999 9.83557L5.70354 9.71192C4.27027 9.39341 3.55363 9.23416 3.37234 8.70261C3.19104 8.17107 3.66102 7.6071 4.60096 6.47917Z"
                fill="currentColor"
            />
        </Icon>
    );
});

FlashIcon16.displayName = 'FlashIcon16';