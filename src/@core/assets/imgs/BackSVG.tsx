const BackSVG = () => {
  return (
    <>
      <svg
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        id="wave"
        style={{ transform: "rotate(0deg)", transition: "0.3s" }}
        viewBox="0 0 1440 490"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="rgba(48, 48, 49, 1)" offset="0%"></stop>
            <stop stopColor="rgba(48, 48, 49, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          style={{ transform: "translate(0, 0px)", opacity: 1 }}
          fill="url(#sw-gradient-0)"
          d="M0,49L80,98C160,147,320,245,480,302.2C640,359,800,376,960,326.7C1120,278,1280,163,1440,130.7C1600,98,1760,147,1920,179.7C2080,212,2240,229,2400,196C2560,163,2720,82,2880,106.2C3040,131,3200,261,3360,294C3520,327,3680,261,3840,245C4000,229,4160,261,4320,277.7C4480,294,4640,294,4800,310.3C4960,327,5120,359,5280,367.5C5440,376,5600,359,5760,351.2C5920,343,6080,343,6240,359.3C6400,376,6560,408,6720,424.7C6880,441,7040,441,7200,408.3C7360,376,7520,310,7680,285.8C7840,261,8000,278,8160,253.2C8320,229,8480,163,8640,147C8800,131,8960,163,9120,163.3C9280,163,9440,131,9600,106.2C9760,82,9920,65,10080,122.5C10240,180,10400,310,10560,375.7C10720,441,10880,441,11040,392C11200,343,11360,245,11440,196L11520,147L11520,490L11440,490C11360,490,11200,490,11040,490C10880,490,10720,490,10560,490C10400,490,10240,490,10080,490C9920,490,9760,490,9600,490C9440,490,9280,490,9120,490C8960,490,8800,490,8640,490C8480,490,8320,490,8160,490C8000,490,7840,490,7680,490C7520,490,7360,490,7200,490C7040,490,6880,490,6720,490C6560,490,6400,490,6240,490C6080,490,5920,490,5760,490C5600,490,5440,490,5280,490C5120,490,4960,490,4800,490C4640,490,4480,490,4320,490C4160,490,4000,490,3840,490C3680,490,3520,490,3360,490C3200,490,3040,490,2880,490C2720,490,2560,490,2400,490C2240,490,2080,490,1920,490C1760,490,1600,490,1440,490C1280,490,1120,490,960,490C800,490,640,490,480,490C320,490,160,490,80,490L0,490Z"
        ></path>
      </svg>
    </>
  );
};

export { BackSVG };
