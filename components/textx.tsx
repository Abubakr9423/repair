import React from 'react'
import { motion } from 'framer-motion'

const AnimatedTitle = () => {
    return (
        <div className="relative flex items-center justify-center py-24">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 flex select-none">
                Re
                <span className="text-orange-500">p</span>
                ai
                <span className="relative inline-block">
                    <motion.span
                        className="inline-block origin-bottom"
                        animate={{
                            scaleY: [1, 1, 0.85, 1],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            repeatDelay: 1,
                            times: [0, 0.6, 0.7, 1],
                            ease: "easeOut",
                        }}
                    >
                        r
                    </motion.span>

                    <motion.span
                        className="absolute -top-12 left-4/2 -translate-x-1/2 text-5xl"
                        style={{ transformOrigin: "bottom center" }}
                        animate={{
                            rotate: [0, -70, 0],
                            y: [0, 12, 0],
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            repeatDelay: 1,
                            times: [0, 0.6, 0.7],
                            ease: "easeIn",
                        }}
                    >
                        🔨
                    </motion.span>
                </span>
            </h1>
        </div>
    )
}

export default AnimatedTitle
