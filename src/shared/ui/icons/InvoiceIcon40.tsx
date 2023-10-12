import { forwardRef, Icon } from '@chakra-ui/react';
import { ComponentProps } from 'react';

export const InvoiceIcon40 = forwardRef<ComponentProps<typeof Icon>, typeof Icon>((props, ref) => {
    return (
        <Icon
            ref={ref}
            w="40px"
            h="40px"
            color="icon.primary"
            fill="none"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 11.6C4 8.2397 4 6.55954 4.65396 5.27606C5.2292 4.14709 6.14709 3.2292 7.27606 2.65396C8.55954 2 10.2397 2 13.6 2H26.4C29.7603 2 31.4405 2 32.7239 2.65396C33.8529 3.2292 34.7708 4.14709 35.346 5.27606C36 6.55954 36 8.2397 36 11.6V33.3736C36 34.9277 36 35.7047 35.6736 36.2036C35.388 36.64 34.9433 36.9476 34.4342 37.0609C33.8522 37.1903 33.1251 36.9161 31.671 36.3678L30.1805 35.8058C28.9835 35.3544 28.385 35.1287 27.7719 35.058C27.2284 34.9952 26.6783 35.0221 26.1436 35.1375C25.5402 35.2677 24.9666 35.5506 23.8193 36.1165L23.5604 36.2442C22.2545 36.8882 21.6016 37.2103 20.9177 37.336C20.3119 37.4474 19.6908 37.4459 19.0856 37.3315C18.4023 37.2025 17.7509 36.8773 16.4482 36.2269L16.4482 36.2268L16.2653 36.1355C15.1179 35.5627 14.5443 35.2763 13.9402 35.1432C13.4047 35.0252 12.8535 34.9961 12.3086 35.057C11.6938 35.1257 11.0932 35.3501 9.8919 35.7989L8.31993 36.3862C6.86825 36.9286 6.1424 37.1998 5.56168 37.0693C5.05364 36.9552 4.61014 36.6475 4.32544 36.2115C4 35.7131 4 34.9383 4 33.3886V11.6ZM7.00024 9.80018C7.00024 8.12002 7.00024 7.27994 7.32722 6.63821C7.61484 6.07372 8.07378 5.61478 8.63827 5.32716C9.28001 5.00018 10.1201 5.00018 11.8002 5.00018H28.2002C29.8804 5.00018 30.7205 5.00018 31.3622 5.32716C31.9267 5.61478 32.3856 6.07372 32.6733 6.63821C33.0002 7.27994 33.0002 8.12003 33.0002 9.80019V32.926C33.0002 33.2307 33.0002 33.383 32.9363 33.482C32.8804 33.5687 32.7932 33.6304 32.6929 33.6543C32.5783 33.6816 32.4346 33.6309 32.1473 33.5295L30.1002 32.8073L30.1002 32.8073L30.1002 32.8073C28.9602 32.4051 28.3903 32.204 27.8082 32.1421C27.2921 32.0871 26.7706 32.1128 26.2624 32.2184C25.6892 32.3374 25.1418 32.5936 24.047 33.1061L23.3381 33.4379C22.1104 34.0126 21.4966 34.2999 20.8558 34.4157C20.288 34.5183 19.7067 34.5218 19.1376 34.4262C18.4954 34.3182 17.8782 34.0384 16.6436 33.4788L15.7705 33.083L15.7705 33.083C14.6591 32.5792 14.1033 32.3273 13.5234 32.2155C13.0093 32.1164 12.4828 32.0986 11.9631 32.1629C11.377 32.2354 10.8056 32.4493 9.66273 32.8772L7.86463 33.5503C7.57418 33.6591 7.42896 33.7134 7.31276 33.6874C7.2111 33.6646 7.12235 33.6031 7.06537 33.5159C7.00024 33.4162 7.00024 33.2611 7.00024 32.951V9.80018ZM13.5002 13.1515C12.6718 13.1515 12.0002 13.823 12.0002 14.6515C12.0002 15.4799 12.6718 16.1515 13.5002 16.1515H26.5002C27.3287 16.1515 28.0002 15.4799 28.0002 14.6515C28.0002 13.823 27.3287 13.1515 26.5002 13.1515H13.5002ZM13.5862 18.1506C12.7578 18.1506 12.0862 18.8222 12.0862 19.6506C12.0862 20.479 12.7578 21.1506 13.5862 21.1506H17.1765C18.0049 21.1506 18.6765 20.479 18.6765 19.6506C18.6765 18.8222 18.0049 18.1506 17.1765 18.1506H13.5862ZM21.3948 19.6506C21.3948 18.8222 22.0663 18.1506 22.8948 18.1506H26.4851C27.3135 18.1506 27.9851 18.8222 27.9851 19.6506C27.9851 20.479 27.3135 21.1506 26.4851 21.1506H22.8948C22.0663 21.1506 21.3948 20.479 21.3948 19.6506Z"
                fill="currentColor"
            />
        </Icon>
    );
});

InvoiceIcon40.displayName = 'InvoiceIcon40';