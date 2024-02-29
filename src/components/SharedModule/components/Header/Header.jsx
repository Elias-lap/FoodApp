/* eslint-disable react/prop-types */

import { motion } from "framer-motion";
function Header({ title, description, pathimage }) {
  return (
    <div className="  container-fluid  container-header p-5 rounded-3  ">
      <div className="row   justify-content-between  ">
        <div className=" col-md-5  d-flex align-items-center  justify-content-center ">
          <div className="body-content">
            {title.split("").map((letter, index) => (
              <motion.span
              className=" fs-2 text-white"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                {letter}
              </motion.span>
            ))}
            <p className="color1"> {description} </p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="home-image text-center ">
            <img src={pathimage} className="w-75" alt="image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
