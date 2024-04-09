import { css } from "lit";

export default css`
    :host {
        font-size: 15px;

        /* font */
        --font-family-primary: "AvenirLTPro-Roman", "Palanquin", "Roboto",
            "Helvetica Neue", Helvetica, "sans-serif";
        font-family: var(--font-family-primary);

        /* theme */
        --ew-theme-color: #0085ff;
        --ew-background: #f1f4f8;

        --alpha: 0.8;
        /* blue */
        --blue: 0, 133, 255;
        --ew-blue-navy: #082446;
        --ew-blue-navy-50-opacity: #08244680; /* ARGB 80(50) = 255 * 0.50 = 128  (https://ascii.cl/conversion.htm) */
        --ew-blue-navy-05-opacity: #0824460d; /* ARGB D0(5) = 255 * 0.05 = 13  (https://ascii.cl/conversion.htm) */
        --ew-blue-regal: #004a6c;
        --ew-blue-5: #f2f9ff;
        --ew-blue-10: #e6f3ff;
        --ew-blue-25: #bfe0ff;
        --ew-blue-navy-80: #082446cc; /* ARGB CC(80) = 255 * 0.80 = 204  (https://ascii.cl/conversion.htm) */
        /* green */
        --ew-green: #00c495;
        /* gray */
        --ew-gray: #aeb8c3;
        --ew-gray-dark: #5e7187;
        --ew-gray-dark-10: #5e71871a; /* ARGB 1A(10) = 255 * 0.1 = 26  (https://ascii.cl/conversion.htm) */
        --ew-gray-light: #eff1f3;
        --ew-gray-neutral: #8694a5;
        /* orange */
        --ew-orange: #ff5c00;
        /* red */
        --ew-red: #f51e44;
        /* yellow */
        --ew-yellow: #ff8a00;
        --ew-yellow-label: #fff3e6;

        /* other */
        --ew-label: #e6f9f4;
        --ew-label-disabled: #fee8ec;
        --ew-white: #fff;
        --ew-white-10: RGBA(255, 255, 255, 0.1);

        /* skeleton */
        --skeleton-row-height: 25px;
        --skeleton-row-width: 100%;
        --skeleton-row-padding: 34px 30px;
        --skeleton-column-height: 25px;
        --skeleton-column-width: 100%;
        --skeleton-column-padding-top: 34px;
        --skeleton-column-padding-bottom: 34px;
        --skeleton-button-height: 50px;
        --skeleton-button-width: 250px;
        --skeleton-button-border-radius: 40px;
        --skeleton-button-rounded-height: 50px;
        --skeleton-button-rounded-width: 50px;
        --skeleton-button-rounded-border-radius: 50%;
        --skeleton-title-height: 50px;
        --skeleton-title-width: 376px;
        --skeleton-background-image: linear-gradient(
                100deg,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.5) 50%,
                rgba(255, 255, 255, 0) 100%
            ),
            radial-gradient(rgba(211, 211, 211, 0.5) 99%, transparent 0);
        --skeleton-background-size: 50% 100%, 100% 100%;
        --skeleton-animation: shine 1s infinite;

        /* Layout */
        --margin-7_5: 7.5px;
        --margin-15: 15px;
        --margin-20: 20px;
        --margin-25: 25px;
        --margin-min-7_5: -7.5px;
        --margin-min-15: -15px;

        /* // Color palette */
        /* // default: white */
        --theme-light-color-first: rgb(255, 255, 255);
        --theme-light-color-first-background: rgb(255, 255, 255);
        /* // default: gray */
        --theme-light-color-second: rgb(94, 113, 135);
        --theme-light-color-second-50: rgb(174, 184, 195);
        --theme-light-color-second-10: rgb(239, 241, 243);

        /* Styling */
        --border-radius: 5px;
        --input-border-radius: var(--border-radius);
        --border-radius-small: 15px;
        --button-border-radius: 40px;
    }
`;
