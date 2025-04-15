import { motion } from "framer-motion"
import React, { forwardRef } from "react";

type SectionDivProps = {
  children: React.ReactNode
}

const SectionDiv = forwardRef<HTMLDivElement, SectionDivProps>(
  ({ children }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center h-full px-4 md:px-6 lg:px-8 pt-10 relative"
      >
        {children}
      </motion.div>
    )
  }
);

// デバッグ用に表示名を設定
SectionDiv.displayName = 'SectionDiv';

export default SectionDiv