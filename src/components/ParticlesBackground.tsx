import { useEffect } from 'react';

declare global {
  interface Window {
    particlesJS: any;
  }
}

const ParticlesBackground = () => {
  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#d4c7f7",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.6,
            random: true,
          },
          size: {
            value: 3,
            random: true,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            out_mode: "out",
          },
        },
        interactivity: {
          events: {
            onhover: {
              enable: false,
            },
            onclick: {
              enable: false,
            },
          },
        },
        retina_detect: true,
      });
    }
  }, []);

  return <div id="particles-js" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}></div>;
};

export default ParticlesBackground;
