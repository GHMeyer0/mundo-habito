import Box from '@mui/material/Box';
import useGoalsStore from '../hooks/useGoalsStore';

type Props = {}

interface WordStatus {
  positive: number;
  negative: number;
}

const MainPage = (props: Props) => {
  const { negative, score } = useGoalsStore();
  const treeCount = Math.max(score, 0);          // score positivo vira qtde de árvores
  const destroyedCount = Math.max(-score, 0);



  const trees = Array.from({ length: treeCount }, (_, index) => {
    const x = Math.random() * 500;
    const y = 450 + Math.random() * 200;
    const size = 15 + Math.random() * 15;
    const hue = 70 + Math.random() * 40;
    const leafColor = `hsl(${hue}, 70%, 40%)`;

    return (
      <g key={`tree-${index}`}>
        {/* Tronco */}
        <defs>
          <linearGradient id={`trunkGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B4513" />
            <stop offset="100%" stopColor="#A0522D" />
          </linearGradient>
        </defs>
        <rect
          x={x - 5}
          y={y + 30}
          width="10"
          height="40"
          fill={`url(#trunkGradient-${index})`}
        />
        {/* Copa */}
        <circle cx={x} cy={y} r={size} fill={leafColor} />
      </g>
    );
  });

  // =========================
  // Árvores Queimadas/Cortadas (destroyedCount)
  // =========================
  // Vamos mostrar fogo + toco + pássaro morto, tudo junto,
  // ou você pode separar se quiser.
  const destroyedTrees = Array.from({ length: destroyedCount }, (_, index) => {
    const x = Math.random() * 500;
    const y = 450 + Math.random() * 200;
    const size = 15 + Math.random() * 15;

    return (
      <g key={`destroyed-${index}`}>
        {/* Tronco em chamas */}
        <rect
          x={x - 5}
          y={y + 30}
          width="10"
          height="40"
          fill="#654321"
        />
        {/* Copa queimada (fogo) */}
        <circle cx={x} cy={y} r={size} fill="grey" />
        <path
          d={`
            M${x - size / 2},${y - size}
            Q${x},${y - size - size / 1.2}
            ${x + size / 2},${y - size}
            Q${x},${y - size / 2}
            ${x - size / 2},${y - size}
          `}
          fill="orange"
        >
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1;1.05;1"
            dur="1s"
            repeatCount="indefinite"
            additive="sum"
          />
        </path>
        {/* Pássaro morto em cima do toco - ilustrativo */}
        <image
          width="30"
          height="30"
          preserveAspectRatio="none"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAAXNSR0IArs4c6QAAIABJREFUeJzt&#10;3Xm8ZFV16PHfYuxuhhYZRJmHgBMgGBEUFRVBCCKiREXEoKKYaFTilGCMT3l5zvocEaICKigoggMR&#10;R9DIpEQRowiIDMokg2DTqGCv94f7+i6371Cn6lTtGn7fz6c+fW/dc/Ze53T3XavO2WdvkCRJkiRJ&#10;kiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ&#10;kiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ&#10;kiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ&#10;kiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ&#10;kiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ&#10;kiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ0hCJ2gFI6tlOwB7AhsAtwEnA&#10;nbWDkiRJ/bEl8IOIyOmvkvyPBhbVDlCSJLVrj5mJf5ZC4KzaQUqSpHZdsVABUIqAQ2oHKkmS2nFw&#10;J8m/FAA/qR2spOG0Su0AJDX25E43jIiHAZv1NxxJo8gCQBo96zTcfus+xSFphFkASKNnWcPtl/Qp&#10;DkkjzAJAGj1Nn/Ffu09xSBphFgDS6Pldw+3X6lMckkaYBYA0eppeAWg6ZkDSBLAAkEZP0ysA3gKQ&#10;tBILAGn0NB0E6BUASSuxAJBGT9NbAI4BkLQSCwBp9DS9BeBjgJJWYgEgjZ67Gm7vGABJK7EAkEZP&#10;0wLAMQCSVrJa7QAkNTaIpwA2AbYsHxIuBpZ30YYkSWrRup2uBlhWBPxBg7aPAH4xY/+7gTf08Xgk&#10;SVIHVmtYAPysgzYD+NgC7XzFq4aSJFXUsAC4poMmX9FhW+8ZwOFJkqQ53N6gALhlgbaWAr9r0N4D&#10;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&#10;/xVN9rMA6L/7lYLgQTP+3GTqFREb1Q5SkjR6MvOuct//6qb7WgAMj82nFwXA+sAGpYBY6RURi2sH&#10;LEmqKzMPAL7Uzb4WAKNto1IQLAXWKUXDVJEw9f3SOQoIb01I0gjLzHcBr+12fwuAybQPcHpELKkd&#10;iCSpucw8v0x4d2+3bVgATJ7DgE9ExCq1A5EkNZeZN5c5bG7spR2TwGR5W0ScaPKXpNFUBv09tdfk&#10;D+A8+ZNhDeCUiDiodiCSpO5k5r3AAcAP22jPAmD8rQf8Z0Q8unYgkqSeHAJ8q63GLADG2+bAtyNi&#10;69qBSJK6l5lHAae12ab3gsfXI4GLTf6SNNoy8y3Ae9tu16cAxtP+wGkRsah2IJKk7mXmB4FX9KNt&#10;rwCMnyOAL5r8JWm0Zebx/Ur+WACMlQDeGxHHRYRXdiRphJVP/i/tZx8mivGwqFzy3792IJKk3mTm&#10;vwLH9LsfC4DRtx7w9Yh4ZO1AJEndy8wsn/qPH0R/FgCjbeuS/B3pL0kjLDOXAc8GzhpUnxYAo+vR&#10;ZYKf9WoHIknqXmZeDewLXDbIfh0EOJoOAr5j8pek0ZaZ3wJ2GXTyxwJgJL0W+FxErFE7EElS9zLz&#10;I8DewO01+vcWwOhYBTg2Io6oHYgkqTeZ+TLg2JoxWACMhiXA6RGxT+1AJEndy8xfl9u4F9WOxQJg&#10;+G0AfDMidqwdiCSpe5n5FeAw4LbaseAYgKG3XVnQx+QvSSMqM3+fmf9Q1mkZiuSPVwCG3quBpbWD&#10;kCR1LYETgGtqByJJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ&#10;kiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ&#10;kiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ&#10;kiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ&#10;kiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJ&#10;kiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkqSh&#10;9v8AglwLA7fscoMAAAAASUVORK5CYII=&#10;"
          x={x - 15}
          y={y + 20}
        />
      </g>
    );
  });
  // =========================
  //    Nuvens escuras + raios
  // =========================
  // Exemplo: se negativo >= 2, aparece a 1a nuvem; se >= 3, aparece a 2a etc.
  // Podemos até colocar mais se quisermos.
  // Cada nuvem tem um <animateTransform> para ficar se movendo lateralmente.
  // Se negative >= 5, mostram raios.
  const numDarkClouds = Math.min(negative, 4); // limite de 4 nuvens, por ex.

  const darkClouds = Array.from({ length: numDarkClouds }, (_, i) => {
    // Posição base (mais ou menos no céu)
    const baseX = 50 + i * 100;
    const baseY = 50 + i * 10;
    const cloudWidth = 70;
    const cloudHeight = 30;

    const showLightning = score < 0; // quando score < -4
    // Desenho simples de nuvem (você pode usar <path> ou <ellipse> sobrepostas)
    // Aqui uso um <g> animado de um lado para outro.
    return (
      <g key={`dark-cloud-${i}`} transform={`translate(${baseX},${baseY})`}>
        <g>
          <ellipse cx="30" cy="20" rx={cloudWidth / 2} ry={cloudHeight} fill="#555" />
          <ellipse cx="60" cy="20" rx={cloudWidth / 3} ry={cloudHeight / 1.2} fill="#444" />
          <ellipse cx="15" cy="20" rx={cloudWidth / 4} ry={cloudHeight / 1.5} fill="#666" />
          {/* Movimentação horizontal suave */}
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0; 20; 0"
            dur="4s"
            repeatCount="indefinite"
          />
        </g>
        {/* Raios quando negativo bem alto */}
        {showLightning && (
          <g>
            {/* Podemos exibir e esconder com animate */}
            <line
              x1="40"
              y1="40"
              x2="50"
              y2="70"
              stroke="yellow"
              strokeWidth="2"
            >
              {/* Fica piscando rapidamente */}
              <animate
                attributeName="stroke-opacity"
                values="1;0;1"
                dur="0.5s"
                repeatCount="indefinite"
              />
            </line>
            {/* Segundo raio */}
            <line
              x1="25"
              y1="40"
              x2="35"
              y2="65"
              stroke="yellow"
              strokeWidth="2"
            >
              <animate
                attributeName="stroke-opacity"
                values="1;0;1"
                dur="0.5s"
                begin="0.2s" // pequeno atraso
                repeatCount="indefinite"
              />
            </line>
          </g>
        )}
      </g>
    );
  });
  return (
    <Box
      sx={{
        height: '90vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 800"
        style={{
          height: '80%',
          width: '100%',
        }}
      >
        {/* Definições de gradiente etc. */}
        <defs>
          {/* Céu */}
          <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#B0E0E6" />
          </linearGradient>
          {/* Terreno */}
          <linearGradient id="groundGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7CFC00" />
            <stop offset="100%" stopColor="#228B22" />
          </linearGradient>
          {/* Lago */}
          <radialGradient id="lakeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E90FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0000CD" stopOpacity="0.9" />
          </radialGradient>
          {/* Sol */}
          <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFF66" />
            <stop offset="100%" stopColor="#FFA500" />
          </radialGradient>
        </defs>

        {/* Céu */}
        <rect x="0" y="0" width="500" height="300" fill="url(#skyGradient)" />

        {/* Sol */}
        <circle cx="80" cy="80" r="50" fill="url(#sunGradient)" />

        {/* Nuvens brancas (fixas ou leves) - opcional */}
        <path
          d="M100 100 
             C90 90, 110 90, 100 100 
             C80 90, 60 120, 100 120 
             C120 120, 120 100, 100 100"
          fill="#FFFFFF88"
        />
        <path
          d="M350 150 
             C340 140, 360 140, 350 150
             C330 140, 310 170, 350 170
             C370 170, 370 150, 350 150"
          fill="#FFFFFF88"
        />

        {/* Nuvens escuras que surgem quando negative > 1 */}
        {darkClouds}

        {/* Terreno */}
        <rect x="0" y="200" width="500" height="600" fill="url(#groundGradient)" />

        {/* Lago */}
        <ellipse cx="250" cy="300" rx="200" ry="50" fill="url(#lakeGradient)" />

        {/* Árvores normais (positivas) com fogo se index < negative */}
        {trees}

        {/* Tocos de árvore (stumps) quando negative aumenta */}
        {destroyedTrees}
      </svg>
    </Box>
  )
}

export default MainPage