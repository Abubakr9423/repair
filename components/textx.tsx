import React from 'react'
import { motion } from 'framer-motion'

const AnimatedTitle = () => {
    return (
        <div className="relative flex items-center justify-center py-24">
            <div className="relative flex items-end">
                <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 flex select-none">
                    Re
                    <span className="text-orange-500">p</span>
                    ai

                    <motion.span
                        className="relative inline-block origin-bottom"
                        animate={{
                            scaleY: [1, 1, 0.9, 1.1, 1],
                            scaleX: [1, 1, 1.05, 0.95, 1],
                            rotate: [0, 0, 10, -5, 0],
                        }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            repeatDelay: 1,
                            ease: "easeInOut",
                        }}
                    >
                        r

                        <motion.div
                            className="absolute -top-10 -left-2 text-5xl z-10"
                            style={{ transformOrigin: "center top" }} 
                            animate={{
                                rotate: [0, -50, 0], 
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: "easeInOut",
                            }}
                        >
                            🔨
                        </motion.div>
                    </motion.span>
                </h1>
            </div>
        </div>
    )
}

export default AnimatedTitle