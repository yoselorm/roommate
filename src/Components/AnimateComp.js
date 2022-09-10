import React from 'react';
import { motion } from 'framer-motion';

const AnimateComp = ({ children }) => {
    const animateVariants = {
        hidden: {
            opacity: 0, x: 100
        },
        visible: {
            opacity: 1, x: 0
        },
        exit: {
            opacity: 0, x: -100
        }
    }


    return (
        <motion.div variants={animateVariants} initial='hidden' animate='visible' exit='exit' transition={{ duration: 0.5 }}>
            {children}
        </motion.div>
    );
}

export default AnimateComp;
