import confetti from "canvas-confetti";

export const popConfetti = (e: { clientX: number, clientY: number }) => {
    const x = e.clientX / window.screen.width;
    const y = (e.clientY - 20) / window.screen.height;
    confetti({
        origin: {x: x, y: y},
        particleCount: 50,
        startVelocity: 25,
        spread: 360,
        ticks: 40,
        zIndex: 0,
    })
}

export default popConfetti;