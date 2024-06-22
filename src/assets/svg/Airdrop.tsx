import React from 'react';

const Airdrop: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props} // This allows you to pass other SVG attributes as props to the component
        >
            <mask
                id="mask0_3052_14039"
                style={{ maskType: 'luminance' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="16"
            >
                <path d="M0 0.00273323H15.8V15.8027H0V0.00273323Z" fill="white" />
            </mask>
            <g mask="url(#mask0_3052_14039)">
                <path
                    d="M8.57422 8.90309C10.1403 8.89866 11.7064 8.90246 13.2725 8.90119C13.4226 8.90214 13.5727 8.89898 13.7231 8.90309C13.7209 10.387 13.7228 11.871 13.7222 13.3546C13.7241 13.5944 13.6694 13.8368 13.5509 14.0463C13.4251 14.2719 13.2264 14.4558 12.9916 14.5642C12.7976 14.6556 12.582 14.6941 12.3684 14.6913C11.1041 14.6909 9.83948 14.6919 8.57517 14.6906C8.57422 12.7614 8.57675 10.8323 8.57422 8.90309Z"
                    fill="#536079"
                />
            </g>
        </svg>
    );
};

export default Airdrop;
