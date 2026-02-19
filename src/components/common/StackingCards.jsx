import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './StackingCards.css';

export const Card = ({
    i,
    title,
    description,
    image,
    color,
    progress,
    range,
    targetScale,
}) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start'],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            ref={container}
            className='card-sticky-container'
        >
            <motion.div
                style={{
                    backgroundColor: color,
                    scale,
                    top: `calc(-5vh + ${i * 25}px)`,
                }}
                className='card-main'
            >
                <h2 className='card-title-center'>{title}</h2>
                <div className='card-row-content'>
                    <div className='card-text-col'>
                        <p className='card-description'>{description}</p>
                        <span className='card-link-wrapper'>
                            <a
                                href='#'
                                className='card-link-underline'
                            >
                                See more
                            </a>
                            <svg
                                width='22'
                                height='12'
                                viewBox='0 0 22 12'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                                    fill='white'
                                />
                            </svg>
                        </span>
                    </div>

                    <div className='card-image-col'>
                        <motion.div
                            className='card-image-inner-motion'
                            style={{ scale: imageScale }}
                        >
                            <img src={image} alt={title} className='card-image-tag' />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function StackingCards({ items }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    return (
        <div className="stacking-cards-wrapper" ref={container} style={{ height: `${items.length * 100}vh` }}>
            {items.map((project, i) => {
                const targetScale = 1 - (items.length - i) * 0.05;
                return (
                    <Card
                        key={`p_${i}`}
                        i={i}
                        {...project}
                        progress={scrollYProgress}
                        range={[i * (1 / items.length), 1]}
                        targetScale={targetScale}
                    />
                );
            })}
        </div>
    );
}
