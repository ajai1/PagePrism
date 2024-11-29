import React, { ReactNode, useEffect, useState } from 'react'
import styles from "./slider.module.css"

type SliderProps = {
    show: boolean,
    children: ReactNode
}

const Slider = ({ show, children }: SliderProps) => {
    const [right, setRight] = useState("-100%")
    useEffect(() => {
        if (show) {
            setRight("0");
        } else {
            setRight("-100%")
        }
    }, [show])
    return (
        <section className={`${styles.sliderComponent} w-96 `} style={{ right: right }}>
            {show && children}
        </section>
    )
}

export default Slider
