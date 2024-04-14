import {motion} from "framer-motion"
import PropTypes from "prop-types";

const Fade = ({children}) => {
  return (
    <motion.div
    initial={{ y: -150, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ ease: "easeOut", duration: 1.5 }}
  >
      {children}
    </motion.div>
  )
}
Fade.propTypes = {
    children: PropTypes.object.isRequired,
  };
export default Fade
