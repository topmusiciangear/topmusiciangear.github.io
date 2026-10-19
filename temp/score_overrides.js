// Scores revisados guia por guia.
// Cada entrada: { "<guideId>": { "<productTitle>": 8.7-9.8 } }
// El score se justifica leyendo el veredicto, los veredictos individuales
// y la conclusion de ESA guia. Si un producto aparece en varias guias y el
// veredicto de una dice "el mejor" y el de otra "el segundo", gana el veredicto
// de la guia donde es el topo de la comparativa.
module.exports = {
  'best-home-studio-speakers': {
    // Conclusion: "buy the Mackie CR4.5", veredicto: Best overall + lowest bass.
    'Mackie CR4.5': 9.8,
    // Conclusion: segunda opcion para mezclar a alto volumen; 64 W continuos,
    // el mas potente de la guia.
    'Behringer Truth 3.5 BT': 9.6,
    // Conclusion: solo 4 Hz por debajo del CR4.5, "best for isolation".
    'M-Audio BX4': 9.5,
    // Veredicto: "best all-round first monitor". Por encima del CR3.5,
    // al que la conclusion solo lo menciona para escritorio pequeno con 100 $.
    'PreSonus Eris 3.5 2nd Gen': 9.4,
    // Conclusion: opcion para escritorio pequeno con presupuesto de 100 $.
    'Mackie CR3.5': 9.3,
    // Conclusion: "not a monitor" — sin entrada balanceada ni waveguide.
    'Edifier R1280T': 8.8,
  },
};
