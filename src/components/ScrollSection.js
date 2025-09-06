import * as motion from "motion/react-client"

export default function ScrollSection({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}                
      whileInView={{ opacity: 1, y: 0 }}            
      viewport={{ once: true, amount: 0.2 }}         
      transition={{ duration: 0.7, ease: "easeOut" }}
                                   
    >
      {children}
    </motion.section>
  )
}
