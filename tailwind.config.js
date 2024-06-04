import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import gradient from '@material-tailwind/react/theme/components/timeline/timelineIconColors/gradient';
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT( {
    
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            backgroundColor: {
                "main": "#3366cc",
                "second": "#4775d1",
                "third": "#5b84d6",
                "fourth": "#84a3e0",
                "to-fuchsia-600": "#c026d3",
            },
            textColor: {
                "third": "#6b90da",
                "header": "#2d5bb7",
                "main": "#3366cc"
                
            },
            fontSize: {
                "s":"10px",
                "m":"11px",
                "sml":"12px"
            }


        },
    },

    plugins: [forms],
});