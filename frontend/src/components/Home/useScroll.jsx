import { useEffect } from 'react';

const useScrollAnimations = () => {
  useEffect(() => {
    const directions = ['fadeInRight', 'fadeInLeft', 'fadeInTop', 'fadeInBottom'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const randomDirection =
              directions[Math.floor(Math.random() * directions.length)];
            entry.target.style.animation = `${randomDirection} 0.5s ease-out forwards`;
            entry.target.classList.add('visible');
          } else {
            entry.target.style.animation = '';
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default useScrollAnimations;
