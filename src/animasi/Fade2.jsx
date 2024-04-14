import {motion} from "framer-motion"
import PropTypes from "prop-types";
const Fade2 = ({children}) => {
  return (
    <motion.div
    initial={{ x: -170, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ ease: "easeOut", duration: 1 }}
  >
      {children}
    </motion.div>
  )
}

Fade2.propTypes = {
    children: PropTypes.object.isRequired,
  };

export default Fade2
